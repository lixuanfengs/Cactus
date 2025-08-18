---
title: "DDD 工程 Dubbo 使用教程及原理分析"
subtitle: "DDD 工程 Dubbo 使用教程及原理分析"
date: 2024-4-11 10:54:20
category:
  - DDD 技术体系
tag:
  - DDD 技术体系
order: 6
---
## 一、Dubbo 能干什么？

随着互联网场景的扩展，面对的用户规模和体量不断增加，系统也需进行相应的拆分设计和实施。原本单一的系统现已演变为多个微服务。例如，电商系统过去可能只需在一个工程中开发，而现在则需要将用户、支付、商品、配送、活动和风控等模块分离出来。那么，这些模块拆分后，应如何实现高效的通信呢？

![image-20240422161208873](https://lixuanfengs.github.io/blog-images/vp/web/image-20240422161208873.png)

关于通信，我们引入了RPC框架，而Dubbo是其中的一种实现方式。选择Dubbo的主要原因是为了提高通信效率。Dubbo采用Socket进行底层通信，而不是HTTP，因此其通信性能更优。同时，Dubbo具备分布式高可用设计，当部署了交易服务的某组实例发生故障时，这些实例会从注册中心被摘除，随后流量将转移到其他服务上。这样的设计确保了服务的稳定性和可靠性。

## 二、该如何使用

![image-20240422161924427](https://lixuanfengs.github.io/blog-images/vp/web/image-20240422161924427.png)

Dubbo的使用涉及两个方面：接口的提供方和接口的调用方。接口提供方需要提供接口的描述性信息，供调用方使用。这些信息包括接口名称、接口的输入参数和输出参数。只有当调用方获取到这些信息后，才能基于这些接口信息创建一个代理，通过代理类使用Socket完成信息的交互。

因此，虽然表面上使用RPC接口看似与使用HTTP没有太大区别，只是增加了POM配置和注解配置的步骤，但实际上RPC使用了你的Jar文件作为代理操作的必要参数。这种方式实际上是通过代理来实现的。本文也将进一步介绍这种代理是如何实现的。

## 三、使用的案例

基本条件包括：

- JDK 1.8
- Maven 3.x - 只要是支持JDK 1.8的版本即可
- Dubbo 3.1.4 - 在POM文件中已经配置好，与2.x版本主要的区别在于一些注解的使用
- Zookeeper 3.4.x - 如果你是按照本文的直连模式进行测试，那么可以不安装Zookeeper

### 1. 接口提供方

![image-20240422170553163](https://lixuanfengs.github.io/blog-images/vp/web/image-20240422170553163.png)

#### 1.1 接口定义

**源码**：`cn.cactusli.dev.tech.dubbo.api.IUserService`

```java
public interface IUserService {

    Response<UserResDTO> queryUserInfo(UserReqDTO reqDTO);

}
```

> 接口定义看似简单，但隐藏了一个关键的要求：所有的Dubbo接口及其出入参，默认都必须实现Serializable接口。这意味着UserReqDTO、UserResDTO、Response这三个类都需要继承Serializable序列化接口。这一设计是为了确保这些对象在网络间传输时能够被正确地序列化和反序列化。

#### 1.2 接口实现

**源码**：`cn.cactusli.dev.tech.dubbo.trigger.rpc.UserService`

```java
@Slf4j
@DubboService(version = "1.0.0")
public class UserService implements IUserService {

    @Override
    public Response<UserResDTO> queryUserInfo(UserReqDTO reqDTO) {
        log.info("查询用户信息 userId: {} reqStr: {}", reqDTO.getUserId(), JSON.toJSONString(reqDTO));
        try {
            // 1. 模拟查询【你可以从数据库或者Redis缓存获取数据】
            UserResDTO resDTO = UserResDTO.builder()
                    .userId(reqDTO.getUserId())
                    .userName("仙人球")
                    .userAge(18)
                    .build();

            // 2. 返回结果
            return Response.<UserResDTO>builder()
                    .code(Constants.ResponseCode.SUCCESS.getCode())
                    .info(Constants.ResponseCode.SUCCESS.getInfo())
                    .data(resDTO).build();
        } catch (Exception e) {
            log.error("查询用户信息失败 userId: {} reqStr: {}", reqDTO.getUserId(), JSON.toJSONString(reqDTO), e);
            return Response.<UserResDTO>builder()
                    .code(Constants.ResponseCode.UN_ERROR.getCode())
                    .info(Constants.ResponseCode.UN_ERROR.getInfo())
                    .build();
        }
    }
}
```

> 在Dubbo中，实现接口需要由Dubbo本身来管理，因此Dubbo提供了`@DubboService`注解来标识服务。这与Spring的`@Service`注解容易混淆，尤其是在早期的Dubbo版本2.7.*中，Dubbo也使用了`@Service`注解，这容易导致开发者误用Spring的`@Service`。这种小错误可能会让你调试半天才发现问题所在。

####  1.3 工程配置

**application.yml**

```java

dubbo:
  application:
    name: lxf-dev-tech-dubbo
    version: 1.0.0
  registry:
    address: zookeeper://127.0.0.1:2181 # N/A - 无zookeeper可配置 N/A 走直连模式测试
  protocol:
    name: dubbo
    port: 20881
  scan:
    base-packages: cn.cactusli.dev.tech.dubbo.api
```

在Dubbo中，`base-packages`用于指定扫描Dubbo服务接口的入口位置。你只需要配置好这个入口，Dubbo框架会自动找到对应的实现类。但是，要注意，这些服务接口和实现类必须能被Spring框架扫描到并管理，这就要求你的pom文件中必须直接或间接地引入定义了Dubbo服务的模块。

关于Spring应用开发，它讲究的是“约定大于配置”。这意味着你的Application类的包名应该足够广泛，以覆盖到其他所有相关的包名。例如，如果你将Application配置在了`cn.cactusli.dev.tech.dubbo.a.b.c.d.*`，那么它默认可能就扫描不到`cn.cactusli.dev.tech.dubbo.api`这个包。这种包扫描的问题可能会导致你花费大量时间去调试。

另外，关于Dubbo的连接配置，如果你设置了`address`为`N/A`，这表示不通过任何注册中心进行连接，仅用于本地直连测试。而如果你配置了如`zookeeper://127.0.0.1:2181`这样的地址，那么你需要先安装Zookeeper。即使配置了使用注册中心，你也可以进行直连测试，这对于开发和测试阶段非常有用。

#### 1.4 应用构建

在Maven中，`install`命令的作用是将项目的打包后的jar包安装到本地Maven仓库中。这样做的目的是让同一个本地Maven配置的其他项目能够引用这个jar包。当你执行`install`命令后，生成的jar包就会被保存在你的本地Maven仓库里，这使得其他依赖于此jar包的项目可以方便地进行构建和开发。

![image-20240422172905704](https://lixuanfengs.github.io/blog-images/vp/web/image-20240422172905704.png)

### 2. 接口使用方

#### 2.1 POM 引入

```java
<dependency>
    <groupId>cn.cactusli</groupId>
    <artifactId>lxf-dev-tech-dubbo-api</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

> POM 的配置，就是把 Jar 包给引用进来。因为 Dubbo 需要根据这个接口，做一个代理操作。**不引入，你代码就爆红啦！爆红啦！🌶**

#### 2.2 消费配置

**源码**：`application.yml`

```yml
dubbo:
  application:
    name: lxf-dev-tech-dubbo
    version: 1.0.0
  registry:
     address: zookeeper://127.0.0.1:2181
#    address: N/A
  protocol:
    name: dubbo
    port: 20881
```

> 配置了 zookeeper 你就用第一个，代码中对应 `@DubboReference(interfaceClass = IUserService.class, version = "1.0.0")`
>
> 配置了 N/A 你就用第二个，代码中必须指定直连。`@DubboReference(interfaceClass = IUserService.class, url = "dubbo://127.0.0.1:20881", version = "1.0.0")`

#### 2.3 代码配置

**源码**：`cn.cactusli.dev.tech.dubbo.consumer.test.ApiTest`

```java
// 直连模式；@DubboReference(interfaceClass = IUserService.class, url = "dubbo://127.0.0.1:20881", version = "1.0.0")
@DubboReference(interfaceClass = IUserService.class, version = "1.0.0")
private IUserService userService;

@Test
public void test_userService() {
    UserReqDTO reqDTO = UserReqDTO.builder().userId("10001").build();
    Response<UserResDTO> resDTO = userService.queryUserInfo(reqDTO);
    log.info("测试结果 req: {} res: {}", JSON.toJSONString(reqDTO), JSON.toJSONString(resDTO));
}

```

**测试结果**

```java
2024-04-22 17:58:44.523  INFO 21596 --- [           main] c.c.d.t.d.c.config.RPCProxyBeanFactory   : Rpc Socket 链接等待，需要启动 lxf-dev-tech-dubbo 默认提供 127.0.0.1:22881 链接地址...
2024-04-22 17:58:45.421  INFO 21596 --- [           main] c.c.d.tech.dubbo.consumer.test.ApiTest   : Started ApiTest in 2.512 seconds (JVM running for 3.035)
2024-04-22 17:58:45.778  INFO 21596 --- [           main] c.c.d.tech.dubbo.consumer.test.ApiTest   : 测试结果 req: {"userId":"10001"} res: {"code":"0000","data":{"userAge":18,"userId":"10001","userName":"仙人球"},"info":"成功"}
```

## 四、原理的分析

Jar 文件不仅包含可执行的代码，还包含了描述性的信息，这些信息使得远程服务能够被正确地代理和调用。在 Dubbo 的架构中，这个过程主要依赖于接口定义和服务注册与发现机制。

首先，服务提供者（Provider）会将自己的接口、方法以及地址等信息注册到注册中心，如 Zookeeper。这些信息被封装在 Jar 文件中。当服务消费者（Consumer）需要调用这些服务时，它会从注册中心查询这些服务的详细信息，包括它们的位置。

接下来，消费者使用这些信息来建立与服务提供者的连接，并通过代理（Proxy）的方式调用远程服务。这个代理通常是动态生成的，不需要手写，Dubbo 框架会自动为每个服务接口生成一个代理。这个代理背后使用了 Java 的动态代理机制，能够在运行时创建并调用服务。

通过这种方式，Dubbo 实现了服务的透明远程调用，使得开发者可以像调用本地方法一样调用远程服务，极大地简化了分布式系统的开发

![image-20240423100041112](https://lixuanfengs.github.io/blog-images/vp/web/image-20240423100041112.png)

如果所示，接口使用方，对接口进行代理。什么是代理呢，代理（Proxy）是一种设计模式，用于在访问对象时提供一个替代或占位符。这样，代理可以控制对该对象的访问，增加额外的功能或处理步骤。

在这里，代理的概念指的是根据接口的信息创建一个代理对象。这个代理对象内部封装了Socket请求的处理。当开发者调用接口方法时，代理对象会根据接口定义，通过Socket向服务提供方发起请求。服务提供方接收到请求后，解析请求内容，并通过反射机制调用相应的服务方法。完成处理后，结果通过Socket返回给调用方。

接口提供方，也就是Socket的接收方，在收到信息后，会根据接口的描述性内容进行反射调用。这个过程中，服务端解析客户端发送的请求数据，根据请求中指定的方法名和参数，使用反射技术找到并执行相应的方法。方法执行完毕后，将结果通过Socket发送回客户端。这样，客户端就能接收到它请求的数据，完成一次完整的远程方法调用。

###  1. 接口代理 - 提供方

**源码**：`cn.cactusli.dev.tech.dubbo.trigger.socket.RpcServerSocket`

```java
@Slf4j
@Service
public class RpcServerSocket implements Runnable {

    private ApplicationContext applicationContext;

    public RpcServerSocket(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
        new Thread(this).start();
    }

    @Override
    public void run() {
        NioEventLoopGroup boosGroup = new NioEventLoopGroup();
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap b = new ServerBootstrap();
            b.group(boosGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .option(ChannelOption.SO_BACKLOG, 128)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel socketChannel) throws Exception {
                            socketChannel.pipeline().addLast(new ObjectEncoder());
                            socketChannel.pipeline().addLast(new ObjectDecoder(Integer.MAX_VALUE, null));
                            socketChannel.pipeline().addLast(new SimpleChannelInboundHandler<Map<String, Object>>() {
                                @Override
                                protected void channelRead0(ChannelHandlerContext channelHandlerContext, Map<String, Object> request) throws Exception {
                                    // 解析参数
                                    Class<?> clazz = (Class<?>) request.get("clazz");
                                    String methodName = (String) request.get("methodName");
                                    Class<?>[] paramTypes = (Class<?>[]) request.get("paramTypes");
                                    Object[] args = (Object[]) request.get("args");

                                    // 反射调用
                                    Method method = clazz.getMethod(methodName, paramTypes);
                                    Object invoke = method.invoke(applicationContext.getBean(clazz), args);

                                    // 封装结果
                                    Map<String, Object> response = new HashMap<>();
                                    response.put("data", invoke);

                                    log.info("RPC 请求调用 clazz:{} methodName:{}, response:{}", clazz.getName(), methodName, JSON.toJSON(response));
                                    // 回写数据
                                    channelHandlerContext.channel().writeAndFlush(response);
                                }
                            });
                        }
                    });
            ChannelFuture f = b.bind(22881).sync();
            f.channel().closeFuture().sync();

        } catch (Exception e) {
            log.error("RpcServerSocket run error", e);
            e.printStackTrace();
        } finally {
            boosGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
```

此代码主要提供的功能是：

1. Netty Socket 启动一个服务端
2. 注入 ApplicationContext applicationContext 用于在接收到请求接口信息后，获取对应的 Bean 对象。
3. 根据请求来的 Bean 对象，以及参数的必要信息。进行接口的反射调用。
4. 最后一步，就是把接口反射请求的信息，再通过 Socket 返回回去。

### 2. 接口反射 - 调用方

**源码**：`cn.cactusli.dev.tech.dubbo.consumer.config.RPCProxyBeanFactory`

```java
@Slf4j
@Component("rpcProxyBeanFactory")
public class RPCProxyBeanFactory implements FactoryBean<IUserService>, Runnable {

    private Channel channel;

    // 缓存数据，实际RPC会对每次的调用生成一个ID来标记获取
    private Object responseCache;

    @Override
    public IUserService getObject() throws Exception {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        Class<?>[] classes = {IUserService.class};
        InvocationHandler handler = new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                if (Object.class.equals(method.getDeclaringClass())) {
                    return method.invoke(this, args);
                }
                Map<String, Object> request = new HashMap<>();
                request.put("clazz", IUserService.class);
                request.put("methodName", method.getName());
                request.put("paramTypes", method.getParameterTypes());
                request.put("args", args);

                channel.writeAndFlush(request);
                // 模拟超时等待，一般RPC接口请求，都有一个超时等待时长。
                Thread.sleep(350);
                return responseCache;
            }
        };
        return (IUserService) Proxy.newProxyInstance(classLoader, classes, handler);
    }

    @Override
    public Class<?> getObjectType() {
        return IUserService.class;
    }

    public RPCProxyBeanFactory() throws InterruptedException {
        new Thread(this).start();
        while (null == channel) {
            Thread.sleep(550);
            log.info("Rpc Socket 链接等待，需要启动 lxf-dev-tech-dubbo 默认提供 127.0.0.1:22881 链接地址...");
        }
    }

    @Override
    public void run() {
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            Bootstrap b = new Bootstrap();
            b.group(workerGroup)
                    .channel(NioSocketChannel.class)
                    .option(ChannelOption.AUTO_READ, true)
                    .handler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel channel) throws Exception {
                            channel.pipeline().addLast(new ObjectEncoder());
                            channel.pipeline().addLast(new ObjectDecoder(ClassResolvers.cacheDisabled(null)));
                            channel.pipeline().addLast(new SimpleChannelInboundHandler<Map<String, Object>>() {
                                @Override
                                protected void channelRead0(ChannelHandlerContext channelHandlerContext, Map<String, Object> data) throws Exception {
                                    responseCache = data.get("data");
                                }
                            });
                        }
                    });
            ChannelFuture channelFuture = b.connect("127.0.0.1", 22881).syncUninterruptibly();
            this.channel = channelFuture.channel();
            channelFuture.channel().closeFuture().syncUninterruptibly();
        } finally {
            workerGroup.shutdownGracefully();
        }
    }
}
```

此代码主要提供的功能是：

1. 实现 `FactoryBean<IUserService>` 为的是把这样一个代理对象，交给 Spring 容器管理。
2. 实现 Runnable 接口，并在接口中，创建 Netty 的 Socket 客户端。客户端中接收来自服务端的消息，并临时存放到缓存中。**注意 Dubbo 中这块的处理会复杂一些，以及请求同步响应通信，这样才能把各个接口的调动记录下来**
3. `getObject()` 对象中，提供代理操作。代理里，就可以自己想咋搞咋搞了。而 Dubbo 也是在代理里，提供了如此的操作，对接口提供方发送请求消息，并在超时时间内返回接口信息。因为反射调用，需要你`提供类`、`方法`、`入参类型`、`入参内容`，所以我们要把这些信息传递给接口提供方。

### 3. 服务测试 - 消费验证

```java
@Resource(name = "rpcProxyBeanFactory")
private IUserService proxyUserService;

@Test
public void test_proxyUserService(){
    UserReqDTO reqDTO = UserReqDTO.builder().userId("10001").build();
    Response<UserResDTO> resDTO = proxyUserService.queryUserInfo(reqDTO);
    log.info("测试结果 req: {} res: {}", JSON.toJSONString(reqDTO), JSON.toJSONString(resDTO));
}
```

**测试结果**

```java
2024-04-23 11:23:31.478  INFO 18908 --- [           main] c.c.d.tech.dubbo.consumer.test.ApiTest   : 测试结果 req: {"userId":"10001"} res: {"code":"0000","data":{"userAge":18,"userId":"10001","userName":"仙人球"},"info":"成功"}
```

> 以上代码里我们给 IUserService 注入一个自己代理好的对象，之后就可以调用验证了。