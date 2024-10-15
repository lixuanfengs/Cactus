---
title: "Docker压缩镜像体积"
subtitle: "Docker压缩镜像体积"
date: 2024-9-25 11:15:26
category:
- Docker
tag:
- Docker
order: 2
---

## 1. 手动优化镜像体积【推荐】

### 1.1 新建 Dockerfile 并 build 为镜像

新建 Dockerfile文件，用于制作后端项目的 Docker 镜像。编写内容如下：

```dockerfile
## AdoptOpenJDK 停止发布 OpenJDK 二进制，而 Eclipse Temurin 是伸，提供更好的稳定性
FROM eclipse-temurin:17

## 创建目录，并使用它作为工作目录
RUN mkdir -p /cactus-server
WORKDIR /cactus-server
## 将后端项目的 Jar 文件，复制到镜像中
COPY cactus-server.jar app.jar

## 设置 TZ 时区
## 设置 JAVA_OPTS 环境变量，可通过 docker run -e "JAVA_OPTS=" 进行覆盖
ENV TZ=Asia/Shanghai JAVA_OPTS="-Xms512m -Xmx512m"

## 暴露后端项目的 48080 端口
EXPOSE 48080

## 启动后端项目
ENTRYPOINT java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar app.jar
```

文件中 cactus-server.jar 的大小如图：

![image-20241015105045146](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20241015105045146.png)

执行如下命令，构建名字为 `cactus-server-offline-a` 的 Docker 镜像。

```shell
docker build --no-cache -t cactus-server-offline-a:latest .
```

打包镜像完成后使用命令 `docker images` 来查看镜像的体积：

![image-20241015105446540](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20241015105446540.png)

> 可以看到此时的镜像体积是593MB。

### 1.2 压缩减小镜像体积

首先优化镜像体积有以下几个步骤：

* **使用 Alpine 作为基础镜像**：Alpine Linux 是一个轻量级的 Linux 发行版，可以显著减少镜像体积。

* **多阶段构建**：在第一阶段进行构建和打包，在第二阶段只保留运行时所需的内容。

* **删除无用文件和缓存**：安装软件包后，清理缓存和临时文件。

* **确保字体文件可用**：如果 Java 需要特定字体，明确安装它们。

根据以上步骤，优化好的 Dockerfile 如下：

```dockerfile
FROM eclipse-temurin:17-jre-alpine

# 安装字体和配置文件（尽量减少包）
RUN apk add --no-cache ttf-dejavu fontconfig && \
    rm -rf /var/cache/apk/*

# 创建工作目录并复制 jar 文件
WORKDIR /cactus-server
COPY cactus-server.jar app.jar

# 设置环境变量
ENV TZ=Asia/Shanghai \
    JAVA_OPTS="-Xms512m -Xmx512m"

# 暴露端口
EXPOSE 48800

# 启动服务
ENTRYPOINT java ${JAVA_OPTS} -Dfile.encoding=UTF-8 \
    -Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom \
    -jar app.jar

```

执行如下命令，构建名字为 `cactus-server-offline-a` 的 Docker 镜像。

```shell
docker build --no-cache -t cactus-server-offline-a:latest .
```

此时通过使用命令 `docker images` 再来查看镜像的体积：

![image-20241015110302796](C:\Users\Dell\AppData\Roaming\Typora\typora-user-images\image-20241015110302796.png)

如图所示，镜像体积从一开始的593MB成功减少到了346MB。

## 2. Docker-Slim压缩镜像体积

Docker-Slim 不会更改 Docker 容器映像中的任何内容并将其缩小多达 30 倍。 Docker-Slim 将通过使用各种分析技术了解您的应用程序及其需求来优化和保护您的容器。它会丢弃你不需要的东西,减少容器的攻击面。

Github：[Docker-Slim](https://github.com/slimtoolkit/slim)

### 2.1 安装

#### 2.1.1 手动安装

1. 下载对应平台的包。
   - [Latest Mac binaries](https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_mac.zip) (`curl -L -o ds.zip https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_mac.zip`)
   - [Latest Mac M1 binaries](https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_mac_m1.zip) (`curl -L -o ds.zip https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_mac_m1.zip)`)
   - [Latest Linux binaries](https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux.tar.gz) (`curl -L -o ds.tar.gz https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux.tar.gz`)
   - [Latest Linux ARM binaries](https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux_arm.tar.gz) (`curl -L -o ds.tar.gz https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux_arm.tar.gz`)
   - [Latest Linux ARM64 binaries](https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux_arm64.tar.gz) (`curl -L -o ds.tar.gz https://github.com/slimtoolkit/slim/releases/download/1.40.11/dist_linux_arm64.tar.gz`)
2. 解压缩包，并选择性的将其移动到 bin 目录。

**Linux：dist_linux**

```bash
tar -xvf dist_linux.tar.gz
mv  dist_linux/docker-slim /usr/local/bin/
mv  dist_linux/slim-sensor /usr/local/bin/
mv  dist_linux/slim /usr/local/bin/
```

**苹果Mac：**

```bash
unzip ds.zip
mv  dist_mac/docker-slim /usr/local/bin/
mv  dist_mac/docker-slim-sensor /usr/local/bin/
```

1. 将解压缩包的位置添加到 PATH 环境变量中(可选)。

> 如果提取二进制文件的目录不在 PATH 中，则需要从该目录运行 Slim 应用二进制文件。

#### 2.1.2 脚本安装

**脚本**

你可以使用此脚本在Linux（x86和ARM）和macOS（x86和Apple Silicon）上安装当前版本的Slim。

```ruby
curl -sL https://raw.githubusercontent.com/slimtoolkit/slim/master/scripts/install-slim.sh | sudo -E bash -
```

**Mac：**

```shell
brew install docker-slim
```

**Docker:**

```shell
docker pull dslim/slim
```

### 2.2 如何使用

```bash
docker images | grep offline 
```

![image-20240925111156650](https://lixuanfengs.github.io/blog-images/vp/web/image-20240925111156650.png)

```bash
docker-slim build -http-probe=false --target cactus-server-offline:latest --tag cactus-server-offline:slim
```

![image-20240925111948723](https://lixuanfengs.github.io/blog-images/vp/web/image-20240925111948723.png)

> *默认会开启http的探测(--http-probe)。我们build的时候给他关上*

我们看到 cactus-server-offline:lates 镜像从 596MB 减少到了 352MB，至此，本次教程就到这里了。