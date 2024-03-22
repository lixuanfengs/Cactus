---
title: "调试排错 Java 问题排查之JVM可视化工具"
subtitle: "Java，Java开发，Java 体系"
date: 2024-3-17 17:08:41
category:
  - Java
tag:
  - Java
  - JVM
order: 18
---

> 本文主要梳理常见的JVM可视化的分析工具，主要包括JConsole, Visual VM, Vusial GC, JProfile 和 MAT等。@pdai

- 调试排错 Java 问题排查之JVM可视化工具
  - [JConsole](#jconsole)
  - [Visual VM](#visual-vm)
  - [Visual GC](#visual-gc)
  - JProfile
    - [核心组件](#核心组件)
    - [运行测试](#运行测试)
  - [Eclipse Memory Analyzer (MAT)](#eclipse-memory-analyzer-mat)

## [#](#jconsole) JConsole

> Jconsole （Java Monitoring and Management Console），JDK自带的基于JMX的可视化监视、管理工具。 官方文档可以参考[这里在新窗口打开](https://docs.oracle.com/javase/8/docs/technotes/guides/management/jconsole.html)

- **找到jconsole工具**

```bash
pdai@MacBook-Pro bin % ls
jaotc		jcmd		jinfo		jshell		rmid
jar		jconsole(这里)	jjs		jstack		rmiregistry
jarsigner	jdb		jlink		jstat		serialver
java		jdeprscan	jmap		jstatd		unpack200
javac		jdeps		jmod		keytool
javadoc		jhsdb		jps		pack200
javap		jimage		jrunscript	rmic
```

- **打开jconsole**

选择

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-tool-0.png)

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-tool-2.png)

- **查看概述、内存、线程、类、VM概要、MBean**

概述

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-tool-1.png)

内存

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-tool-3.png)

线程

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-tool-4.png)

类

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-tool-5.png)

VM概要

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-tool-6.png)

MBean

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-tool-6.png)

## [#](#visual-vm) Visual VM

> VisualVM 是一款免费的，集成了多个 JDK 命令行工具的可视化工具，它能为您提供强大的分析能力，对 Java 应用程序做性能分析和调优。这些功能包括生成和分析海量数据、跟踪内存泄漏、监控垃圾回收器、执行内存和 CPU 分析，同时它还支持在 MBeans 上进行浏览和操作。

Overview

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-visualvm-2.png)

Monitor

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-visualvm-1.png)

线程

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-visualvm-3.png)

Sampler

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-visualvm-4.png)

## [#](#visual-gc) Visual GC

> visual gc 是 visualvm 中的图形化查看 gc 状况的插件。官方文档可以参考[这里在新窗口打开](https://www.oracle.com/java/technologies/visual-garbage-collection-monitoring-tool.html)

比如我在IDEA中使用visual GC 插件来看GC状况。

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-tool-10.png)

## [#](#jprofile) JProfile

> Profiler 是一个商业的主要用于检查和跟踪系统（限于Java开发的）的性能的工具。JProfiler可以通过时时的监控系统的内存使用情况，随时监视垃圾回收，线程运行状况等手段，从而很好的监视JVM运行情况及其性能。

JProfiler 是一个全功能的Java剖析工具（profiler），专用于分析J2SE和J2EE应用程序。它把CPU、执行绪和内存的剖析组合在一个强大的应用中。 JProfiler可提供许多IDE整合和应用服务器整合用途。JProfiler直觉式的GUI让你可以找到效能瓶颈、抓出内存漏失(memory leaks)、并解决执行绪的问题。它让你得以对heap walker作资源回收器的root analysis，可以轻易找出内存漏失；heap快照（snapshot）模式让未被参照（reference）的对象、稍微被参照的对象、或在终结（finalization）队列的对象都会被移除；整合精灵以便剖析浏览器的Java外挂功能。

### [#](#核心组件) 核心组件

JProfiler 包含用于采集目标 JVM 分析数据的 JProfiler agent、用于可视化分析数据的 JProfiler UI、提供各种功能的命令行工具，它们之间的关系如下图所示。

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-18.png)

