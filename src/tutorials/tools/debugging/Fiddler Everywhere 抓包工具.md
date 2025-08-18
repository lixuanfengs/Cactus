---
title: "Fiddler Everywhere 抓包工具"
subtitle: "Fiddler Everywhere 抓包工具"
date: 2024-4-05 14:36:20
category:
   - Fiddler Everywhere
tag:
   - Fiddler Everywhere
order: 1
---

## Fiddler Everywhere 是什么？

Fiddler Everywhere 是一个网络流量监控和调试工具，由 Telerik（Progress Software的一个部门）开发。它是 Fiddler Classic 的继承者，提供了一个更新更现代的用户界面和一些增强功能，使其能够跨平台工作，支持 Windows、Mac 和 Linux 系统。

**主要功能包括：**

1. **流量捕获和分析**：Fiddler Everywhere 可以捕获来自浏览器和其他软件的 HTTP 和 HTTPS 网络流量，允许用户查看和分析请求和响应的详细内容。这对于调试网站和应用程序的网络请求、查找性能瓶颈或监控API调用非常有用。
2. **修改和重放请求**：用户可以修改网络请求和响应，然后重新发送它们。这对于测试网络服务和应用程序如何响应不同的数据或行为非常有用。
3. **模拟网络条件**：Fiddler Everywhere 可以模拟不同的网络环境，包括低带宽、高延迟等，以测试应用程序在各种网络条件下的表现。
4. **HTTPS 解密**：提供 HTTPS 流量解密功能，允许用户查看加密通信的细节。
5. **团队协作**：Fiddler Everywhere 提供了一些团队协作功能，例如共享捕获的流量数据和会话给团队成员，便于团队合作和问题解决。
6. **扩展性和自定义**：用户可以使用 Fiddler Everywhere 的 API 和各种插件来扩展其功能，适应特定的使用案例。

**使用场景**：

- **开发者**：调试和优化网站或应用程序的网络请求。
- **测试人员**：模拟不同的网络环境和条件来测试应用的弹性和性能。
- **系统管理员**：监控和审计网络请求安全。

Fiddler Everywhere 是一个强大的工具，适用于任何需要深入理解或调试网络通信的专业人士。

> 官网下载地址：https://www.telerik.com/download/fiddler-everywhere
>
> 全平台原生的补丁：
> [FiddlerEverywherePatcher-linux-x64_2024-07-29.zip](https://linux.do/uploads/short-url/n0gqGdlUiGMxbCtyimfpbaYroir.zip) (3.7 MB)
> [FiddlerEverywherePatcher-osx-x64_2024-07-29.zip](https://linux.do/uploads/short-url/gp3EzStDR40YHVl3MHSUx99fs2S.zip) (3.7 MB)
> [FiddlerEverywherePatcher-osx-arm64_2024-07-29.zip](https://linux.do/uploads/short-url/jsdAKKozbVQpkvWOfl4Z8vdMSh1.zip) (3.7 MB)
> [FiddlerEverywherePatcher-win-x64_2024-07-29.zip](https://linux.do/uploads/short-url/igzsRIo107hTqpOF5MignLaSznr.zip) (3.2 MB)

## 安装 Fiddler Everywhere 

下载 `全平台原生的补丁 `:

* Windows：双击直接运行，输入Fiddler Everywhere安装路径就可以。

* Linux/MacOS：去Windows虚拟机上运行，把Fiddler.WebUi.dll复制到当前补丁目录生成修补后的文件，再替换回原文件。

### 安装完成后界面

![image-20240730102050470](https://lixuanfengs.github.io/blog-images/vp/web/image-20240730102050470.png)

## 开启HTTPS抓包功能

安装好Fiddler后，默认情况下无法抓取HTTPS数据。启用此功能，请执行以下步骤：

### 1. 点击Fiddler右上角的设置图标，第一个选项就是HTTPS。

### 2. 点击信任Fiddler并勾选以下两个选项：

![image-20240730102309022](https://lixuanfengs.github.io/blog-images/vp/web/image-20240730102309022.png)

### 3.  导出证书到桌面

![image-20240730102802692](https://lixuanfengs.github.io/blog-images/vp/web/image-20240730102802692.png)

### 4. 打开浏览器，这里以歌浏览器为例。

![image-20240730103026062](https://lixuanfengs.github.io/blog-images/vp/web/image-20240730103026062.png)

![image-20240730103216854](https://lixuanfengs.github.io/blog-images/vp/web/image-20240730103216854.png)

> 如图将刚导出到桌面的证书，导入到所使用的浏览器中。

## 抓取HTTP/HTTPS数据

HTTPS是建立在HTTP之上的加密应用层协议。Fiddler能自动解密HTTPS传输的数据，将之还原为原始HTTP形式。

以站长自己的网站“仙人球博客”为例，打开一个页面后，在Fiddler左侧点击眼睛那个图标，页面会显示抓取到的HTTP/HTTPS请求信息，`一个页面可能会有很多个请求，可以在上方的搜索框中输入“cactusli.net”过滤你想要的请求`。

![image-20240730104436780](https://lixuanfengs.github.io/blog-images/vp/web/image-20240730104436780.png)

> 点击“Inspectors”后，可以看到HTTP请求和响应的详细格式。点击“raw”按钮，即可查看原始数据。请注意，原始请求数据是直接用于TCP套接字构成HTTP请求的，而响应数据通常会经过压缩以节省网络带宽，点击“解压缩”按钮后，可查看从TCP套接字读取的HTTP响应数据。

再看一个抓取的 POST 接口的场景，可以很直观的看出接口的请求参数和相应数据：

![image-20240730110125376](https://lixuanfengs.github.io/blog-images/vp/web/image-20240730110125376.png)

## Fiddler 的工作原理

Fiddler本质上是一个代理服务器。当浏览器访问页面时，它会将HTTP请求首先发送给Fiddler，Fiddler再将请求转发给浏览器服务器。当服务器返回数据时，Fiddler会获取这些数据，并将其传递给浏览器。因此，Fiddler可以清楚掌握浏览器与服务器之间交互的数据细节，帮助我们完成抓包工作。

![image-20240730111857780](https://lixuanfengs.github.io/blog-images/vp/web/image-20240730111857780.png)