---
title: "Docker快速构建fastdfs镜像"
subtitle: "Docker快速构建fastdfs镜像"
date: 2024-10-25 10:41:26
category:
- Docker
tag:
- fastdfs
order: 3
---

## 1. 安装fastdfs所需文件

| 文件名                                                       | 文件说明                                        | 本次安装版本                                                 |
| ------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------ |
| [libfastcommon](https://github.com/happyfish100/libfastcommon) | 从 FastDFS 和 FastDHT 中提取出来的公共 C 函数库 | [V1.0.75](https://github.com/happyfish100/libfastcommon/archive/refs/tags/V1.0.75.tar.gz) |
| [libserverframe](https://github.com/happyfish100/libserverframe) | 从 FastDFS 中提取的网络服务框架库               | [V1.2.5](https://github.com/happyfish100/libserverframe/releases/tag/V1.2.5) |
| [fastdfs](https://github.com/happyfish100/fastdfs)           | FastDFS 源码，包含 tracker 和 storage 服务      | [V6.12.2](https://github.com/happyfish100/fastdfs/archive/refs/tags/V6.12.2.tar.gz) |
| [fastdfs-nginx-module](https://github.com/happyfish100/fastdfs-nginx-module) | FastDFS 与 Nginx 关联模块，实现访问和下载文件   | [V1.24](https://github.com/happyfish100/fastdfs-nginx-module/archive/refs/tags/V1.24.tar.gz) |
| [nginx](http://nginx.org/en/download.html)                   | 使文件能够通过http访问                          | [1.22.0](http://nginx.org/download/nginx-1.26.2.tar.gz)      |

> Linux 中下载文件命令：
>
> ```shell
> $ wget -O libfastcommon-1.0.75.tar.gz https://github.com/happyfish100/libfastcommon/archive/refs/tags/V1.0.75.tar.gz 
> $ wget -O libserverframe-1.2.5.tar.gz https://github.com/happyfish100/libserverframe/archive/refs/tags/V1.2.5.tar.gz
> $ wget -O fastdfs-6.12.2.tar.gz https://github.com/happyfish100/fastdfs/archive/refs/tags/V6.12.2.tar.gz 
> $ wget -O fastdfs-nginx-module-1.24.tar.gz https://github.com/happyfish100/fastdfs-nginx-module/archive/refs/tags/V1.24.tar.gz  
> $ wget http://nginx.org/download/nginx-1.26.2.tar.gz 
> ```

## 2. 提取并修改相关配置文件

### 2.1 提取文件

1. 解压 `fastdfs-6.12.2.tar.gz` 源码包，找到`http.con`f、`mime.types`、`storage_ids.conf`, `storage_ids.conf`文件只是用于构建好的镜像使用时挂载目录到容器内。

   ```shell
   $ tar xzvf fastdfs-6.12.2.tar.gz
   ```

   ![image-20241025112101573](https://lixuanfengs.github.io/blog-images/vp/web/image-20241025112101573.png)

2. 解压`fastdfs-nginx-module-6.12.2.tar.gz`源码包找到mod_fastdfs.conf并提取,为后续编译做准备。

   ![image-20241025161438574](https://lixuanfengs.github.io/blog-images/vp/web/image-20241025161438574.png)

3. 从nginx源码包中找到`nginx.conf` 提取配置文件

   ![image-20241025161709574](https://lixuanfengs.github.io/blog-images/vp/web/image-20241025161709574.png)

在 `/sg-work/fastdfs-docker/` 目录下新建 `conf` 目录，将所有需要的配置文件都 `cp` 到`conf `目录下

```shell
$ mkdir conf
$ cp -r /sg-work/fastdfs-docker/fastdfs-6.12.2/conf/* /sg-work/fastdfs-docker/conf/
$ cp fastdfs-nginx-module-1.24/src/mod_fastdfs.conf conf/
$ cp nginx-1.26.2/conf/nginx.conf conf/
```

### 2.2 改相关配置文件

#### 2.2.1 修改 `tracker.conf`

```bash
# 禁用配置文件（默认为 false，表示启用配置文件）
disabled=false
# Tracker 服务端口（默认为 22122）
port=22122
# 存储日志和数据的根目录
base_path=/home/fastdfs
```

#### 2.2.2 修改 `storage.conf`

这里只修改base_path、store_path0、tracker_server

```bash
# 启用配置文件（默认为 false，表示启用配置文件）
disabled=false
# Storage 服务端口（默认为 23000）
port=23000
# 数据和日志文件存储根目录
base_path=/home/fastdfs
# 存储路径，访问时路径为 M00
# store_path1 则为 M01，以此递增到 M99（如果配置了多个存储目录的话，这里只指定 1 个）
store_path0=/home/fastdfs
# Tracker 服务器 IP 地址和端口，单机搭建时也不要写 127.0.0.1
# tracker_server 可以多次出现，如果有多个，则配置多个
tracker_server=192.168.1.20:22122
```

#### 2.2.3 修改 `client.conf`

```bash
# 存储日志文件的基本路径
base_path=/home/fastdfs
# Tracker 服务器 IP 地址与端口号
tracker_server=192.168.1.20:22122
```

#### 2.2.4 修改 `mod_fastdfs.conf`

```bash
# Tracker 服务器IP和端口修改
tracker_server=192.168.1.20:22122
# url 中是否包含 group 名称，改为 true，包含 group
url_have_group_name = true
# 配置 Storage 信息，修改 store_path0 的信息
store_path0=/home/fastdfs
```

#### 2.2.5 修改 `nginx.conf`

新增 8888 端口 server 节点，如图所示：

```nginx
server {
    listen       8888;
    server_name  localhost;
 
    location ~/group[0-9]/M[0-9][0-9]/ {
        ngx_fastdfs_module;
    }
}
```

> 说明：
>
> * **`server` 块**：定义了一个服务器块，用于配置一个特定端口上的虚拟主机。
>
>   - **`listen 8888;`**：指定 Nginx 监听的端口号为 8888。
>   - **`server_name localhost;`**：定义该服务器的名称为 `localhost`，即本地主机。
>
>   **`location` 块**：用于匹配特定的 URL 路径，并应用相应的处理规则。
>
>   - **`location ~/group[0-9]/M[0-9][0-9]/`**：这是一个正则表达式路径，匹配以 `/group` 开头、后面紧接着一个数字（0-9）、然后是 `/M` 和两个数字（0-9）的路径。这种路径格式通常用于 FastDFS 分布式文件系统中的文件分组存储结构。
>   - **`ngx_fastdfs_module;`**：这一行调用了 `ngx_fastdfs_module` 模块，表示使用该模块处理匹配到的请求。这个模块用于将 Nginx 与 FastDFS 文件存储系统集成，以便直接从 Nginx 服务器中访问 FastDFS 上的文件。

## 3. 编写 Dockerfile脚本和启动脚本

由于 Centos 已停止更新维护。推荐使用 **Rockylinux** 和 **Ubuntu** 进行构建

### 3.1 基于`centos:7`基础镜像构建

直接在终端输入下面指令，快速创建 `Dockerfile` 文件：

```dockerfile
cat << 'EOF' > Dockerfile
# 基础镜像
FROM centos:7
# 添加配置文件
ADD conf/storage.conf /etc/fdfs/
ADD conf/tracker.conf /etc/fdfs/
ADD conf/client.conf /etc/fdfs/
ADD conf/nginx.conf /etc/fdfs/
ADD conf/mod_fastdfs.conf /etc/fdfs/
ADD conf/http.conf /etc/fdfs/
ADD conf/mime.types /etc/fdfs/
ADD fastdfs.sh /usr/bin/
# 源文件版本号
ARG LIB_VERSION=1.0.75
ARG LIBSERVER_VERSION=1.2.5
ARG FDFS_VERSION=6.12.2
ARG FDFS_NGX_VERSION=1.24
ARG NGX_VERSION=1.26.2
# 添加源文件
ADD libfastcommon-${LIB_VERSION}.tar.gz /usr/local/src/
ADD libserverframe-${LIBSERVER_VERSION}.tar.gz /usr/local/src/
ADD fastdfs-${FDFS_VERSION}.tar.gz /usr/local/src/
ADD fastdfs-nginx-module-${FDFS_NGX_VERSION}.tar.gz /usr/local/src/
ADD nginx-${NGX_VERSION}.tar.gz /usr/local/src/
# 构建镜像时运行的指令
RUN mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak \
  && curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo \
  && yum install -y gcc gcc-c++ make automake autoconf libtool pcre pcre-devel zlib zlib-devel openssl openssl-devel \
  && mkdir -p /home/fastdfs/ \
  && cd /usr/local/src/libfastcommon-${LIB_VERSION}/ \
  && ./make.sh && ./make.sh install \ 
  && cd ../libserverframe-${LIBSERVER_VERSION}/ \
  && ./make.sh clean && ./make.sh && ./make.sh install \
  && cd ../fastdfs-${FDFS_VERSION}/ \
  && ./make.sh && ./make.sh install \
  && cd ../nginx-${NGX_VERSION}/ \
  && ./configure --add-module=/usr/local/src/fastdfs-nginx-module-${FDFS_NGX_VERSION}/src \
  && make && make install \
  && chmod +x /usr/bin/fastdfs.sh \
  #构建完成后清除相关软件包，减少镜像体积
  && rm -rf /usr/local/src/* \
  && yum remove -y gcc gcc-c++ make automake libtool \
  && yum clean all
# 允许外部数据挂载到该目录，容器启动时未指定数据卷，会自动挂载到匿名卷,
VOLUME ["/etc/fdfs"]
# 声明端口, 容器启动时如果使用随机端口映射会自动映射以下端口
EXPOSE 22122 23000 8888
ENTRYPOINT ["/usr/bin/fastdfs.sh"]
EOF
```

### 3.2 基于`RockyLinux 9 `基础镜像构建

```dockerfile
cat << 'EOF' > Dockerfile
# 基础镜像
FROM rockylinux:9
# 添加配置文件
ADD conf/storage.conf /etc/fdfs/
ADD conf/tracker.conf /etc/fdfs/
ADD conf/client.conf /etc/fdfs/
ADD conf/nginx.conf /etc/fdfs/
ADD conf/mod_fastdfs.conf /etc/fdfs/
ADD conf/http.conf /etc/fdfs/
ADD conf/mime.types /etc/fdfs/
ADD fastdfs.sh /usr/bin/
# 源文件版本号
ARG LIB_VERSION=1.0.75
ARG LIBSERVER_VERSION=1.2.5
ARG FDFS_VERSION=6.12.2
ARG FDFS_NGX_VERSION=1.24
ARG NGX_VERSION=1.26.2
# 添加源文件
ADD libfastcommon-${LIB_VERSION}.tar.gz /usr/local/src/
ADD libserverframe-${LIBSERVER_VERSION}.tar.gz /usr/local/src/
ADD fastdfs-${FDFS_VERSION}.tar.gz /usr/local/src/
ADD fastdfs-nginx-module-${FDFS_NGX_VERSION}.tar.gz /usr/local/src/
ADD nginx-${NGX_VERSION}.tar.gz /usr/local/src/
# 构建镜像时运行的指令
RUN yum install -y gcc gcc-c++ make automake autoconf libtool pcre pcre-devel zlib zlib-devel openssl openssl-devel \
  && mkdir -p /home/fastdfs/ \
  && cd /usr/local/src/libfastcommon-${LIB_VERSION}/ \
  && ./make.sh && ./make.sh install \ 
  && cd ../libserverframe-${LIBSERVER_VERSION}/ \
  && ./make.sh clean && ./make.sh && ./make.sh install \
  && cd ../fastdfs-${FDFS_VERSION}/ \
  && ./make.sh && ./make.sh install \
  && cd ../nginx-${NGX_VERSION}/ \
  && ./configure --add-module=/usr/local/src/fastdfs-nginx-module-${FDFS_NGX_VERSION}/src \
  && make && make install \
  && chmod +x /usr/bin/fastdfs.sh \
  #构建完成后清除相关软件包，减少镜像体积
  && rm -rf /usr/local/src/* \
  && yum remove -y gcc gcc-c++ make automake libtool \
  && yum clean all
# 允许外部数据挂载到该目录，容器启动时未指定数据卷，会自动挂载到匿名卷,
VOLUME ["/etc/fdfs"]
# 声明端口, 容器启动时如果使用随机端口映射会自动映射以下端口
EXPOSE 22122 23000 8888
ENTRYPOINT ["/usr/bin/fastdfs.sh"]
EOF
```

### 3.3 基于`Ubuntu 24.04 LTS` 基础镜像构建

```dockerfile
cat << 'EOF' > Dockerfile
# 基础镜像
FROM ubuntu:24.04
# 添加配置文件
ADD conf/storage.conf /etc/fdfs/
ADD conf/tracker.conf /etc/fdfs/
ADD conf/client.conf /etc/fdfs/
ADD conf/nginx.conf /etc/fdfs/
ADD conf/mod_fastdfs.conf /etc/fdfs/
ADD conf/http.conf /etc/fdfs/
ADD conf/mime.types /etc/fdfs/
ADD fastdfs.sh /usr/bin/
# 源文件版本号
ARG LIB_VERSION=1.0.75
ARG LIBSERVER_VERSION=1.2.5
ARG FDFS_VERSION=6.12.2
ARG FDFS_NGX_VERSION=1.24
ARG NGX_VERSION=1.26.2
# 添加源文件
ADD libfastcommon-${LIB_VERSION}.tar.gz /usr/local/src/
ADD libserverframe-${LIBSERVER_VERSION}.tar.gz /usr/local/src/
ADD fastdfs-${FDFS_VERSION}.tar.gz /usr/local/src/
ADD fastdfs-nginx-module-${FDFS_NGX_VERSION}.tar.gz /usr/local/src/
ADD nginx-${NGX_VERSION}.tar.gz /usr/local/src/
# 构建镜像时运行的指令
RUN sed -i 's/archive.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list \
  && sed -i 's/security.ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list \
  && apt-get update \
  && apt-get install -y build-essential libxml2 libxml2-dev libxslt-dev openssl libpcre3 libpcre3-dev libgeoip-dev libgd-dev \
  && mkdir -p /home/fastdfs/ \
  && cd /usr/local/src/libfastcommon-${LIB_VERSION}/ \
  && ./make.sh && ./make.sh install \ 
  && cd ../libserverframe-${LIBSERVER_VERSION}/ \
  && ./make.sh clean && ./make.sh && ./make.sh install \
  && cd ../fastdfs-${FDFS_VERSION}/ \
  && ./make.sh && ./make.sh install \
  && cd ../nginx-${NGX_VERSION}/ \
  && ./configure --add-module=/usr/local/src/fastdfs-nginx-module-${FDFS_NGX_VERSION}/src \
  && make && make install \
  && chmod +x /usr/bin/fastdfs.sh \
  #构建完成后清除相关软件包，减少镜像体积
  && rm -rf /usr/local/src/* \
  &&  cd / \
  &&  apt-get remove -y build-essential \
  &&  apt-get autoremove -y \
  &&  apt-get clean \
  &&  rm -rf /var/lib/apt/lists/* \
  &&  rm -rf /usr/local/src/* \
  &&  rm -rf /tmp/* \
  &&  rm -rf /var/tmp/* \
    # 清理编译过程中产生的临时文件
  &&  find /usr/local -type f -name '*.a' -delete \
  &&  find /usr/local -type f -name '*.la' -delete \
    # 清理日志文件
  &&  find /var/log -type f -delete
# 允许外部数据挂载到该目录，容器启动时未指定数据卷，会自动挂载到匿名卷,
VOLUME ["/etc/fdfs"]
# 声明端口, 容器启动时如果使用随机端口映射会自动映射以下端口
EXPOSE 22122 23000 8888
ENTRYPOINT ["/usr/bin/fastdfs.sh"]
EOF
```

### 3.4 创建 `fastdfs.sh` 启动脚本

```shell
cat << 'EOF' > fastdfs.sh
#!/bin/bash

new_val=\$FASTDFS_IPADDR
old="192.168.1.20"

sed -i "s/\$old/\$new_val/g" /etc/fdfs/client.conf
sed -i "s/\$old/\$new_val/g" /etc/fdfs/storage.conf
sed -i "s/\$old/\$new_val/g" /etc/fdfs/mod_fastdfs.conf

:<<!
cat /etc/fdfs/client.conf > /etc/fdfs/client.conf.bak
cat /etc/fdfs/storage.conf > /etc/fdfs/storage.conf.bak
cat /etc/fdfs/mod_fastdfs.conf > /etc/fdfs/mod_fastdfs.conf.bak
mv /usr/local/nginx/conf/nginx.conf /usr/local/nginx/conf/nginx.conf.bak
!

cp /etc/fdfs/nginx.conf /usr/local/nginx/conf

echo "start trackerd"
/usr/bin/fdfs_trackerd /etc/fdfs/tracker.conf start

echo "start storage"
/usr/bin/fdfs_storaged /etc/fdfs/storage.conf start

echo "start nginx"
/usr/local/nginx/sbin/nginx

:<<!
echo "fdfs monitor"
/usr/bin/fdfs_monitor /etc/fdfs/storage.conf
!

tail -f /dev/null
EOF
```

## 4. 根据`Dockerfile`构建`fastdfs` 镜像

### 4.1 首先准备好相关文件

![image-20241029164035534](https://lixuanfengs.github.io/blog-images/vp/web/image-20241029164035534.png)

```shell
# 下载基础镜像，推荐 rocky 和 ubuntu
$ docker pull centos:7
$ docker pull rockylinux:9
$ docker pull ubuntu:24.04
# 打开Dockerfile所在目录，构建fastdfs镜像
$ docker build -t fastdfs:6.12.2 .
```

### 4.2 构建完成镜像后并使用

```shell
# 创建目录，用于挂载配置文件和数据
$ mkdir -p /opt/docker/fastdfs/conf

# 启动命令
$ docker run -itd --restart=unless-stopped --name fastdfs-centos \
-p 22122:22122 -p 23000:23000 -p 8888:80 \
-v /opt/docker/fastdfs:/home/fastdfs \
-v /opt/docker/fastdfs/conf:/etc/fdfs \
-e FASTDFS_IPADDR=192.168.1.20 \
fastdfs:6.12.2

# 如果要外部主机可以上传文件，要改用宿主机网络
$ docker run -itd --restart=unless-stopped --name=fastdfs --net=host \
-v /opt/docker/fastdfs:/home/fastdfs \
-v /opt/docker/fastdfs/conf:/etc/fdfs/ \
-e FASTDFS_IPADDR=192.168.1.20 \
fastdfs:6.12.2

# 根据容器名快速删除相关容器
$ docker stop $(docker ps -q --filter "name=fastdfs") && docker rm $(docker ps -a -q --filter "name=fastdfs")
```

::: danger 注意

如果是使用打包好的镜像，则需要先将镜像包上传至服务器，然后导入镜像

$ docker save fastdfs:6.12.2 | gzip > fastdfs-docker-image-6.12.2.tar.gz

$ docker load -i /opt/docker/fastdfs-docker-image-6.12.2.tar.gz

:::

### 4.3 校验容器状态并测试上传

```shell
# 进入容器
$ docker exec -it fastdfs /bin/bash

# 使用monitor查看tracker和storage服务状态
$ /usr/bin/fdfs_monitor /etc/fdfs/storage.conf

# 如果只是查看状态，可以不进入容器
$ docker exec -i fastdfs /usr/bin/fdfs_monitor /etc/fdfs/storage.conf
```

如图如果显示ACTIVE，则表示服务正常启动。

![image-20241029164859685](https://lixuanfengs.github.io/blog-images/vp/web/image-20241029164859685.png)

往宿主机与容器共享的目录下方一图照片,进入容器使用上传命令上传图片。

![image-20241029171835246](https://lixuanfengs.github.io/blog-images/vp/web/image-20241029171835246.png)

根据上传返回的路径进行访问：

![image-20241029172044147](https://lixuanfengs.github.io/blog-images/vp/web/image-20241029172044147.png)

**至此使用Docker构建 fastdfs容器测试完毕！** 
