---
title: "Docker-Slim 压缩 Docker 镜像"
subtitle: "使用 Docker-Slim 压缩 Docker 镜像"
date: 2024-9-25 11:15:26
category:
- Docker
tag:
- Docker
order: 2
---

## Docker-Slim

Docker-Slim 不会更改 Docker 容器映像中的任何内容并将其缩小多达 30 倍。 Docker-Slim 将通过使用各种分析技术了解您的应用程序及其需求来优化和保护您的容器。它会丢弃你不需要的东西,减少容器的攻击面。

Github：[Docker-Slim](https://github.com/slimtoolkit/slim)

## 安装

### 手动安装

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

### 脚本安装

#### 脚本

你可以使用此脚本在Linux（x86和ARM）和macOS（x86和Apple Silicon）上安装当前版本的Slim。

```ruby
curl -sL https://raw.githubusercontent.com/slimtoolkit/slim/master/scripts/install-slim.sh | sudo -E bash -
```

#### Mac：

```shell
brew install docker-slim
```

#### Docker:

```shell
docker pull dslim/slim
```

### 如何使用

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