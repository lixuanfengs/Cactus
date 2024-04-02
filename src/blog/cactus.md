---
title: "Jekyll旧站回忆"
icon: read
date: 2024-3-03 12:00:00
category:
  - Blog
tag:
  - Blog
---

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

1. 点击 [![Vercel](https://lixuanfengs.github.io/blog-images/cactus-blogs/68747470733a2f2f76657263656c2e636f6d2f627574746f6e)](https://vercel.com/new/clone?repository-url=https://github.com/lixuanfengs/Cactus/tree/gh-pages) 或将 `https://vercel.com/new/clone?repository-url=https://github.com/lixuanfengs/Cactus/tree/gh-pages` 中的 `rockbenben/Cactus` 改为 `你的用户名/仓库名`，然后会跳转至 Vercel 进行网页部署。如果你未登录，Vercel 提示你注册或登录，请使用 GitHub 账户进行快捷登录。
2. 输入一个你喜欢的 Vercel 项目名称，默认 private 即可，然后点击 `Create`。

![image-20240307101726683](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20240307101726683.png)

3. 接着，Vercel 会基于 Cactus 模板帮助你新建并初始化仓库，仓库名为你之前输入的项目名。几十秒后，满屏的烟花会庆祝你部署成功。此时，点击 `Go to Dashboard` 跳转到应用的控制台。

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

> 注意在 vercel 控制台如果出现了部署错误可能是因为main和gh-pages 某一个分支部署错了。找到 Vercel  控制面板选择 [Project Settings]  >  [git]  >  [Production Branch] (框里写 main)。然后在下面找到 [Ignored Build Step]  >  [custom] 填入 【bash -c 'if [[ "$VERCEL_GIT_COMMIT_REF" == "gh-pages" ]]; then exit 0; fi'】

### 使用 Docker 部署到自己的服务器上

#### 一、搭建准备

#### 二、项目结构说明

首先把博客知识框架克隆到本地。

![image-20240307163754657](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20240307163754657.png)

* src 目录下，是博客的框架模板和已经写好的文章内容，在项目根目录下的 `package.json`中的 `docs:build` 用于构建， `docs:dev`用于本地启动测试。
* dev-ops 目录是提供博客的部署，这里的 docker-compose.yml 是 Docker 执行脚本安装 Nginx 环境。
* 在 `src/.vuepress-> config.ts`文件中下配置了把项目 build 到 nginx/html 文件夹。这样可以更加方便我们部署。

#### 三、部署项目

使用 WebStrom 前端开发工具，打开克隆到本地的项目。在工具界面会提示你执行 npm install 安装项目运行和部署所需的环境。如果没有收到提示的话，可以打开 Terminal  窗口。执行安装命令就可以做下一步的博客部署工作了。

![image-20240307165049368](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20240307165049368.png)

1. **构建项目**

   ![image-20240307171205175](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20240307171205175.png)

    - 打开项目的 `package.json`里面有`构建`和`运行`命名。
    - 构建的操作会把工程打包为 HTML 文件写入到 dev-ops/nginx/html 文件夹下。
    - 运行的操作会直接本地启动服务，启动后你可以在本地预览。这样你在修改一些内容的时候也可以随时看到效果。

2. **构建结果**

   ![image-20240307170359320](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20240307170359320.png)

    * 如图操作，完成构建。当看到`dev-ops/nginx/html` 下出现构建后的静态文件，表示构建成功。

3. **配置 Nginx**

   Nginx 提供了三种配置方式，分别支持访问类型：IP 地址直接访问、通过 HTTP 协议访问域名、通过 HTTPS 协议访问域名。

   ![image-20240307171739941](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20240307171739941.png)

    1. **localhost.conf**

       这个配置方式为了方便，没有域名的伙伴们测试使用。也就是你部署后可以直接通过IP进行访问。

       ```nginx
       server {
           listen       80;
           listen  [::]:80;
       
           location / {
              root /usr/share/nginx/html;
              index index.html;
           }
       
           error_page   500 502 503 504  /50x.html;
           location = /50x.html {
               root /usr/share/nginx/html;
           }
       
       }
       ```

        - 直接把 80 请求转发到本地的根目录地址的 html 文件上即可

    2. **http.blog.conf**

       如果是云服务器和域名，首先先配置域名解析。

       ```nginx
       server {
           listen       80;
           listen  [::]:80;
           server_name  blog.cactusli.net;
       
           location / {
              root /usr/share/nginx/html;
              index index.html;
           }
       
           error_page   500 502 503 504  /50x.html;
           location = /50x.html {
               root /usr/share/nginx/html;
           }
       
       }
       ```

    3. **https.blog.conf**

       如果你有域名那么还可以配置免费的ssl验证，配置完成后把 ssl key、pem 文件放到 dev-ops/nginx/ssl 文件夹下并上传到云服务器上。

       ```nginx
       server {
           listen       80;
           listen  [::]:80;
           server_name  blog.cactusli.net;
       
           rewrite ^(.*) https://$server_name$1 permanent;
       }
       
       server {
           listen       443 ssl;
           server_name  api.cactusli.net;
       
           ssl_certificate      /etc/nginx/ssl/blogs.cactusli.net.pem;
           ssl_certificate_key  /etc/nginx/ssl/blogs.cactusli.net.key;
       
           ssl_session_cache    shared:SSL:1m;
           ssl_session_timeout  5m;
       
           ssl_ciphers  HIGH:!aNULL:!MD5;
           ssl_prefer_server_ciphers  on;
       
           location / {
                root /usr/share/nginx/html;
                index index.html;
           }
       
           error_page   500 502 503 504  /50x.html;
           location = /50x.html {
               root   /usr/share/nginx/html;
           }
       }
       ```

        - 这个方式就是配置 ssl 的方式。

4. **上传文件**

   ![image-20240307182607039](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20240307182607039.png)

    - 通过`SSH/FTP`  工具，连接云服务器，并把我们在工程下创建的 `dev-ops` 上传到云服务器端。

5. **服务启动**

   接下来，你只需要务器进入到 dev-ops 文件夹下，执行脚本 `docker compose -f docker-compose.yml up -d` 即可完成部署。

   ![image-20240307182717011](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20240307182717011.png)

6. **访问测试**
