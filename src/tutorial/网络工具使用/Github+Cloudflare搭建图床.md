---
title: "Github+Cloudflare搭建图床"
subtitle: "Github+Cloudflare搭建图床"
date: 2024-11-08 11:37:20
category:
  - 图床
tag:
  - 图床
order: 2
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在星标文章中
star: true
# 是否原创
isOriginal: true
# 页面的预览图
cover: https://beauties.eu.org/blogimg/main/img1/cover01.webp
---
## 一、前言

:::tip
这篇教程介绍了如何结合 GitHub 私有仓库与 Cloudflare 反向代理加速，构建一个稳定、免费且具隐私保护的图床。
首先，利用 GitHub 的免费存储空间存储图片，再通过 Cloudflare 提供的 CDN 服务加速图片加载，确保图床访问速度和稳定性。
教程中还介绍了如何使用 PicGo 工具将图片上传至 GitHub 仓库，并隐藏仓库路径，增强安全性。这个方法适用于个人、博客和小型网站，不仅能实现快速加载，还能保证数据的隐私和安全。
:::


## 二、准备环节

* 一个 [Github](https://github.com/) 账号

* 一个[Cloudflare](https://www.cloudflare.com/zh-cn/) 账号

* 下载  [PicGo](https://github.com/Molunerfinn/PicGo/releases) 上传工具

::: important 注意搭建过程中可能会涉及到科学上网环境。
:::

## 三、具体配置步骤 

### 1. 创建`Github`私有仓库

#### 1.1 登陆[Github](https://github.com/)并创建私有库

![image-20241107161441416](https://beauties.eu.org/blogimg/main/img1/image-20241107161441416.png)

#### 1.2 获取仓库的访问令牌

![image-20241107162639585](https://beauties.eu.org/blogimg/main/img1/image-20241107162639585.png)

![image-20241107162842254](https://beauties.eu.org/blogimg/main/img1/image-20241107162842254.png)

![image-20241107163227295](https://beauties.eu.org/blogimg/main/img1/image-20241107163227295.png)

![image-20241107163327066](https://beauties.eu.org/blogimg/main/img1/image-20241107163327066.png)

![image-20241107163410530](https://beauties.eu.org/blogimg/main/img1/image-20241107163410530.png)

![image-20241107163530189](https://beauties.eu.org/blogimg/main/img1/image-20241107163530189.png)

::: caution 第14步生成的 TOKEN 需要保存下来，以免忘记。

 :::

### 2. 配置Cloudflare反代

#### 2.1 创建Workers并部署

登录 [Cloudflare](https://dash.cloudflare.com/login?lang=zh-cn) 在侧边连找到Workers 和 Pages，创建Workers并部署。

![image-20241107164757048](https://beauties.eu.org/blogimg/main/img1/image-20241107164757048.png)

![image-20241107165034774](https://beauties.eu.org/blogimg/main/img1/image-20241107165034774.png)

#### 2.2 编辑Worker配置环境变量

![image-20241107165643400](https://beauties.eu.org/blogimg/main/img1/image-20241107165643400.png)

![image-20241107170611633](https://beauties.eu.org/blogimg/main/img1/image-20241107170611633.png)

![image-20241107170726487](https://beauties.eu.org/blogimg/main/img1/image-20241107170726487.png)

::: details 在编辑`worker.js`时需要用到的js

```js
let token = "";
export default {
	async fetch(request ,env) {
		const url = new URL(request.url);
		if(url.pathname !== '/'){
			let githubRawUrl = 'https://raw.githubusercontent.com';
			if (new RegExp(githubRawUrl, 'i').test(url.pathname)){
				githubRawUrl += url.pathname.split(githubRawUrl)[1];
			} else {
				if (env.GH_NAME) {
					githubRawUrl += '/' + env.GH_NAME;
					if (env.GH_REPO) {
						githubRawUrl += '/' + env.GH_REPO;
						if (env.GH_BRANCH) githubRawUrl += '/' + env.GH_BRANCH;
					}
				}
				githubRawUrl += url.pathname;
			}
			//console.log(githubRawUrl);
			if (env.GH_TOKEN && env.TOKEN){
				if (env.TOKEN == url.searchParams.get('token')) token = env.GH_TOKEN || token;
				else token = url.searchParams.get('token') || token;
			} else token = url.searchParams.get('token') || env.GH_TOKEN || env.TOKEN || token;
			
			const githubToken = token;
			//console.log(githubToken);
			if (!githubToken || githubToken == '') return new Response('TOKEN不能为空', { status: 400 });
			
			// 构建请求头
			const headers = new Headers();
			headers.append('Authorization', `token ${githubToken}`);

			// 发起请求
			const response = await fetch(githubRawUrl, { headers });

			// 检查请求是否成功 (状态码 200 到 299)
			if (response.ok) {
				return new Response(response.body, {
					status: response.status,
					headers: response.headers
				});
			} else {
				const errorText = env.ERROR || '无法获取文件，检查路径或TOKEN是否正确。';
				// 如果请求不成功，返回适当的错误响应
				return new Response(errorText, { status: response.status });
			}

		} else {
			const envKey = env.URL302 ? 'URL302' : (env.URL ? 'URL' : null);
			if (envKey) {
				const URLs = await ADD(env[envKey]);
				const URL = URLs[Math.floor(Math.random() * URLs.length)];
				return envKey === 'URL302' ? Response.redirect(URL, 302) : fetch(new Request(URL, request));
			}
			//首页改成一个nginx伪装页
			return new Response(await nginx(), {
				headers: {
					'Content-Type': 'text/html; charset=UTF-8',
				},
			});
		}
	}
};

async function nginx() {
	const text = `
	<!DOCTYPE html>
	<html>
	<head>
	<title>Welcome to nginx!</title>
	<style>
		body {
			width: 35em;
			margin: 0 auto;
			font-family: Tahoma, Verdana, Arial, sans-serif;
		}
	</style>
	</head>
	<body>
	<h1>Welcome to nginx!</h1>
	<p>If you see this page, the nginx web server is successfully installed and
	working. Further configuration is required.</p>
	
	<p>For online documentation and support please refer to
	<a href="http://nginx.org/">nginx.org</a>.<br/>
	Commercial support is available at
	<a href="http://nginx.com/">nginx.com</a>.</p>
	
	<p><em>Thank you for using nginx.</em></p>
	</body>
	</html>
	`
	return text ;
}

async function ADD(envadd) {
	var addtext = envadd.replace(/[	|"'\r\n]+/g, ',').replace(/,+/g, ',');	// 将空格、双引号、单引号和换行符替换为逗号
	//console.log(addtext);
	if (addtext.charAt(0) == ',') addtext = addtext.slice(1);
	if (addtext.charAt(addtext.length -1) == ',') addtext = addtext.slice(0, addtext.length - 1);
	const add = addtext.split(',');
	//console.log(add);
	return add ;
}
```
:::

添加自定域名。

![recording](https://beauties.eu.org/blogimg/main/img1/recording123.gif)

配置所需的环境变量。

![image-20241107171621737](https://beauties.eu.org/blogimg/main/img1/image-20241107171621737.png)

::: md-demo 变量说明

| 变量名    | 示例                                      | 必填 | 备注                                                         |
| --------- | ----------------------------------------- | ---- | ------------------------------------------------------------ |
| GH_TOKEN  | `ghp_xxxt`                                | ❌    | 您的GitHub令牌 **token**                                     |
| TOKEN     | `xxxx`                                    | ❌    | `GH_TOKEN`和`TOKEN`同时存在的时候会作为访问鉴权，单独赋值时的效果与`GH_TOKEN`相同 |
| GH_NAME   | `cactusli`                                | ❌    | 你的GitHub用户名                                             |
| GH_REPO   | `blogimg`                                 | ❌    | 你的GitHub仓库(必须设置`GH_NAME`变量为前提)                  |
| GH_BRANCH | `main`                                    | ❌    | 你的GitHub仓库(必须设置`GH_NAME`和`GH_REPO`变量为前提)       |
| ERROR     | `无法获取文件，检查路径或TOKEN是否正确。` | ❌    | 自定义错误提示                                               |

:::

至此worker.js配置完成。

### 3. 安装配置 `PicGo` 上传 图片到`Github`

#### 3.1 在 PicGo 中配置上传

![image-20241107175701603](https://beauties.eu.org/blogimg/main/img1/image-20241107175701603.png)



解读 `PicGo` 变量含义 

| 变量名         | 示例                                      | 备注                         |
| -------------- | ----------------------------------------- | ---------------------------- |
| 图床配置名     | blogimg                                   | 按照自己的爱好填写           |
| 设定仓库名     | lixuanfengs/blogimg                       | Github 的仓库名              |
| 设定分支名     | main                                      | Github 的仓库分支            |
| 设定Token      | gh_xxxx                                   | 你的 GitHub 密钥             |
| 设定存储路径   | img1/                                     | 不是必填项，图片在项目主目录 |
| 设定自定义域名 | https://beauties.eu.org/blogimg/main/img1 | 自定义访问图片的前置路径     |















