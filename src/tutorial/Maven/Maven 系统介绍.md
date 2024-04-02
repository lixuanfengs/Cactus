---
title: "Maven 系统介绍"
subtitle: "Maven"
date: 2024-4-01 17:33:30
category:
  - Maven
tag:
  - Maven
order: 1
---

> 在Java开发中，常用构建工具ant,maven和gradle, 其中maven相对主流；

## Maven 相关资源

**官方网站**  **https://maven.apache.org/**

## Maven 的作用

**更方便进行项目构建和项目** **jar** **包管理**

## 下载和安装

第 1 种方式: 直接使用 idea 自带的 Maven
第 2 种方式: 自己下载 Maven 软件, 安装、配置并使用

> 下载地址 https://archive.apache.org/dist/maven/maven-3/

### 安装步骤

1. 直接解 maven 安装到指定目录, 解压到 d:\program 目录下

2. 目录结构说明

3. maven 使用需要依赖 jdk ,因此事先要保证安装了 jdk1.8 以上

4. 配置环境变量 MAVEN_HOME

5. 配置环境变量 PATH, 增加 Maven 的路径, (说明: 如果有多个 Maven 的 Path, 可以 上移, 提高优先级)

6. 测试是否安装 maven 成功

### Maven 工作原理图

原理图解读

1. 在 maven 项目的 pom.xml, 可以配置项目依赖的 jar(指定坐标即可) 
2. maven 根据配置, 到中央仓库/私服 去获取 jar,下载到本地仓库 
3. maven 项目, 会引用本地仓库的 jar ,完成项目开发 
4. 在 maven 项目构建生命周期中，每个阶段的执行都有相应的插件完成 
5. 各个插件执行过程中，会附带输出内容，比如 jar/war/xml/源码 
6. 程序员可以使用 maven 默认的插件，也可以自定义插件，完成定制任务

实例 01_mybatis_quickstart : Maven 项目统一的开发结构分析

