> 开源工具、建设比较完善的知识体系。

## 🌈建设初衷

我曾经使用过多款知识管理工具,如typora、有道云和语雀等,来存放我的收藏和笔记。然而,这种方式导致我的资料非常分散,难以管理和分享。

我认为更重要的是，**笔记中的知识只有经过消化和应用,才能成为你自己的知识和财富。。**

为此，我基于`vuepress2.x`和`vuepress-theme-hope`开发， 构建了 Cactus 开源笔记，将我所有的笔记与文章聚合到同一页面形成知识库，便于集中管理和分享。

## 📑知识库地址

地址：[https://cactusli.net](https://cactusli.net)

知识库基于`vuepress2.x`和`vuepress-theme-hope`开发，最大限度利用vite的打包速度，基于TypeScript使用vue3编写组件

## ✍知识笔记结构

- 主页：Bing 风景图、笔记列表、阅读；
- 导航：日常笔记、本站导航；
- 知识体系：学习笔记、源码分析；
- 软件教程：Docker 方式部署容器、Linux 部署服务应用；
- 收藏：知识博客收藏、工具收藏；
- 说说：心情说说；
- 留言板：日常留言板；
- 友链：我的朋友们；
- 关于我：本站信息；

## 🔨 搭建 Cactus

1. 首先，进入 [Cactus](https://github.com/lixuanfengs/Cactus) 项目页，点击右上角「Use this template」后选择「Create a new repository」。

   ![image-20240306170117254](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20240306170117254.png)

   ![image-20240306170313963](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20240306170313963.png)

2. 接着，进入项目仓库的「Settings」>「Actions」>「General」，选中底部 Workflow permissions 中的 `Read and write permissions`，然后点击保存即可。如果未授权，GitHub Page 部署会由于 repo 权限不足而报错 `failed with exit code 128`。

   ![image-20240306171213682](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20240306171213682.png)

3. 接下来，请进入菜单栏顶部的「Actions」>「最新的 workflow」，并点击右上方的「Re-run jobs」>「Re-run all jobs」，以重新生成网页。若部署正确，GitHub 将自动搭建 gh-page 分支页面。

## 🍀配置 Cactus



## 🎯部署 Cactus

### 部署到 Vercel

Vercel 的速度相对 GitHub Pages 更快，但 `*.vercel.app` 域名已受 DNS 污染影响。为保证国内用户访问稳定，需绑定自定义域名。

Vercel 部署步骤如下：

1. 点击 [![Vercel](https://lixuanfengs.github.io/blog-images/cactus-blogs/68747470733a2f2f76657263656c2e636f6d2f627574746f6e)](https://vercel.com/new/clone?repository-url=https://github.com/lixuanfengs/Cactus/tree/gh-pages) 或将 `https://vercel.com/new/clone?repository-url=https://github.com/lixuanfengs/Cactus/tree/gh-pages` 中的 `rockbenben/LearnData` 改为 `你的用户名/仓库名`，然后会跳转至 Vercel 进行网页部署。如果你未登录，Vercel 提示你注册或登录，请使用 GitHub 账户进行快捷登录。
2. 输入一个你喜欢的 Vercel 项目名称，默认 private 即可，然后点击 `Create`。

![image-20240307101726683](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20240307101726683.png)

3. 接着，Vercel 会基于 LearnData 模板帮助你新建并初始化仓库，仓库名为你之前输入的项目名。几十秒后，满屏的烟花会庆祝你部署成功。此时，点击 `Go to Dashboard` 跳转到应用的控制台。

   ![image-20240307101851481](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20240307101851481.png)

4. 为了让 Vercel 页面与 GitHub Pages 自动保持同步更新，你需要配置 `VERCEL_TOKEN`、`VERCEL_ORG_ID`、`VERCEL_PROJECT_ID`、 和 GitHub Actions。

   - 在 Vercel  控制面板选择 [settings ]  >  [Tokens]  > [Create] 创建  `VERCEL_TOKEN`，复制 Tokens 到 github 中 [settings ]  >  [Secrets and variables]  >  [Actions]  >  [new repository secret] 创建 `VERCEL_TOKEN` 仓库密钥。
   - 在 Vercel  控制面板选择 [settings ]  >  [General]  >  [Vercel ID]  ，复制 Vercel ID 到 github 中 [settings ]  >  [Secrets and variables]  >  [Actions]  >  [new repository secret] 创建 `VERCEL_ORG_ID` 仓库密钥。
   - 在 Vercel  控制面板选择 [Project Settings]  >  [General]  >  [Project ID]  ，复制 Project ID 到 github 中 [settings ]  >  [Secrets and variables]  >  [Actions]  >  [new repository secret] 创建 `VERCEL_PROJECT_ID` 仓库密钥。

   ```yaml
   # 将页面更新到 Vercel
         - name: 部署到 Vercel
           uses: amondnet/vercel-action@v20 # 使用Vercel Action
           with:
             vercel-token: ${{ secrets.VERCEL_TOKEN }} # 使用存储在Secrets的Vercel Token
             vercel-org-id: ${{ secrets.VERCEL_ORG_ID }} # 你的Vercel组织ID
             vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }} # 你的Vercel项目ID
             vercel-args: '--prod' # 部署到生产环境
   
   ```

