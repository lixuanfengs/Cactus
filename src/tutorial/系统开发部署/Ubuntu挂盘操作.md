---
title: "Ubuntu挂盘操作"
subtitle: "Ubuntu挂盘操作"
date: 2024-4-03 15:36:20
category:
  - Ubuntu 挂盘操作
tag:
  - Ubuntu 挂盘操作
order: 6
---

## 检查硬盘，首先需要查看新硬盘能否被机器识别

```shell
sudo lsblk
```

![image-20240905161439566](https://lixuanfengs.github.io/blog-images/vp/web/image-20240905161439566.png)

可以看见我们系统盘里有一个vdb1 的新硬盘500GB 被识别到。

## 找到新硬盘的设备名称

```shell
sudo fdisk -l
```

![image-20240905161750214](https://lixuanfengs.github.io/blog-images/vp/web/image-20240905161750214.png)

我们可以看到新硬盘名称 /dev/vdb1 里面是有内容的。

## 创建一个挂载点

```shell
sudo mkdir -p work
```

![image-20240905162926662](https://lixuanfengs.github.io/blog-images/vp/web/image-20240905162926662.png)

## 格式化硬盘

```shell
# 注意：此操作将删除分区上的所有数据，请确保数据已备份。
sudo mkfs.xfs /dev/vdb1
```

### 如果需要格式化的盘里有文件运行以下命令

```shell
mkfs.xfs -f /dev/vdb1
```

![image-20240905163520692](https://lixuanfengs.github.io/blog-images/vp/web/image-20240905163520692.png)

### 验证文件系统格式

要再次确认 `/dev/vdb1` 的文件系统格式是否为 `XFS`，可以使用以下命令：

- 使用 `lsblk -f` 检查文件系统类型：

  ```shell
  sblk -f
  ```

- 或者使用 `file` 命令：

  ```shell
  file -s /dev/vdb1
  ```

输出应该显示 `XFS` 文件系统。

![image-20240905162800175](https://lixuanfengs.github.io/blog-images/vp/web/image-20240905162800175.png)

## 挂载分区

```shell
sudo mount /dev/vdb1 /work
```

### 验证挂载

```shell
sudo df -h
```

![image-20240905164055935](https://lixuanfengs.github.io/blog-images/vp/web/image-20240905164055935.png)

### 配置开机自动挂载

获取分区的 UUID：

```shell
root@kejipingshen-zygx-8new:/work# sudo blkid /dev/vdb1
/dev/vdb1: UUID="8c420242-b791-49fe-bbe3-614ee08be462" TYPE="xfs" PARTUUID="f3c842ff-01"
root@kejipingshen-zygx-8new:/work#
```

然后将以下内容添加到 `/etc/fstab`：

```shell
UUID="8c420242-b791-49fe-bbe3-614ee08be462" /work xfs defaults 0 0
```

#### 1.确保 `/etc/fstab` 中的配置正确：

假设您已经在 `/etc/fstab` 中配置了如下条目：

```shell
UUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx /work/data xfs defaults 0 0
```

1. **运行 `mount -a`**：

   运行以下命令来检查并应用 `/etc/fstab` 中的配置：

   ```shell
   sudo mount -a
   ```

   如果 `/etc/fstab` 配置正确，系统将自动挂载尚未挂载的分区。

2. **验证挂载情况**：

   使用 `df -h` 或 `mount | grep /mnt/data` 来验证挂载是否成功：

   ```shell
   sudo df -h
   ```

   或者：

   ```shell
   sudo mount | grep /mnt/data
   ```

#### 2. 手动卸载并重新挂载分区

如果已经手动挂载了该分区，可以先卸载它，然后使用 `mount -a` 来验证 `/etc/fstab` 的配置。

步骤：

1. **卸载分区**：

   ```shell
   sudo umount /mnt/data
   ```

2. **使用 `mount -a` 挂载分区**：

   ```shell
   sudo mount -a
   ```

3. **检查挂载是否成功**：

   使用 `df -h` 或 `mount` 命令检查挂载情况。

#### 3. 检查 `/etc/fstab` 语法是否正确

在使用 `mount -a` 之前，您可以先检查 `/etc/fstab` 文件的语法是否正确，避免挂载时出现问题。可以使用以下命令来验证：

```shell
sudo mount -fav
```

其中：

- `-f` 选项表示只检查但不实际挂载（dry-run）。
- `-a` 表示挂载 `/etc/fstab` 中的所有分区。
- `-v` 表示输出详细信息。



## 迁移 Docker 的 `overlay2` 文件夹

要将 Docker 的 `overlay2` 文件夹迁移到另一个文件夹下，可以按照以下步骤操作。假设你想把 Docker 的数据迁移到一个新的目录，比如 `/new-docker-data`。

### 1. 停止 Docker 服务

首先，确保所有容器都停止运行，并停止 Docker 服务。

```shell
sudo systemctl stop docker
```

### 2. 创建新目录

在目标位置创建一个新目录，用于存放 Docker 数据。

```shell
sudo mkdir -p /new-docker-data
```

### 3. 移动 Docker 数据

将现有的 Docker 数据从 `/var/lib/docker` 迁移到新的目录。这里需要使用 `rsync` 或 `mv` 来移动数据。

使用 `rsync` 的好处是能够保证文件权限、属性等信息被完整迁移，推荐使用 `rsync`。

```shell
sudo rsync -aP /var/lib/docker/ /new-docker-data/
```

### 4. 修改 Docker 配置文件

Docker 的默认数据目录是 `/var/lib/docker`，我们需要修改 Docker 的配置文件，指向新的目录。

编辑 Docker 的配置文件 `/etc/docker/daemon.json`，如果文件不存在，你可以新建这个文件。

```shell
sudo vim /etc/docker/daemon.json
```

添加以下内容：

```json
{
  "data-root": "/new-docker-data"
}
```

保存并退出编辑器。

### 5. 重启 Docker 服务

现在可以重新启动 Docker 服务，并检查它是否正确运行。

```shell
sudo systemctl start docker
```

### 6. 验证

使用 `docker info` 命令查看 Docker 的数据目录是否已经生效：

```shell
sudo docker info | grep "Docker Root Dir"
```

你应该看到 `Docker Root Dir` 指向你指定的新目录 `/new-docker-data`。

如果一切正常，且旧的数据目录没有任何问题，你可以安全地删除旧的 `/var/lib/docker` 目录。

```shell
sudo rm -rf /var/lib/docker
```

按照以上步骤，你就能成功地将 Docker 的数据目录迁移到另一个文件夹下了。

## Ubuntu 20.04 中进行磁盘分区

1.**使用 `fdisk` 创建新分区：** 输入以下命令进入 `fdisk` 界面：

```shell
fdisk /dev/vdb
```

然后执行以下步骤：

- 输入 `n` 创建新分区。
- 输入 `p` 创建主分区。
- 选择分区号，例如 1（默认）。
- 按回车键以接受默认的第一个和最后一个扇区（或根据需要自定义大小）。
- 输入 `w` 保存并退出 `fdisk`。

**刷新分区表：** 运行以下命令确保内核更新了分区表：

```
partprobe /dev/vdb
```

**格式化分区为 `xfs` 文件系统：** 使用以下命令将新创建的分区格式化为 `xfs` 文件系统：

```
mkfs.xfs /dev/vdb1
```

**挂载分区（可选）：** 创建挂载点并将分区挂载：

```
bash复制代码mkdir /mnt/vdb1
mount /dev/vdb1 /mnt/vdb1
```