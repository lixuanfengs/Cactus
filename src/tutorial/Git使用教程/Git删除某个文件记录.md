---
title: "Git删除某个文件记录"
subtitle: "Git删除某个文件记录"
date: 2024-10-23 17:33:30
category:
  - Git
tag:
  - filter-repo
order: 2
---


## Git强制删除文件历史记录

1. **确保已经备份（重要）**： 首先，请确保你对当前仓库有备份，`git filter-repo` 是一个不可逆的操作，执行后所有删除的数据将无法恢复。

2. **运行 `git filter-repo` 命令**： 使用 `git filter-repo` 来完全删除指定文件的历史，确保文件在所有 commit 中都被清除。

   ```shell
   $ git filter-repo --path '/d/Company_projects/application/cactus-vue-pro/cactus-server/src/main/resources/application.yaml' --invert-paths
   ```

   如果路径中有误，请检查并确保路径完全正确。如果你想删除所有版本中的 `application.yaml` 文件，可以使用通配符：

   ```shell
   $ git filter-repo --path-glob '*/application.yaml' --invert-paths
   ```

   这个命令将删除任何目录下名为 `application.yaml` 的文件。

   > ```shell
   > $ git filter-repo --path-glob '*/application-dev.yaml' --invert-paths
   > $ git filter-repo --path-glob '*/application-local.yaml' --invert-paths
   > $ git filter-repo --path-glob '*/logback-spring.xml' --invert-paths
   > ```

3. **强制推送到远程仓库**： 如果你正在处理的是一个远程仓库，删除文件历史后，你需要强制推送修改。

   > **注意：** 这会覆盖远程仓库的历史，其他开发者可能会受到影响，所以建议在推送之前先与团队沟通。

   ```shell
   $ git push origin --force --all
   $ git push origin --force --tags
   ```

   这样会强制将本地的修改（包括历史记录的修改）推送到远程仓库。

4. **清理本地及远程缓存**： 执行以下命令以确保远程仓库的垃圾数据也被清理掉：

   ```shell
   $ git gc --prune=now --aggressive
   $ git repack -ad
   ```

5. **验证结果**： 你可以通过以下命令来验证是否已完全删除文件的历史：

   ```shell
   $ git log --all --full-history -- '**/application.yaml'
   ```

   如果没有任何输出，说明该文件及其历史已完全删除。