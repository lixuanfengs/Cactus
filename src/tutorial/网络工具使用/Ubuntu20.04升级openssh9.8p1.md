---
title: "升级openssh9.8p1"
subtitle: "升级openssh9.8p1"
date: 2024-11-08 11:38:20
category:
  - openssh
tag:
  - openssh
order: 3
---
## 一、问题简介

 8.5p1 和 9.7p1 之间的openssh版本漏洞可能会导致[linux系统](https://so.csdn.net/so/search?q=linux系统&spm=1001.2101.3001.7020)以root身份进行RCE，所以需安装最新版本

## 二、解决方案

将当前openssh版本升级到最新的版本即openssh-9.8p1版本，OpenSSL大版本升级且OpenSSH有新稳定版本，建议升级OpenSSL同时也升级OpenSSH

### 1.安装编译依赖包

```shell
apt install gcc make zlib1g-dev libpam0g-dev libkrb5-dev libedit-dev -y
```

### 2.先升级openssl,再升级openssh

ubuntu20.04 默认openssl版本：OpenSSL 1.1.1f

![image-20241105171646371](https://beauties.eu.org/blogimg/main/img1/image-20241105171646371.png)

ssh的版本为：OpenSSH_8.2p1

![image-20241105171719525](https://beauties.eu.org/blogimg/main/img1/image-20241105171719525.png)

### 3.下载OpenSSL

**访问openssl官网**：https://openssl-library.org/source/

找到最新版本通过wget下载到 /usr/local/src 目录下

```shell
wget -P /usr/local/src https://www.openssl.org/source/openssl-3.3.2.tar.gz
```

> 注意：由于OpenSSL 1.1.x版本已停止维护，ubuntu20.04.x系统建议都使用目前长期支持版

**安装 `openssl-3.0.15`**

```
cd /usr/local/src/

tar -zxf openssl-3.0.15.tar.gz	

cd openssl-3.0.15

./config shared --prefix=/usr/local/openssl --openssldir=/usr/local/openssl
```

![image-20241105173041174](https://beauties.eu.org/blogimg/main/img1/image-20241105173041174.png)

**进行编译和安装**

```shell
make clean && make && make install
```

运行一段时间等编译安装完成，完成后执行`echo $?` 命令（判断上一个命令的执行结果）显示 `0` 代表编译执行成功。

![image-20241105174202242](https://beauties.eu.org/blogimg/main/img1/image-20241105174202242.png)

**备份原来的openssl**

```shell
mv /usr/bin/openssl  /usr/bin/openssl.bak
ln -s /usr/local/openssl/bin/openssl  /usr/bin/openssl
```

![image-20241105174650468](https://beauties.eu.org/blogimg/main/img1/image-20241105174650468.png)

**将openssl 的lib 库添加到系统(‘/usr/local/openssl/lib64’ 单引号)**

```shell
#openssl 1.x.x版本是: /usr/local/openssl/lib/ 路径
#echo '/usr/local/openssl/lib' > /etc/ld.so.conf.d/openssl.conf
#openssl 3.x.x版本
echo '/usr/local/openssl/lib64' > /etc/ld.so.conf.d/openssl.conf 
```

![image-20241105174922253](https://beauties.eu.org/blogimg/main/img1/image-20241105174922253.png)

**然后加载lib库**

```shell
ldconfig -v
```

![image-20241105175020108](https://beauties.eu.org/blogimg/main/img1/image-20241105175020108.png)

**查看OpenSSL版本**

![image-20241105175112675](https://beauties.eu.org/blogimg/main/img1/image-20241105175112675.png)

### 4.下载OpenSSH包

访问链接：https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/

通过wget下载 OpenSSH_9.8p1 到 /usr/local/src 目录下

```shell
wget -P /usr/local/src https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/openssh-9.8p1.tar.gz
```

备份文件

```shell
mkdir /usr/bin/bak
cp -arpf /usr/bin/scp /usr/bin/bak/scp.bak
cp -arpf /usr/bin/sftp /usr/bin/bak/sftp.bak
cp -arpf /usr/bin/ssh /usr/bin/bak/ssh.bak
cp -arpf /usr/bin/ssh-add /usr/bin/bak/ssh-add.bak
cp -arpf /usr/bin/ssh-agent /usr/bin/bak/ssh-agent.bak
cp -arpf /usr/bin/ssh-keygen /usr/bin/bak/ssh-keygen.bak
cp -arpf /usr/bin/ssh-keyscan /usr/bin/bak/ssh-keyscan.bak
mkdir /usr/sbin/bak
cp -arpf /usr/sbin/sshd /usr/sbin/bak/sshd.bak
```

> **参数和命令解释**
>
> - **`cp`**：复制命令，用于将文件或目录从一个位置复制到另一个位置。
> - **`-a`**：`--archive` 选项，表示归档模式，复制文件及其所有属性（如权限、时间戳和符号链接），并递归地复制目录结构。
> - **`-r`**：`--recursive` 选项，递归复制目录（对于单个文件这里不是必须的，但常常与 `-a` 一起使用）。
> - **`-p`**：`--preserve` 选项，保留文件的权限、所有权和时间戳等属性（此选项已被 `-a` 包含，但可额外加上以确保属性不被忽略）。
> - **`-f`**：`--force` 选项，如果目标文件已存在则强制覆盖。

进入openssh-9.8p1目录，执行编译安装命令

```shell
tar -zxf openssh-9.8p1.tar.gz

cd  /usr/local/src/openssh-9.8p1

./configure --prefix=/usr/local/openssh-9.8p1 --sysconfdir=/etc/ssh --with-kerberos5 --with-libedit --with-pam --with-gssapi --with-zlib --with-ssl-dir=/usr/local/openssl --with-privsep-path=/var/lib/sshd

make clean && make && make install
```

![image-20241105180409424](https://beauties.eu.org/blogimg/main/img1/image-20241105180409424.png)

make install运行完后执行`echo $?` 命令（判断上一个命令的执行结果）显示 `0` 代表编译执行成功。

![image-20241105181909513](https://beauties.eu.org/blogimg/main/img1/image-20241105181909513.png)

替换新版本openssh相关命令

```shell
cp -arpf /usr/local/openssh-9.8p1/bin/* /usr/bin/
cp -arpf /usr/local/openssh-9.8p1/sbin/*   /usr/sbin/
```

重启ssh

```shell
systemctl daemon-reload
systemctl restart sshd
ssh -V
```

![image-20241105182219796](https://beauties.eu.org/blogimg/main/img1/image-20241105182219796.png)