---
title: "天花板调试技巧"
subtitle: "天花板调试技巧"
date: 2025-4-05 14:36:20
category:
   - idea
tag:
   - idea
order: 1
---

# IDEA 天花板调试技巧

![1727095935933-fe07de0a-74fb-453c-975d-005a0a8d3420.png](https://beauties.eu.org/blogimg/main/img1/1727095935933-fe07de0a-74fb-453c-975d-005a0a8d3420-228878.png)

IDEA 作为Java开发工具的主流工具，几乎以碾压之势把其他对手甩在了身后，主要原因还是归功于：好用；虽然有点重，但依旧瑕不掩瑜，内置了非常多的功能，大大提高了日常的开发效率。

### **1.查看代码历史版本**
---

鼠标在需要查看的java类 右键 找到Local History >> Show History 点开即可看到历史版本，常用于自己忘记代码改了哪些内容 或需要恢复至某个版本 (注意 只能看近期修改 太久了也是看不到的)

![1727094258748-ddf30468-6511-4a47-9c48-319ca784263f.png](https://beauties.eu.org/blogimg/main/img1/1727094258748-ddf30468-6511-4a47-9c48-319ca784263f-588847.png)

### **2.idea设置成eclipse的快捷键**
---

这对eclipse转idea的开发人员来说 非常友好，这样不需要记两套快捷键

![1727094258830-0a535bbd-cebf-4608-8ca8-febc08a012f3.png](https://beauties.eu.org/blogimg/main/img1/1727094258830-0a535bbd-cebf-4608-8ca8-febc08a012f3-759800.png)

### **3.设置提示词忽略大小写**
---

把这个勾去掉，（有的idea版本是选择选项 选择none即可），例如String 输入string 、String 都可以提示

![1727094258956-e13a0938-ab7c-4aa1-9bea-2a7af81f54e6.png](https://beauties.eu.org/blogimg/main/img1/1727094258956-e13a0938-ab7c-4aa1-9bea-2a7af81f54e6-920064.png)

### **4.设置多行tab**
---

idea默认是选择显示单行的，我们把这个去掉，就可以显示多行tab了，在打开tab过多时的场景非常方便！

![1727094259258-4709a017-b4b9-4bd6-b782-caf90b5d424f.png](https://beauties.eu.org/blogimg/main/img1/1727094259258-4709a017-b4b9-4bd6-b782-caf90b5d424f-758860.png)

![1727094259222-1c9208b4-4b2d-4aff-ad88-388242296e04.png](https://beauties.eu.org/blogimg/main/img1/1727094259222-1c9208b4-4b2d-4aff-ad88-388242296e04-374475.png)

**4.1 tab过多会自动关闭**

settings - editor - General - Editor tabs - tab limit 数值设大就好了

### **5.快速匹配方法的大括号位置**
---

ctrl+[    或者   ctrl+] 可以快速跳转到方法大括号的起止位置，配合方法分隔符使用，不怕找不到方法在哪儿分割了

### **6.代码结尾补全**
---

例如一行代码补全分号，或者是if(xxx) 补全大括号，按ctrl+shift+enter 无需切换鼠标光标，大幅度提升了编码效率

![1727094259216-7e6fbdbc-421d-4438-86cf-852cf239f525.png](https://beauties.eu.org/blogimg/main/img1/1727094259216-7e6fbdbc-421d-4438-86cf-852cf239f525-723144.png)

### **7.模糊搜索方法**
---

例如People类里面的test方法，按ctrl+shift+alt+n 输入Peo.te 就可以查到该方法了，如果觉得这个快捷键难记 也可以按ctrl+shift+r （查找某个文件名的快捷键 下图中的Files）,再手动选择Symbols

![1727094259328-4c0b2102-5160-4ba3-9555-afa83094a1c1.png](https://beauties.eu.org/blogimg/main/img1/1727094259328-4c0b2102-5160-4ba3-9555-afa83094a1c1-646947.png)

### **8.查看方法在哪里被调用**
---

ctrl+alt+h 可以清楚看到方法在哪些地方被调用

![1727094259468-c7e52b4f-83d4-4a45-9ef2-f9d085444ab6.png](https://beauties.eu.org/blogimg/main/img1/1727094259468-c7e52b4f-83d4-4a45-9ef2-f9d085444ab6-819908.png)

### 9.自动导包、自动移除没用的包（<font style="color:#DF2A3F;">建议开启自动导入，关闭自动移除</font>）
---

![1727094259645-740ef961-5ace-4ec9-8818-24c5516efc06.png](https://beauties.eu.org/blogimg/main/img1/1727094259645-740ef961-5ace-4ec9-8818-24c5516efc06-300734.png)

**9.1 手动导包 :alt+enter 手动移除未使用包: crtl+alt+o**

### **10.微服务项目中将不同项目添加到同一个启动窗口**
---

![1727094259792-a3a242e2-e941-4d47-b212-c6285681e25d.png](https://beauties.eu.org/blogimg/main/img1/1727094259792-a3a242e2-e941-4d47-b212-c6285681e25d-626470.png)

步骤：View ——>Tool Windows ——> services ——>add services

### **11.快捷键切换回上一个点开的tab**
---

当我们打开了多个tab的时候 ， 想要快速回到上一个点击的tab中 有的时候肉眼很难找

我们可以用快捷键 alt + ← 键 (eclipse版快捷键 idea默认快捷键需要自测) ，有的时候我们在后面tab编辑了内容 按一次可能不够 需要再多按几次 ,相应的 alt + → 切换到下一个点击的tab

>  常见应用场景：debug发生类跳转时 、利用快捷键在其它类中创建方法时 
>

即使两个tab不相邻 也可以切换回去

![1727094260334-974bf7ea-08f7-403b-b593-59315c348b4b.png](https://beauties.eu.org/blogimg/main/img1/1727094260334-974bf7ea-08f7-403b-b593-59315c348b4b-693545.png)

### **12.代码调用链路图插件**
---

**SequenceDiagram 插件**

这其实是本文第13点的上位替代方案，idea自带的快捷键查看代码调用，只是以菜单形式展示，不太直观，如果是自己写的代码或比较规范的代码，那用自带的也就无所谓，如果是比较复杂的源码或不规范的代码，那使用 SequenceDiagram 会直观特别多。

![1727094260634-8a253f49-1e78-4f7e-b76a-e6f4075f9218.png](https://beauties.eu.org/blogimg/main/img1/1727094260634-8a253f49-1e78-4f7e-b76a-e6f4075f9218-213543.png)

在要查看的java文件鼠标右键，点击 Sequence Diagram

![1727094260555-9c92b275-b125-4ff0-9b2c-eee297ac24b3.png](https://beauties.eu.org/blogimg/main/img1/1727094260555-9c92b275-b125-4ff0-9b2c-eee297ac24b3-822148.png)

效果示例：

![1727094260709-b508a4be-c55f-4d68-8335-231ab9a4899c.png](https://beauties.eu.org/blogimg/main/img1/1727094260709-b508a4be-c55f-4d68-8335-231ab9a4899c-224174.png)

### **13.获取当前线程dump**
---

在断点调试的时候，我们可以通过点击下图红色箭头指向的相机图标，获取当前线程的dump信息。

这个功能有什么用呢？我们可以通过线程名，分析当前是哪个线程执行的，在多线程环境下对代码运行分析起到辅助作用。

比如下图1， run()方法是通过main主线程执行的，只是方法调用，并没有启动多线程（这是我们熟知结论的实践证明）

![1727094260716-6fd53c95-f28b-4f25-a109-d91908742dac.png](https://beauties.eu.org/blogimg/main/img1/1727094260716-6fd53c95-f28b-4f25-a109-d91908742dac-062697.png)

当我们把run方法改成start()方法时，可以看到是线程thread0执行的。

![1727094260973-06f292c8-bd8b-4a03-9299-a1b4d75da943.png](https://beauties.eu.org/blogimg/main/img1/1727094260973-06f292c8-bd8b-4a03-9299-a1b4d75da943-638717.png)

### **<font style="color:rgb(79, 79, 79);">14.代码模板(代码快捷键)（调用</font><font style="color:rgb(13, 13, 13);">ctrl + j 唤醒</font>**<font style="color:rgb(79, 79, 79);">）</font>
---

<font style="color:rgb(77, 77, 77);">例如 : eclipse 中的syso是打印控制台输出 ，但是idea默认是sout , 如果非要改成syso 可以在</font><font style="color:rgb(77, 77, 77);">Postfix Completion</font><font style="color:rgb(77, 77, 77);">里面设置，类似的 fori等都是在里面设置</font>

![1727095206868-dc7253a7-ef83-46ce-b594-931a7a328ac1.png](https://beauties.eu.org/blogimg/main/img1/1727095206868-dc7253a7-ef83-46ce-b594-931a7a328ac1-606508.png)

