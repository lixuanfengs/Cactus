---
title: "Git常用命令"
subtitle: "Git常用命令"
date: 2024-10-23 12:33:30
category:
  - Git
tag:
  - 常用命令
order: 1
---

## 基础命令

### 创建存储库

```shell
# 创建一个新的本地存储库
$ git init [项目名称]

# 克隆存储库(代码仓库)
$ git clone <git_url>

# 将存储库克隆到指定目录
$ git clone <git_url> 指定目录

# 将存储库克隆到指定目录，并指定分支
$ git clone <git_url> -b <分支名称> 指定目录
```

### 做出改变

```shell
# 在工作目录中显示修改后的文件，为您的下一次提交暂存
$ git status

# 暂存文件，准备提交
$ git add [file]

# 暂存所有更改的文件，准备提交
$ git add .

# 将所有暂存文件提交到版本化历史记录
$ git commit -m "commit message"

# 将所有跟踪的文件提交到版本化历史记录
$ git commit -am "commit message"

# 取消暂存文件，保留文件更改
$ git reset [file]

# 将所有内容恢复到最后一次提交
$ git reset --hard

# 已更改但未暂存内容的差异
$ git diff

# 已 commited 但尚未提交的内容的差异
$ git diff --staged

# 在指定分支之前应用当前分支的任何提交
$ git rebase [branch]
```

### 全局配置

```shell
# 设置将附加到您的提交和标签的名称：
$ git config --global user.name "name"

# 设置将附加到您的提交和标签 tags 的电子邮件地址
$ git config --global user.email "email"

# 启用 Git 输出的一些着色
$ git config --global color.ui auto

# 在文本编辑器中编辑全局配置文件
$ git config --global --edit

# 显示本地 repo 配置设置
$ git config --list

# 删除全局设置
$ git config --global --unset <entry-name>
```