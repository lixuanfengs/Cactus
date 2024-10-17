---
title: "Docker命令记录"
subtitle: "Docker命令记录"
date: 2024-9-30 15:57:02
category:
- Docker
tag:
- Docker
order: 1
---

## Docker 入门

### 安装

**官网安装：https://docs.docker.com/engine/install/**

**利用脚本进行安装**：

```shell
$ curl -sSL https://get.docker.com/ | sh
$ sudo chmod 777 /var/run/docker.sock
```

**后台创建和运行容器**

```shell
$ docker run -d -p 80:80 docker/getting-started
```

> - `-d` 以分离（后台）模式运行容器
> - `-p 80:80`  将端口 80 映射到容器中的端口 80，格式：宿主机端口:容器端口
> - `docker/getting-started` 要使用的镜像

**以交互式命令创建并运行容器**

```shell
$ docker run -it --rm -p  8001:8080 --name my-nginx nginx
```

> 如果要退出容器但是不关闭容器，按*Ctrl+P+Q*即可。
>
> - `-it` 交互式 bash 模式
> - `--rm` 容器终止运行后自动删除容器文件
> - `-p 8001:8080` 将 `8001` 端口映射到容器中的 `8080` 端口
> - `--name my-nginx` 指定名称
> - `nginx` 要使用的镜像

### 一般命令

| 命令                                | 解释                                 |
| ----------------------------------- | ------------------------------------ |
| `docker ps`                         | 列出正在运行的容器                   |
| `docker ps -a`                      | 列出所有容器                         |
| `docker ps -s`                      | 列出正在运行的容器 *(带 CPU / 内存)* |
| `docker images`                     | 列出所有镜像                         |
| `docker exec -it <container>  bash` | 连接到容器                           |
| `docker logs <container>`           | 显示容器的控制台日志                 |
| `docker stop <container>`           | 停止容器                             |
| `docker restart <container>`        | 重启一个容器                         |
| `docker rm <container>`             | 移除一个容器                         |
| `docker port <container>`           | 显示容器的端口映射                   |
| `docker top <container>`            | 列出进程                             |
| `docker kill <container>`           | 杀死一个容器                         |

## Docker 容器命令

### 启动和停止

| 命令                          | 解释           |
| ----------------------------- | -------------- |
| `docker start nginx-server`   | 开始           |
| `docker stop nginx-server`    | 停止           |
| `docker restart nginx-server` | 重启           |
| `docker pause nginx-server`   | 暂停           |
| `docker unpause nginx-server` | 取消暂停       |
| `docker wait nginx-server`    | 阻塞容器       |
| `docker kill nginx-server`    | 发送 SIGKILL   |
| `docker attach nginx-server`  | 连接到现有容器 |

### 查询容器信息

| 命令                          | 解释                 |
| ----------------------------- | -------------------- |
| `docker ps`                   | 列出正在运行的容器   |
| `docker ps -a`                | 列出所有容器         |
| `docker logs nginx-server`    | 容器日志             |
| `docker inspect nginx-server` | 检查容器             |
| `docker events nginx-server`  | 容器事件             |
| `docker port nginx-server`    | 公共端口             |
| `docker top nginx-server`     | 运行进程             |
| `docker stats nginx-server`   | 容器资源使用         |
| `docker diff nginx-server`    | 列出对容器所做的更改 |



| session-01                                              | session-02---新启动一个客户端连接                            |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| BEGIN;<br/>UPDATE t_customer SET age=1 WHERE cname='z3' |                                                              |
|                                                         | UPDATE t_customer SET age=44 WHERE CNAME='z4'; #ok。<br />或者<br />UPDATE t_customer SET age=44 WHERE CNAME='z4'; #ok。<br />或者<br />UPDATE t_customer SET age=11 WHERE id=4; # 转圈圈<br />UPDATE t_customer SET age=11 WHERE CNAME='z3' # 转圈圈 |
| commit/rollback;                                        |                                                              |
|                                                         | ok                                                           |
| 按照主键索引id                                          |                                                              |