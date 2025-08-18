---
title: "加速访问vercel项目"
subtitle: "加速访问vercel项目"
date: 2024-11-08 11:36:20
category:
  - vercel
tag:
  - vercel
order: 1
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在星标文章中
star: true
# 是否原创
isOriginal: true
---
## 1. 部署项目到 Vercel 

* 进入 Vercel 官网 [vercel.com](https://vercel.com/)，并登录你的账户。
* 点击右上角的 `New Project`，然后上传到 GitHub 的项目。
* 点击 `Deploy`,`Vercel `会自动为你配置项目并完成部署。

稍等几分钟后，会看到博客已经被部署到了一个 Vercel 提供的默认域名下（通常是 coustom-project.vercel.app）。

## 2. 配置自定义域

想要使用自己域名，需要在域名注册商处进行 DNS 配置，此教程域名托管在`cloudflare`。

### 2.1 添加自定义域名

* 进入`Vercel`仪表板，选择你的博客项目。
* 点击 `Settings` 标签页，然后选择 `Domains`。
* 输入你购买的自定义域名（如 `coustom.com`），点击 `Add`。

### 2.2 DNS 配置

* 登录[cloudflare](https://dash.cloudflare.com/login)网站，找到`DNS`设置。
* 在`DNS`下`Records`里添加以下两条记录：
  * A 记录：指向 Vercel 的 IP 地址 `76.76.21.21`。
  * CNAME 记录（仅用于子域名，如 `www.coustom.com`）：指向 `cname.vercel-dns.com.`。
* 保存修改后，等待 DNS 生效，通常需要几分钟到几小时不等。

**此时没有配置Cloudflare优选IP,在国内访问刚刚配置的 `www.coustom.com`** 会很慢。

## 3. CloudFlare+SaaS回源优选IP

通过CloudFlare+SaaS回源优选IP加速访问Vercel项目。

### 3.1 什么是SaaS回源?

SaaS回源主要分为两个部分：

1. 自定义主机名 (Custom Hostnames)
   - 你可以设置一个自定义主机名,来作为你的访问域名。
2. 回源 (Origin Server)
   - 当用户请求特定的主机名（如客户自己的域名）时，请求会被转发到SaaS提供商的原始服务器（或称为回源服务器）。

### 3.2 具体配置

具体步骤，需要两个域名：

* **主域名**：[cactusli.net](cactusli.net)
* **辅助域名**：[cloudsix.eu.org](cloudsix.eu.org)

两个域名都是托管CF上的。

在 `cloudsix.eu.org`  域名下，找到 SSL/TLS 加密密模式调整为：**完整（严格）**

![image-20241106160605483](https://beauties.eu.org/blogimg/main/img1/image-20241106160605483.png)

随后点击 `自定义主机名` ，添加回退源（`cloudsix.eu.org`）和自定义主机名(`cactusli.net`)。

![recording](https://beauties.eu.org/blogimg/main/img1/recordingewew.gif)

验证域名所有权 ，这里我们需要验证我们域名的所有权和证书验证，去到你**自定义域名的DN**S解析面板添加这两个TXT解析。

![](https://beauties.eu.org/blogimg/main/img1/image-20241106165424379.png)

复制上图TXT，按照骤添加TXT解析。

![image-20241106170136224](https://beauties.eu.org/blogimg/main/img1/image-20241106170136224.png)



添加好之后稍等片刻,等待CF服务器去验证，在**辅助域名**（[cloudsix.eu.org](cloudsix.eu.org)）的管里面面板中看到如下图所示内容，表示**自定义主机名**（cactusli.net）解析成功。

![image-20241106171149066](https://beauties.eu.org/blogimg/main/img1/image-20241106171149066.png)

设置优选域名或IP，添加辅助域名`cnd.cloudsix.eu.org`, **CNAME**到`speed.marisalnc.com`并关闭`小黄云`，操作步骤如下图。

![image-20241106171631115](https://beauties.eu.org/blogimg/main/img1/image-20241106171631115.png)

![image-20241106171912069](https://beauties.eu.org/blogimg/main/img1/image-20241106171912069.png)

随后回到主域名（cactusli.net）控制面板，找到DNS添加**CNAME**到刚刚在辅助域名DNS 记录中添加二级域名`cdn.cloudsix.eu.org`。

![image-20241106172527934](https://beauties.eu.org/blogimg/main/img1/image-20241106172527934.png)

到此所有内容都配置完成，这里是以部署在 `vercel `项目加速为例子的，此时在浏览器访问主域名（cactusli.net）如图并没有访问到部署在 `vercel`的项目。

![image-20241106173103733](https://beauties.eu.org/blogimg/main/img1/image-20241106173103733.png)

这是因为在 `vercel`中配置域名（Domains）时，我们只配置了[cloudsix.eu.org](https://cloudsix.eu.org/)域名，这就导致了我们在访问主域名`cactusli.net`时找不到路径,解决方案是把主域名`cactusli.net`也配置到`vercel`中`Domains`里。

![recording](https://beauties.eu.org/blogimg/main/img1/recording333.gif)

再次访问 [cactusli.net](https://cactusli.net/) 就能访问到自己部署在`vercel`中的项目了，因为在这里利用了 SaaS回源优选IP，所以可以感觉到访问速度变得比之前快多了。

![image-20241106174057363](https://beauties.eu.org/blogimg/main/img1/image-20241106174057363.png)

还有个问题，在访问 [www.cactusli.net](https://www.cactusli.net/) 会出现范围不到项目的问题，解决此问题需要在 `cloudsix.eu.org`下自定义主机里添加上 [www.cactusli.net](https://www.cactusli.net/)，然后再按照之前在主域名（cactusli.net）解析TXT的步骤进行配置解析。

![image-20241106175337941](https://beauties.eu.org/blogimg/main/img1/image-20241106175337941.png)

![image-20241106175158210](https://beauties.eu.org/blogimg/main/img1/image-20241106175158210.png)

最后在`vercel`中`Domains`里添加上www.cactusli.net 就能正常访问项目了。

![image-20241106175444139](https://beauties.eu.org/blogimg/main/img1/image-20241106175444139.png)
