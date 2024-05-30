---
title: "DDD 工程脚手架 【Maven 仓库版】"
subtitle: "DDD 工程脚手架 【Maven 仓库版】"
date: 2024-4-11 10:54:20
category:
  - DDD 技术体系
tag:
  - DDD 技术体系
order: 2
---
## 我把DDD脚手架，发布到了Maven仓库，所有人都能使用！

## 一、操作步骤

### 1.访问官网查看文档

在 [https://central.sonatype.com/publishing (opens new window)](https://central.sonatype.com/publishing)首页有一个 Help 帮助文档，[https://central.sonatype.org/register/central-portal/#producers (opens new window)](https://central.sonatype.org/register/central-portal/#producers)这里有非常详细的操作说明。接下来我讲一些核心的步骤，如果操作有失败，可以参考官网资料。

![image-20240415160031703](https://lixuanfengs.github.io/blog-images/vp/web/image-20240415160031703.png)

开始前，登录注册 [https://central.sonatype.com (opens new window)](https://central.sonatype.com/)- 可以选择 github 登录。

### 2.配置 NameSpace

如果选择 github 登录，你会有一个默认配置的 NameSpace（io.github.fuzhengwei），这个东西的作用就是要和本地工程名 groupId 保持一致的。如工程是 cn.cactusli、xyz.199228，那么你在的 NameSpace 就需要配置一个这样的调过来的域名。

![image-20240415163612519](https://lixuanfengs.github.io/blog-images/vp/web/image-20240415163612519.png)

![image-20240415163535760](https://lixuanfengs.github.io/blog-images/vp/web/image-20240415163535760.png)

> 如图配置完添加验证即可，最后验证成功就可以使用了。

### 3.上传要求

文档：https://central.sonatype.org/publish/publish-portal-upload/

![1713171011992](https://lixuanfengs.github.io/blog-images/vp/web/1713171011992.jpg)

> 如文档上传要求，你需要把jar、pom、doc、sources 全部打包到 zip 包，同时每个文件的 asc、md5、sha1 也需要打包进来。
>
> 这些文件也都是在旧版上传 maven 中央仓库的时候，所需提供的内容。

### 4.项目配置

**源码**：https://gitcode.net/KnowledgePlanet/road-map/xfg-frame-archetype-lite/-/tree/master/scaffold-lite

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>io.github.lixuanfengs</groupId>
    <artifactId>ddd-scaffold-lite</artifactId>
    <version>1.0</version>
    <packaging>maven-archetype</packaging>

    <name>ddd-scaffold-lite</name>

    <properties>
        <java.version>1.8</java.version>
        <maven-javadoc-plugin.version>3.2.0</maven-javadoc-plugin.version>
        <maven-source-plugin.version>3.2.1</maven-source-plugin.version>
        <maven-gpg-plugin.version>1.6</maven-gpg-plugin.version>
        <maven-checksum-plugin.version>1.10</maven-checksum-plugin.version>
    </properties>

    <build>
        <extensions>
            <extension>
                <groupId>org.apache.maven.archetype</groupId>
                <artifactId>archetype-packaging</artifactId>
                <version>3.2.0</version>
            </extension>
        </extensions>

        <plugins>
            <plugin>
                <groupId>net.nicoulaj.maven.plugins</groupId>
                <artifactId>checksum-maven-plugin</artifactId>
                <version>${maven-checksum-plugin.version}</version>
                <executions>
                    <execution>
                        <id>create-checksums</id>
                        <goals>
                            <goal>artifacts</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-source-plugin</artifactId>
                <version>2.2.1</version>
                <executions>
                    <execution>
                        <id>attach-sources</id>
                        <goals>
                            <goal>jar-no-fork</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-javadoc-plugin</artifactId>
                <version>2.9.1</version>
                <configuration>
                    <encoding>UTF-8</encoding>
                    <aggregate>true</aggregate>
                    <charset>UTF-8</charset>
                    <docencoding>UTF-8</docencoding>
                </configuration>
                <executions>
                    <execution>
                        <id>attach-javadocs</id>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                        <configuration>
                            <additionalparam>-Xdoclint:none</additionalparam>
                            <javadocExecutable>
                                /Library/Java/JavaVirtualMachines/jdk1.8.0_341.jdk/Contents/Home/bin/javadoc
                            </javadocExecutable>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-gpg-plugin</artifactId>
                <version>1.5</version>
                <executions>
                    <execution>
                        <id>sign-artifacts</id>
                        <phase>verify</phase>
                        <goals>
                            <goal>sign</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-release-plugin</artifactId>
                <version>2.5.3</version>
                <configuration>
                    <autoVersionSubmodules>true</autoVersionSubmodules>
                    <useReleaseProfile>false</useReleaseProfile>
                    <releaseProfiles>release</releaseProfiles>
                    <goals>deploy</goals>
                </configuration>
            </plugin>
        </plugins>
    </build>

    <profiles>
        <profile>
            <id>release</id>
            <build>
                <plugins>
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-javadoc-plugin</artifactId>
                        <version>3.3.1</version> <!-- 使用最新版本 -->
                        <executions>
                            <execution>
                                <id>attach-javadocs</id>
                                <goals>
                                    <goal>jar</goal> <!-- 绑定到 jar 目标 -->
                                </goals>
                            </execution>
                        </executions>
                    </plugin>
                </plugins>
            </build>
        </profile>
    </profiles>

    <description>ddd scaffold lite by xiaofuge</description>

    <url>https://spring.io/projects/spring-boot/lxf-frame-archetype</url>

    <developers>
        <developer>
            <name>lixuanfeng</name>
            <email>184172133@qq.com</email>
            <organization>cactusli</organization>
            <organizationUrl>https://github.com/lixuanfengs</organizationUrl>
        </developer>
    </developers>

</project>
```

> 注意 groupId、artifactId 名字，如果你有发布诉求，需要和你自己的一直。
>
> maven-javadoc-plugin：生成 doc 文档。这里要注意，因为我们脚手架不是代码文件，没有doc的，所以要在工程中加一个任意类名文件。工程中小傅哥加了个 Api 类。
>
> maven-source-plugin：生成 source 文件。
>
> maven-gpg-plugin：是签名的加密文件，需要本地安装过 gpg 包。
>
> checksum-maven-plugin：生成 md5、sha1 文件，但这里不会对 pom 生成此文件，还需要单独命令处理。

```java
md5 ddd-scaffold-lite-1.0.pom > ddd-scaffold-lite-1.0.pom.md5
shasum ddd-scaffold-lite-1.0.pom > ddd-scaffold-lite-1.0.pom.sha1
```

检查生成后的文件，去掉不需要的内容

### 5.构建项目

#### **第1次构建**

![image-20240415172010706](https://lixuanfengs.github.io/blog-images/vp/web/image-20240415172010706.png)

#### **第2次构建**

![image-20240417171732169](https://lixuanfengs.github.io/blog-images/vp/web/image-20240417171732169.png)

#### 执行脚本

![image-20240417172536682](https://lixuanfengs.github.io/blog-images/vp/web/image-20240417172536682.png)

### 6.上传 archetype-catalog.xml

把 archetype-catalog.xml 文件，上传到域名可访问云服务器的根目录中。

![image-20240416111427450](https://lixuanfengs.github.io/blog-images/vp/web/image-20240416111427450.png)

### 7.上传打包文件到 maven 仓库

![image-20240416111845769](https://lixuanfengs.github.io/blog-images/vp/web/image-20240416111845769.png)、

> 你需要按照你的工程结构也是 namespace 创建出文件夹结构，并把工程 target 打包的文件全部复制进来。最后把 io 这个文件夹，打包一个 zip 包。就可以了。

### 8.上传 maven 仓库



### 9.上传成功！❀