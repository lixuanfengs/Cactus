---
title: "自建RustDesk 远程桌面教程"
subtitle: "devops"
date: 2025-6-03 14:06:01
category:
  - devops
tag:
  - RustDesk
order: 12
---

## 使用 Docker 部署服务端

### 1. 环境要求

您需要安装 Docker/Podman 才能将 rustdesk-server 作为 Docker 容器运行。如有疑问，请按照本[指南](https://docs.docker.com/engine/install)安装 Docker ，以确保其为最新版本！

请确保在防火墙中打开这些端口：

- **hbbs：**
  - `21114`（TCP）：用于Web控制台，仅在`Pro`版本中可用。
  - `21115`（TCP）：用于NAT类型测试。
  - `21116`（TCP/UDP）：**请注意，`21116`TCP 和 UDP 都应该启用。** `21116/UDP`用于 ID 注册和心跳服务。`21116/TCP`用于 TCP 打洞和连接服务。
  - `21118`（TCP）：用于支持Web客户端。
- **hbbr：**
  - `21117`（TCP）：用于中继服务。
  - `21119`（TCP）：用于支持Web客户端。

*如果不需要Web客户端支持，可以关闭相应`21118`端口`21119`。*

### 2. Docker 示例 

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```

> `--net=host`仅适用于**Linux 系统**，这使得`hbbs`/`hbbr`查看真实的传入 IP 地址，而不是容器 IP (172.17.0.1)。如果`--net=host`运行正常，`-p`则不使用这些选项。如果在 Windows 系统中，请省略`sudo`和`--net=host`。
>
> **`--net=host`如果您的平台遇到连接问题，请删除。**

`--net=host` 模式直接使用了宿主机的网络，这样的好处是不需要管理端口，而且可以查看每个连接的 IP 地址，如果希望自定义端口使用以下命令：

```sh
# 先启动 hbbr 容器
docker run --name hbbr \
  --restart always \
  -v ./rust-desk:/root \
  -p 30007:21117 \
  -d rustdesk/rustdesk-server

# 启动完成后再启动 hbbs 容器
docker run --name hbbs \
   --restart always \
   -v ./rust-desk:/root \
   -p 30005:21115 \
   -p 30006:21116/tcp \
   -p 30006:21116/udp \
   -d rustdesk/rustdesk-server
```

### 3. Docker Compose 示例 

要按照此处所述运行 Docker 文件，`compose.yml`您需要安装[Docker Compose](https://docs.docker.com/compose/)。

```yaml
cat > rustdesk-compose.yml <<EOF
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
EOF
```

如果您需要进行配置更改，例如设置 ALWAYS_USE_RELAY=Y，您可以使用 docker-compose.yml 中的环境

```yaml
cat > rustdesk-compose.yml <<EOF
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    environment:
      - ALWAYS_USE_RELAY=Y
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: "host"

    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
EOF
```

运行命令安装程序：

```sh
docker compose -f rustdesk-compose.yml up -d
```

到这里 RustDesk 服务端其实就已经部署完成了，部署完成后当前目录会多一个 rust-desk 的目录，通过查看该目录下的 `.pub ` 查看 KEY，后面会用到：

```sh
cat ./data/id_ed25519.pub 
T07pESbNfyozhAEKQNpRkVPwEayOPl598q5Vf5ZA=
```



## 客户端配置说明

访问 [Github](https://github.com/rustdesk/rustdesk/releases/tag/1.4.0) 下载官方提供的客户端，这里我用 win 系统举例，推荐下载 MSI 安装程序。

![image-20250716105200167](https://beauties.eu.org/blogimg/main/img1/image-20250716105200167.png)





分别在控制端和被控端安装完成后打开软件，依次点击右上角设置、网络、解锁网络设置，然后点击 ID/中继服务器：

![image-20250716105420155](https://beauties.eu.org/blogimg/main/img1/image-20250716105420155.png)

ID 服务器填写 21116端口，中继服务器填写 21117  端口，API 服务器留空即可，KEY 填写刚刚在服务端查看的 KEY，控制端和被控段都需要这么配置:

![image-20250716151902535](https://beauties.eu.org/blogimg/main/img1/image-20250716151902535.png)

配置完成后点击保存，回到主界面就能看到下面是就绪的状态了:

![image-20250716151944289](https://beauties.eu.org/blogimg/main/img1/image-20250716151944289.png)

然后直接输入被控端的 ID 点击连接，输入连接密码，就可以进行远程连接了！

![image-20250716152212135](https://beauties.eu.org/blogimg/main/img1/image-20250716152212135.png)