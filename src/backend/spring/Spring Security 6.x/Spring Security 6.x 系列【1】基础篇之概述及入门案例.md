---
title: "基础篇之概述及入门案例"
subtitle: "基础篇之概述及入门案例"
date: 2024-4-11 10:54:20
category:
  - Spring Security
tag:
  - Spring Security
order: 1
---
## 1. 简介

本系列基于最新`Spring Boot 3.x + Spring Security 6.x`版本，由浅入深，从实战到源码分析，详细讲解各种 `Spring Security `的使用技巧，适用于初学和进阶使用者。

**本系列学习路线：**

![image-20231215180957948](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231215180957948.png)

## 2. 安全框架

在 Java 生态中，目前有 [Spring Security](https://spring.io/projects/spring-security) 和 [Apache Shiro](https://shiro.apache.org/) 两个安全框架，可以完成认证和授权的功能。本文主要是针对 Spring Security 进行详解。

* **Spring Security**      

  Spring Security是一个强大而全面的身份验证和访问控制框架，构建在Spring框架之上。它提供了全面的安全性服务，支持在应用程序中进行身份验证、授权和保护，同时还包括对常见安全攻击的防护机制。Spring Security是一个高度可定制的框架，可以轻松地集成到Spring应用程序中。

  **关键特点和功能：**

  - **综合性安全性：** 提供细粒度的身份验证和授权控制。
  - **可扩展性：** 易于集成到Spring框架中，同时支持自定义扩展。
  - **集成性：** 能够与Spring框架和其他Spring项目（如Spring Boot）无缝集成。

  **官方网站：** [Spring Security](https://spring.io/projects/spring-security) 

  **GitHub地址：** [GitHub地址](https://github.com/spring-projects/spring-security)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

* **Apache Shiro**

  **官方术语介绍：** Apache Shiro是一个功能强大且易于使用的Java安全框架，提供了身份验证、授权、会话管理和密码服务等核心安全功能。Shiro的设计目标是简化安全性的实现，并提供开发人员友好的API，以便轻松地将安全性集成到任何应用程序中。

  **关键特点和功能：**

  - **简单易用：** 提供直观的API和清晰的安全性概念。
  - **综合性：** 提供全面的身份验证、授权、会话管理和密码服务。
  - **无依赖性：** 可以独立使用，不依赖其他框架。

  **官方网站：** [Apache Shiro](https://shiro.apache.org/)

在所有开发的系统中，确保系统安全性的基本要求是进行认证（authentication）和授权（authorization）。

* **认证（Authentication）：** 认证是确认用户身份的过程。通过认证，系统可以验证用户是谁，以确保他们声称的身份是有效的。常见的认证方式包括用户名和密码、令牌、生物识别（指纹、面部识别等）等。认证通常在用户登录系统时进行，一旦用户成功通过认证，系统就会颁发一个用于识别该用户的凭证，该凭证通常被称为身份令牌。

* **授权（Authorization）：** 授权是确定用户是否有权进行某些操作或访问特定资源的过程。认证成功后，系统需要检查用户的权限，并根据其权限级别来决定是否允许执行特定的操作。授权确保用户只能访问他们被授予权限的资源。授权通常通过角色（Roles）或权限（Permissions）的概念来实现，用户被分配到不同的角色或权限组中，以确定其在系统中的权限范围。

在现代应用程序中，常见的安全实践包括使用安全协议（如OAuth、OpenID Connect）、多因素身份验证（MFA）、密钥管理、会话管理等来增强认证和授权的安全性。这些安全机制帮助确保只有合法用户能够访问系统，并且他们只能进行被授权的操作。

> ## 认证 (authentication) 和授权 (authorization) 的区别
>
> 以前一直分不清 authentication 和 authorization，其实很简单，举个例子来说：
>
> 你要登机，你需要出示你的 passport 和 ticket，passport 是为了证明你张三确实是你张三，这就是 authentication；而机票是为了证明你张三确实买了票可以上飞机，这就是 authorization。
>
> 在 computer science 领域再举个例子：
>
> 你要登陆论坛，输入用户名张三，密码1234，密码正确，证明你张三确实是张三，这就是 authentication；再一check用户张三是个版主，所以有权限加精删别人帖，这就是 authorization。



## 3. 入门案例

> 示例代码对应仓库：

### 3.1 引入依赖项

在 [`pom.xml`]() 文件中，引入spring-boot-starter-security、spring-boot-starter-web 依赖。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.1.6</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <artifactId>cactus-01-springsecurity-demo</artifactId>
    <dependencies>
        <!-- 进行 Spring MVC 的自动化配置 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    
        <!-- 进行 Spring Security 的自动化配置 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
    </dependencies>

</project>
```

> 具体每个依赖项的作用，可以自己认真看下项目中添加的注释。

### 3.2 启动主程序 SecurityApplication

创建 [`SecurityApplication.java`]() 类，配置 `@SpringBootApplication` 注解即可。代码如下：

```java
@SpringBootApplication
public class SecurityApplication {

    public static void main(String[] args) {
        SpringApplication.run(SecurityApplication.class, args);
    }

}
```

### 3.3 在 resources 下新建配置文件 

在 [`application.yml`](https://github.com/YunaiV/SpringBoot-Labs/blob/master/lab-01-spring-security/lab-01-springsecurity-demo/src/main/resources/application.yaml) 中，添加 Spring Security 配置，如下：

```yml
server:
  # 服务端口
  port: 8888
spring:
  # Spring Security 配置项，对应 SecurityProperties 配置类
  security:
    # 配置默认的 InMemoryUserDetailsManager 的用户账号与密码。
    user:
      name: user # 账号
      password: user # 密码
      roles: ADMIN # 拥有角色
```

在 `spring.security` 配置项，设置 Spring Security 的配置，对应 [SecurityProperties](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/security/SecurityProperties.java) 配置类。

默认情况下，Spring Boot [UserDetailsServiceAutoConfiguration](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/security/servlet/UserDetailsServiceAutoConfiguration.java) 自动化配置类，会创建一个**内存级别**的 [InMemoryUserDetailsManager](https://github.com/spring-projects/spring-security/blob/master/core/src/main/java/org/springframework/security/provisioning/InMemoryUserDetailsManager.java) Bean 对象，提供认证的用户信息。

这里，我们**添加了** `spring.security.user` 配置项，UserDetailsServiceAutoConfiguration 会基于配置的信息创建一个用户 [User](https://github.com/spring-projects/spring-security/blob/master/core/src/main/java/org/springframework/security/core/userdetails/User.java) 在内存中。

如果，我们**未添加** `spring.security.user` 配置项，UserDetailsServiceAutoConfiguration 会自动创建一个用户名为 `"user"` ，密码为 UUID 随机的用户 [User](https://github.com/spring-projects/spring-security/blob/master/core/src/main/java/org/springframework/security/core/userdetails/User.java) 在内存中。

### 3.4 新建 AdminController

在 `cn.cactus.boot.springsecurity.controller.AdminController` 包下，创建  [AdminController](https://github.com/YunaiV/SpringBoot-Labs/tree/master/lab-01-spring-security/lab-01-springsecurity-demo/src/main/java/cn/iocoder/springboot/lab01/springsecurity/controller/AdminController.java) 类，提供测试 API 接口。代码如下：

```java
/**
 * Package: cn.cactus.boot.security.controller
 * Description:
 *
 * @Author 仙人球⁶ᴳ | 微信：Cactusesli
 * @Date 2023/12/15 14:36
 * @Github https://github.com/lixuanfengs
 */
@RestController
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/testString")
    public String testString() {
        return "♥访问成功♥";
    }

}
```

这里，我们先提供一个 `"/admin/testString"` 接口，用于测试未登录时，会被拦截到登录界面。

### 3.5 测试

执行`SecurityApplication#main(String[] args)` 方法，运行项目。

项目启动成功后，浏览器访问 http://127.0.0.1:8888/admin/testString 接口。因为未登录，所以被 Spring Security 拦截到登录界面。如下图所示：

![image-20231215144457224](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231215144457224.png)

因为我们没有**自定义**登录界面，所以默认会使用 [DefaultLoginPageGeneratingFilter](https://github.com/spring-projects/spring-security/blob/master/web/src/main/java/org/springframework/security/web/authentication/ui/DefaultLoginPageGeneratingFilter.java) 类，生成上述界面。

输入在`  application.yml` 中配置的用户名密码：user/test 进行登录系统。登录完成后，因为 Spring Security 会记录被拦截的访问地址，所以浏览器自动动跳转 http://127.0.0.1:8888/admin/testString 接口。访问结果如下图所示：

![image-20231215144951292](https://lixuanfengs.github.io/blog-images/Spring-Security6.x/image-20231215144951292.png)