---
title: "Cactus-vue-pro 开发手册"
subtitle: "Cactus-vue-pro 开发手册"
date: 2024-4-11 10:54:20
category:
  - cactus-vue-pro
tag:
  - cactus-vue-pro
order: 1
---
## 演示系统访问地址

http://192.168.1.218/

## gitlab 代码仓库访问地址

```shell
http://192.168.1.19:8929/
```



## 新用户注册

![dsfsdfsdfsdf](https://lixuanfengs.github.io/blog-images/vp/web/dsfsdfsdfsdf.png)

![i5103513459](https://lixuanfengs.github.io/blog-images/vp/web/i5103513459.png)

注册完成后需要登录管理员账号进行用户的审核

![image-20230925103613099](https://lixuanfengs.github.io/blog-images/vp/web/image-20230925103613099.png)

![image-20230925103653752](https://lixuanfengs.github.io/blog-images/vp/web/image-20230925103653752.png)

![image-20230925103740824](https://lixuanfengs.github.io/blog-images/vp/web/image-20230925103740824.png)

等管理员审批通过后就可以直接登录了。

![image-20230925103925878](https://lixuanfengs.github.io/blog-images/vp/web/image-20230925103925878.png)

### 配置公钥

登录完成后把本地 公钥添加到自己的账户里，方便克隆提交项目代码或文件。

![image-20230925104321903](https://lixuanfengs.github.io/blog-images/vp/web/image-20230925104321903.png)

![image-20230925104417399](https://lixuanfengs.github.io/blog-images/vp/web/image-20230925104417399.png)

查询或生成密钥的具体操作如下：

```shell
# 如果本地之前创建过密钥直接运行(cat ~/.ssh/*.pub)
ssh-keygen -t rsa -b 4096 -C "w****@163.com"
# 一路回车
cd ~/.ssh/
cat id_rsa.pub
# 将密钥添加到 gitlba 上

```

### 创建项目

密钥成功添加后，接下来开始创建项目。关联项目，测试拉取和提交代码。

![image-20230925105027968](https://lixuanfengs.github.io/blog-images/vp/web/image-20230925105027968.png)



可以根据自己的实际需求，创建符合新要求的项目，这里我选择创建个空的项目。

![image-202230925105042518](https://lixuanfengs.github.io/blog-images/vp/web/image-202230925105042518.png)

![image-20230925110606742](https://lixuanfengs.github.io/blog-images/vp/web/image-20230925110606742.png)

Git全局设置

```shell
git config --global user.name "xuanfeng li"
git config --global user.email "1183895890@qq.com"
```

创建仓库

```shell
git clone ssh://git@192.168.1.19:2224/cactusli/segen.git
cd segen
touch README.md
git add README.md
git commit -m "add README"
git push -u origin main
```

![image-20230925111042421](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20230925111042421.png)

![image-20230925111058204](https://lixuanfengs.github.io/blog-images/cactus-blogs/image-20230925111058204.png)



推送一个已有的文件夹

```shell
cd existing_folder
git init --initial-branch=main
git remote add origin ssh://git@192.168.1.19:2224/cactusli/segen.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

推送一个现有的Git存储库

```shell
cd existing_repo
git remote rename origin old-origin
git remote add origin ssh://git@192.168.1.19:2224/cactusli/segen.git
git push -u origin --all
git push -u origin --tags
```



## 克隆代码

使用 [IDEA (opens new window)](http://www.iocoder.cn/categories/IDEA/?self)克隆 [http://192.168.1.19:8929/root/cactus-vue-pro.git](https://github.com/YunaiV/ruoyi-vue-pro)仓库的最新代码，并给该仓库一个 Star。

> 注意：不建议使用 Eclipse，因为它没有支持 Lombok 和 Mapstruct 插件。

克隆完成后，耐心等待 Maven 下载完相关的依赖。一定要注意：

① 默认情况下，使用 `master` 分支，它对应 JDK 8 + Spring Boot 2.7.18 版本。

![image-20240117162651217](https://lixuanfengs.github.io/blog-images/vp/web/image-20240117162651217.png)

## 启动后端项目

[`cactus-server`](http://192.168.1.19:8929/root/cactus-vue-pro/-/tree/main/cactus-server) 是后端项目，提供管理后台、用户 APP 的 RESTful API 接口。

### 编译项目

第一步，使用 IDEA 打开 Terminal 终端，在 **根目录** 下直接执行 `mvn clean install package '-Dmaven.test.skip=true'` 命令，将项目进行初始化的打包，预计需要 1 分钟左右。成功后，控制台日志如下：

```shell
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  01:20 min
[INFO] Finished at: 2024-01-17T16:32:52+08:00
[INFO] ------------------------------------------------------------------------
```

### 启动项目

第二步，执行 [CactusServerApplication (opens new window)](http://192.168.1.19:8929/root/cactus-vue-pro/-/blob/main/cactus-server/src/main/java/cn/cactus/server/CactusServerApplication.java)类，进行启动。

> 启动还是报类不存在？
>
> 可能是 IDEA 的 bug，点击 [File -> Invalidate Caches] 菜单，清空下缓存，重启后在试试看。

![image-20240117163750094](https://lixuanfengs.github.io/blog-images/vp/web/image-20240117163750094.png)

启动完成后，使用浏览器访问 [http://127.0.0.1:48080 (opens new window)](http://127.0.0.1:48080/)地址，返回如下 JSON 字符串，说明成功。

> 友情提示：注意，默认配置下，后端项目启动在 48080 端口。

```java
{
    "code": 401,
    "data": null,
    "msg": "账号未登录"
}
```

## 接口文档

### apifox 使用

浏览器访问：https://app.apifox.com/user/login，然后使用微信扫码登陆。

创建项目

![image-20240125164810915](https://lixuanfengs.github.io/blog-images/vp/web/image-20240125164810915.png)

配置项目为测试环境

![image-20240125165012809](https://lixuanfengs.github.io/blog-images/vp/web/image-20240125165012809.png)

导入本地接口文档：http://127.0.0.1:48081/v3/api-docs

![image-20240125165144825](https://lixuanfengs.github.io/blog-images/vp/web/image-20240125165144825.png)

填入此文档链接：

![image-20240125165407930](https://lixuanfengs.github.io/blog-images/vp/web/image-20240125165407930.png)



选择需要调试的接口进行调试，先填写 Header , Authorization  ->  Bearer test1

![image-20240125165637901](https://lixuanfengs.github.io/blog-images/vp/web/image-20240125165637901.png)

### Knife4j 使用

浏览器访问 [http://127.0.0.1:48080/doc.html (opens new window)](http://127.0.0.1:48080/doc.html)地址，使用 Knife4j 查看 API 接口文档。

![image-20240117164437679](https://lixuanfengs.github.io/blog-images/vp/web/image-20240117164437679.png)

① 点击任意一个接口，进行接口的调用测试。这里，使用「管理后台 - 大型科研仪器」的“获得大型科研仪器分页”举例子。

② 点击左侧「调试」按钮，并将请求头部的 Authorization` 勾选上。

其中，`Authorization` 的 `"Bearer test"` 后面为用户编号（模拟哪个用户操作）。

如果不勾选，会出现 `"账号未登录"` 错误。

③ 点击「发送」按钮，即可发起一次 API 的调用。

![image-20240117164923974](https://lixuanfengs.github.io/blog-images/vp/web/image-20240117164923974.png)

## 项目结构

### 后端结构

每个模块包含两个 Maven Module，分别是：

| Maven Module            | 作用                      |
| ----------------------- | ------------------------- |
| `cactus-module-xxx-api` | 提供给其它模块的 API 定义 |
| `cactus-module-xxx-biz` | 模块的功能的具体实现      |

例如说，`cactus-module-infra` 想要访问 `cactus-module-system` 的用户、部门等数据，需要引入 `cactus-module-system-api` 子模块。示例如下：

![image-20240117165549813](https://lixuanfengs.github.io/blog-images/vp/web/image-20240117165549813.png)

> 疑问：为什么设计 `cactus-module-xxx-api` 模块呢？
>
> 1. **明确**需要提供给其它模块的 API 定义，方便未来迁移微服务架构。
> 2. 模块之间可能会存在相互引用的情况，虽然说从系统设计上要尽量避免，但是有时在快速迭代的情况下，可能会出现。此时，通过只引用对方模块的 API 子模块，解决相互引用导致 Maven 无法打包的问题。

`cactus-module-xxx-api` 子模块的项目结构如下：

| 所在包  | 类                    | 作用                                |
| ------- | --------------------- | ----------------------------------- |
| `api`   | Api 接口              | 提供给其它模块的 API 接口           |
| `api`   | DTO 类                | Api 接口的入参 ReqDTO、出参 RespDTO |
| `enums` | Enum 类               | 字段的枚举                          |
| `enums` | DictTypeConstants 类  | 数据字典的枚举                      |
| `enums` | ErrorCodeConstants 类 | 错误码的枚举                        |

`cactus-module-xxx-biz` 子模块的项目结构如下：

| 所在包            | 类                               | 作用                                                         |
| ----------------- | -------------------------------- | ------------------------------------------------------------ |
| `api`             | ApiImpl 类                       | 提供给其它模块的 API 实现类                                  |
| `controler.admin` | Controller 类                    | 提供给管理后台的 RESTful API，默认以 `admin-api/` 作为前缀。 例如 `admin-api/system/auth/login` 登录接口 |
| `controler.admin` | VO 类                            | Admin Controller 接口的入参 ReqVO、出参 RespVO               |
| `controler.app`   | Controller 类，**以 App 为前缀** | 提供给用户 App 的 RESTful API，默认以 `app-api/` 作为前缀。 例如 `app-api/member/auth/login` 登录接口 |
| `controler.app`   | VO 类，**以 App 为前缀**         | App Controller 接口的入参 ReqVO、出参 RespVO                 |
| `controler`       | `.http` 文件                     | [IDEA Http Client 插件 (opens new window)]()，模拟请求 RESTful 接口 |
| `service`         | Service 接口                     | 业务逻辑的接口定义                                           |
| `service`         | ServiceImpl 类                   | 业务逻辑的实现类                                             |
| `dal`             | -                                | Data Access Layer，数据访问层                                |
| `dal.dataobject`  | DO 类                            | Data Object，映射数据库表、或者 Redis 对象                   |
| `dal.mysql`       | Mapper 接口                      | 数据库的操作                                                 |
| `dal.redis`       | RedisDAO 类                      | Redis 的操作                                                 |
| `convert`         | Convert 接口                     | DTO / VO / DO 等对象之间的转换器                             |
| `job`             | Job 类                           | 定时任务                                                     |
| `mq`              | -                                | Message Queue，消息队列                                      |
| `mq.message`      | Message 类                       | 发送和消费的消息                                             |
| `mq.producer`     | Producer 类                      | 消息的生产者                                                 |
| `mq.consumer`     | Producer 类                      | 消息的消费者                                                 |
| `framework`       | -                                | 模块自身的框架封装                                           |

> 疑问：为什么 Controller 分成 Admin 和 App 两种？
>
> 提供给 Admin 和 App 的 RESTful API 接口是不同的，拆分后更加清晰。

> 疑问：为什么 VO 分成 Admin 和 App 两种？
>
> 相同功能的 RESTful API 接口，对于 Admin 和 App 传入的参数、返回的结果都可能是不同的。例如说，Admin 查询某个用户的基本信息时，可以返回全部字段；而 App 查询时，不会返回 mobile 手机等敏感字段。

> 疑问：为什么 DO 不作为 Controller 的出入参？
>
> 1. 明确每个 RESTful API 接口的出入参。例如说，创建部门时，只需要传入 name、parentId 字段，使用 DO 接参就会导致 type、createTime、creator 等字段可以被传入，导致前端同学一脸懵逼。
> 2. 每个 RESTful API 有自己独立的 VO，可以更好的设置 Swagger 注解、Validator 校验规则，而让 DO 保持整洁，专注映射好数据库表。

> 疑问：为什么操作 Redis 需要通过 RedisDAO？
>
> Service 直接使用 RedisTemplate 操作 Redis，导致大量 Redis 的操作细节和业务逻辑杂糅在一起，导致代码不够整洁。通过 RedisDAO 类，将每个 Redis Key 像一个数据表一样对待，清晰易维护。



## MyBatis 联表&分页查询

对于需要链表查询的场景，建议也是写 MyBatis XML，使用方法比较简单。

除了 XML 这种方式外，项目也集成了 [MyBatis Plus Join (opens new window)](https://mybatisplusjoin.com/)框架，通过 Java 代码实现联表查询。

这里，以查询 `system_users` 和 `system_dept` 联表，查询部门名为 `仙人球源码`、用户状态为开启的用户列表。

### 案例一：字段平铺

① 创建 AdminUserDetailDO 类，继承 AdminUserDO 类，并添加 `deptName` 平铺。代码如下：

```java
@Data
public class AdminUserDetailDO extends AdminUserDO {

    private String deptName;

}
```

② 在 AdminUserMapper 创建 selectListByStatusAndDeptName 方法，代码如下：

```java
@Mapper
public interface AdminUserMapper extends BaseMapperX<AdminUserDO> {

    default List<AdminUserDetailDO> selectList2ByStatusAndDeptName(Integer status, String deptName) {
        return selectJoinList(AdminUserDetailDO.class, new MPJLambdaWrapper<AdminUserDO>() // 查询 List
                .selectAll(AdminUserDO.class) // 查询 system_users 表的 all 所有字段
                .selectAs(DeptDO::getName, AdminUserDetailDO::getDeptName) // 查询 system_dept 表的 name 字段，使用 deptName 字段“部分”返回
                .eq(AdminUserDO::getStatus, status) // WHERE system_users.status = ? 【部门名为 `仙人球源码`】
                .leftJoin(DeptDO.class, DeptDO::getId, AdminUserDO::getDeptId) // 联表 WHERE system_users.dept_id = system_dept.id 
                .eq(DeptDO::getName, deptName) // WHERE system_dept.name = ? 【用户状态为开启】
        );
    }
    
}
```

### 案例二：字段内嵌

① 创建 AdminUserDetailDO 类，继承 AdminUserDO 类，并添加 `dept` 部门。代码如下：

```java
@Data
public class AdminUserDetail2DO extends AdminUserDO {

    private DeptDO dept;

}
```

② 在 AdminUserMapper 创建 selectListByStatusAndDeptName 方法，代码如下：

```java
@Mapper
public interface AdminUserMapper extends BaseMapperX<AdminUserDO> {

    default List<AdminUserDetail2DO> selectListByStatusAndDeptName(Integer status, String deptName) {
        return selectJoinList(AdminUserDetail2DO.class, new MPJLambdaWrapper<AdminUserDO>()
                .selectAll(AdminUserDO.class)
                .selectAssociation(DeptDO.class, AdminUserDetail2DO::getDept) // 重点差异点：查询 system_dept 表的 name 字段，使用 dept 字段“整个”返回
                .eq(AdminUserDO::getStatus, status)
                .leftJoin(DeptDO.class, DeptDO::getId, AdminUserDO::getDeptId)
                .eq(DeptDO::getName, deptName)
        );
    }

}
```



## 前端项目

采用开源 vue-element-plus-admin 模板

git 地址：https://gitee.com/kailong110120130/vue-element-plus-admin

演示地址：https://kailong110120130.gitee.io/vue-element-plus-admin

文档地址：https://element-plus-admin-doc.cn/guide/introduction.html

### **前后端联调需要更改的设置**

在项目根目录中找到

```js
.env.dev
```

把请求路径、传路径中的 ip:port 换成需要联调后台开发人员的地址

```js
# 开发环境
NODE_ENV=development

VITE_DEV=false

# 请求路径
VITE_BASE_URL='http://92.168.1.218:48080'

# 上传路径
VITE_UPLOAD_URL='http://92.168.1.218:48080/admin-api/infra/file/upload'

# 接口前缀
VITE_API_BASEPATH=/dev-api

# 接口地址
VITE_API_URL=/admin-api

# 打包路径
VITE_BASE_PATH=/

# 是否删除debugger
VITE_DROP_DEBUGGER=true

# 是否删除console.log
VITE_DROP_CONSOLE=false

# 是否sourcemap
VITE_SOURCEMAP=false

# 输出路径
VITE_OUT_DIR=dist

```

如下图所示

![image-20240123152905084](https://lixuanfengs.github.io/blog-images/vp/web/image-20240123152905084.png)

## 安装 git

### 生成ssh key

在git窗口输入

```shell
ssh-keygen -t rsa -C "1183895890@qq.com"
```

然后一直回车
这个指令会要求你提供一个位置和文件名去存放键值对和密码，你可以点击Enter键去使用默认值。
如图：

[![img](https://lixuanfengs.github.io/2020/02/26/Git服务器搭建/d740562x323.png)](https://lixuanfengs.github.io/2020/02/26/Git服务器搭建/d740562x323.png)

**查看生成的公钥**

```shell
cat ~/.ssh/id_rsa.pub
```

[![img](https://lixuanfengs.github.io/2020/02/26/Git服务器搭建/fce0a9e_564x114.png)](https://lixuanfengs.github.io/2020/02/26/Git服务器搭建/fce0a9e_564x114.png)

复制这个公钥放到你的个人设置中的SSH/My SSH Keys下
请完整拷贝从ssh-开始直到你的用户名和主机名为止的内容。

到这里的时候，你的公钥已经创建成功了.

最后把生成好的 SSH Keys 填入 gitlab 中 点击右上角的用户头像  settings > SSH keys .

### 克隆项目

```shell
git -c http.sslverify=false clone https://gitlab.example.com/online_groups/onlineserviceplatform.git
```

### 创建分支

```shell
git checkout -b release-1.0
git branch 查看本地所有分支
```

### 查看和更改本地连接的远程仓库

```shell
git remote -v 查看所有远程仓库， git remote xxx 查看指定远程仓库地址
git remote rm origin 删除远程仓库
git remote add origin git@gitlab.example.com:online_groups/onlineserviceplatform.git
```

pull 拉取服务器代码

```shell
git -c http.sslverify=false pull #提交代码之前先更新
```

### push 向服务器推送代码

```shell
git -c http.sslverify=false push origin release-1.0 #把刚刚创建的分支提交到版本控制器，登录系统发起合并请求>管理员通过>合并分支完成
```



### 提交一个 Pull Request (PR)

步骤如下：

1. **创建一个分支：**

   在你的本地仓库中创建一个新分支，用于进行修改和提交。这个分支通常是基于要修改的目标分支（例如 `main`）创建的。

   ```shell
   git checkout -b feature_branch
   ```

   或者使用 `git switch`：

   ```shell
   git switch -c feature_branch
   ```

2. **进行修改：**

   在新分支上进行你的修改，确保完成后进行提交。

   ```shell
   git add .
   git commit -m "描述你的修改"
   ```

3. **推送分支到远程仓库：**

   将新创建的分支推送到远程仓库。

   ```shell
   git push origin feature_branch
   ```

4. **创建 Pull Request：**

   打开你的远程仓库，选择你刚才推送的分支，并选择创建 Pull Request。在 PR 中，选择目标分支（通常是 `main`）作为要合并到的分支。

5. **填写 PR 描述：**

   提供一个清晰而有意义的 PR 描述，解释你的修改、添加的功能或解决的问题。

6. **等待审查：**

   团队成员会审查你的代码，并提出反馈。可能需要在 PR 中进行一些讨论和修改。

7. **合并 Pull Request：**

   一旦审查通过，你或者其他有权限的团队成员可以将你的分支合并到目标分支。

8. **删除分支（可选）：**

   一旦你的分支被合并，你可以选择删除本地和远程的该分支。

   ```shell
   # 本地删除分支
   git branch -d feature_branch
   
   # 远程删除分支
   git push origin --delete feature_branch
   ```

这样，你就成功地提交了一个 Pull Request。这是一种标准的协作流程，确保了代码的质量和团队的协作。

### 常用命令

```shell
git branch //查看分支
git branch <name> //创建分支
git checkout <name> //切换分支
git checkout -b <name> //创建+切换分支
git merge <name> //合并某分支到当前分支
git branch -d <name> //删除分支

git status 查看当前状态 
git init 初始化仓库
git add . 把修改的文件放到本地暂存区
git commit -m "描述"  提交并且加注释 
git push origin master 把本地代码提交到远程仓库
```

### 解决冲突

```shell
1、服务器代码合并本地代码
git stash     //暂存当前正在进行的工作。
git pull   origin master //拉取服务器的代码
git stash pop //合并暂存的代码
2、服务器代码覆盖本地代码
git reset --hard  //回滚到上一个版本
git pull origin master
```



### 提交代码到 github 出现问题

解决方案如下：

```java
I had the same problem and it seems like something changed on my ISP. I will leave my solution here for future reference. At first I checked my gitconfig.
我也遇到了同样的问题，看来我的 ISP 发生了一些变化。我将我的解决方案留在这里以供将来参考。首先我检查了我的 gitconfig。

$ cat ~/.gitconfig
[user]
    name = ****
    email = ***@***.com
[url "git@github.com:"]
    insteadOf = https://github.com
As it explains my requests from git clients are forwarding to git@github.com:, I tried to ping with the server with ssh.
正如它解释的那样，我来自 git 客户端的请求正在转发到 git@github.com: ，我尝试使用 ssh 与服务器进行 ping 操作。

$ ssh -T git@github.com
ssh: connect to host github.com port 22: Connection timed out
So, I appears that I can not connect to host github.com from my machine. So, I tried to connect the ssh port instead. This time connection was successful.
所以，我似乎无法从我的机器连接到主机 github.com。所以，我尝试连接 ssh 端口。这次连接成功了。

$ ssh -T -p 443 git@ssh.github.com
Hi raihankhan! You've successfully authenticated, but GitHub does not provide shell access.
So, I changed my ~/.gitconfig like the following and git push/pull/clone requests were back to working state!
因此，我像下面这样更改了 ~/.gitconfig ，并且 git Push/pull/clone 请求恢复到工作状态！

[user]
    name = *****
    email = ***@*****.com

[url "ssh://git@ssh.github.com:443/"]
    insteadOf = git@github.com:
```

