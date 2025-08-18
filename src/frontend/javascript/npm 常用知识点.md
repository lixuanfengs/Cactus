---
title: "npm 常用知识点"
subtitle: "ES6"
date: 2024-4-02 15:55:10
star: true
isOriginal: true
category:
  - npm
tag:
  - npm
order: 2
---

## npm

下载：https://nodejs.org/en

### 环境

npm是nodejs中进行包管理的工具；

- 安装`Node.js`
- 配置npm

```javascript
npm config set registry https://registry.npmmirror.com  //设置国内镜像源
npm config get registry  //查看镜像源
```

### npm 命令

- npm init： 项目初始化
  - npm init -y：默认一路yes，不用挨个输入信息

* npm install 包名：安装js包到项目中（仅当前项目有效）。指定 **包名**，或者 **包名@版本号**
  * npm install -g： 全局安装，所有都能用
* npm update 包名：升级包到最新版本

* npm uninstall 包名：卸载包
* npm run：项目运行

### pnpm 命令

```shell
# 安装 pnpm 速度更快
npm install -g pnpm
```

* pnpm -v ：查看版本

* pnpm install xxx ` 或 ` pnpm i xxx
* pnpm run xxx：项目运行
* pnpm config
  *  pnpm config get registry：查看当前设置的源
  * pnpm config set registry <源地址>：设置源
* pnpm add 包名：指定 **包名**，或者 **包名@版本号**
* pnpm update 包名：升级包到最新版本
* pnpm remove 包名：卸载包