- **JProfiler agent**

JProfiler agent 是一个本地库，它可以在 JVM 启动时通过参数`-agentpath:<path to native library>`进行加载或者在程序运行时通过[JVM Attach 机制在新窗口打开](http://lovestblog.cn/blog/2014/06/18/jvm-attach/)进行加载。Agent 被成功加载后，会设置 JVMTI 环境，监听虚拟机产生的事件，如类加载、线程创建等。例如，当它监听到类加载事件后，会给这些类注入用于执行度量操作的字节码。

- **JProfiler UI**

JProfiler UI 是一个可独立部署的组件，它通过 socket 和 agent 建立连接。这意味着不论目标 JVM 运行在本地还是远端，JProfiler UI 和 agent 间的通信机制都是一样的。

JProfiler UI 的主要功能是展示通过 agent 采集上来的分析数据，此外还可以通过它控制 agent 的采集行为，将快照保存至磁盘，展示保存的快照。

- **命令行工具**

JProfiler 提供了一系列命令行工具以实现不同的功能。

1. jpcontroller - 用于控制 agent 的采集行为。它通过 agent 注册的 JProfiler MBean 向 agent 传递命令。
2. jpenable - 用于将 agent 加载到一个正在运行的 JVM 上。
3. jpdump - 用于获取正在运行的 JVM 的堆快照。
4. jpexport & jpcompare - 用于从保存的快照中提取数据并创建 HTML 报告。

### [#](#运行测试) 运行测试

**我们运行一个SpringBoot测试工程，选择attach到JVM**

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-1.png)

选择指定的进程

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-2.png)

**设置数据采集模式**

JProfier 提供两种数据采集模式 Sampling 和 Instrumentation。

- Sampling - 适合于不要求数据完全精确的场景。优点是对系统性能的影响较小，缺点是某些特性不支持（如方法级别的统计信息）。
- Instrumentation - 完整功能模式，统计信息也是精确的。缺点是如果需要分析的类比较多，对应用性能影响较大。为了降低影响，往往需要和 Filter 一起使用。

由于我们需要获取方法级别的统计信息，这里选择了 Instrumentation 模式。

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-3.png)

概览

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-4.png)

内存

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-5.png)

实时内存分布（类对象）

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-6.png)

dump 堆内存

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-7.png)

dump完会直接打开显示

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-8.png)

线程存储

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-9.png)

导出HTML报告

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-10.png)

CPU 调用树

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-14.png)

线程历史

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-15.png)

JEE & 探针

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-16.png)

MBeans

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-jprofile-17.png)

## [#](#eclipse-memory-analyzer-mat) Eclipse Memory Analyzer (MAT)

> MAT 是一种快速且功能丰富的 Java 堆分析器，可帮助你发现内存泄漏并减少内存消耗。 MAT在的堆内存分析问题使用极为广泛，需要重点掌握。

可以在[这里在新窗口打开](https://www.eclipse.org/mat/)下载， 官方文档可以看[这里在新窗口打开](http://help.eclipse.org/latest/index.jsp?topic=/org.eclipse.mat.ui.help/welcome.html)

- **Overview**

包含内存分布，以及潜在的问题推测

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-mat-2.png)

- **Histogram**

可以列出内存中的对象，对象的个数以及大小。

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-mat-3.png)

具体需要重点理解如下两个概念，可参考[官网文档在新窗口打开](http://help.eclipse.org/latest/index.jsp?topic=/org.eclipse.mat.ui.help/welcome.html)的解释

1. Shallow Heap ：一个对象内存的消耗大小，不包含对其他对象的引用
2. Retained Heap ：是shallow Heap的总和，也就是该对象被GC之后所能回收到内存的总和

- **Dominator Tree**

可以列出那个线程，以及线程下面的那些对象占用的空间。

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-mat-4.png)

- **Top consumers**

通过图形列出最大的object。

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-mat-5.png)

- **Leak Suspects**

自动分析潜在可能的泄漏。

![img](https://lixuanfengs.github.io/blog-images/vp/Java/java-jvm-mat-6.png)

