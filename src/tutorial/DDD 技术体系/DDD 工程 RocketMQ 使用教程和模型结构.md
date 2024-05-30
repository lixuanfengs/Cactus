---
title: "DDD 工程 RocketMQ 使用教程和模型结构"
subtitle: "DDD 工程 RocketMQ 使用教程和模型结构"
date: 2024-4-11 10:54:20
category:
  - DDD 技术体系
tag:
  - DDD 技术体系
order: 4
---
## 一、应用背景

MQ（消息队列）的主要作用是用于解耦复杂的业务流程和应对流量高峰时的消峰。例如，在用户完成下单支付后，系统可以通过MQ发送一个支付成功的消息，这个消息会触发后续的发货流程。这样，支付和发货两个环节就通过消息队列解耦，提高了系统的灵活性和可维护性。

另一个例子是在使用《MyBatis 使用教程》中的案例场景时，当对雇员进行级别提升和薪资调整后，系统也可以发送一条MQ消息。这条消息用于触发发送邮件通知给用户的流程。通过这种方式，业务流程中的各个环节可以独立运作，互不影响，同时也能有效地处理突发的高流量，避免系统过载。

![image-20240423150157167](https://lixuanfengs.github.io/blog-images/vp/web/image-20240423150157167.png)

如从薪资调整到邮件发送的过程。通过MQ，不同的业务环节可以通过发送和接收消息来进行交互，这样可以减少直接的依赖关系，提高系统的灵活性和可扩展性。

在过去，你可能需要通过多线程来处理这些任务，但现在通过使用MQ，可以简化这一处理过程。通过将消息放入队列，不同的服务实例可以独立地从队列中取出消息并处理，这样既可以分散处理压力，也可以在必要时轻松扩展服务的数量来应对更高的负载需求。

## 二、领域事件

领域事件是微服务设计中实现解耦的核心概念。它是领域模型的重要组成部分，用于表示领域中发生的具体事件。这些事件不仅推动业务流程的发展，还有助于业务解耦，从而实现业务流程的完整闭环。

![image-20240423162241761](https://lixuanfengs.github.io/blog-images/vp/web/image-20240423162241761.png)

* 首先，在领域模型层中，我们需要添加一个事件（event）区域，其目的是定义当前领域所需的事件消息信息。这些信息类型可能包括模型下的实体对象或聚合对象。

* 接着，消息的发送则是在基础设置层进行。由于基础设置层本身是依赖于模型层的，因此模型层定义的事件对象可以方便地在基础设置层中使用。在大多数开发场景中，消息队列（MQ）消息的发送通常与数据库操作相关联，通常的做法是在数据落库之后推送MQ消息。因此，将这一功能定义在仓储层中实现，可以使操作更加顺畅和自然。

* 最后，关于MQ消息，MQ的消费不仅可以是自身服务发出的消息，也可以是来自外部其他微服务的消息。这是在小傅哥讲述的DDD部分中提到的触发器层的内容。

## 三、环境安装

本案例涉及了数据库和RocketMQ的使用，都已经在工程中提供了安装脚本，可以按需执行。

![image-20240423172743384](https://lixuanfengs.github.io/blog-images/vp/web/image-20240423172743384.png)

### 1. 执行 compose yml

**文件**：`docs/rocketmq/rocketmq-docker-compose-mac-amd-arm.yml`  关于安装这里提供了不同的镜像，包括Mac、Mac M1、Windows 可以按需选择使用。

```java
version: '3'
services:
  # https://hub.docker.com/r/xuchengen/rocketmq
  # 注意修改项；
  # 01：data/rocketmq/conf/broker.conf 添加 brokerIP1=127.0.0.1
  # 02：data/console/config/application.properties server.port=9009 - 如果8080端口被占用，可以修改或者添加映射端口
  rocketmq:
    image: livinphp/rocketmq:5.1.0
    container_name: rocketmq
    ports:
      - 9009:9009
      - 9876:9876
      - 10909:10909
      - 10911:10911
      - 10912:10912
    volumes:
      - ./data:/home/app/data
    environment:
      TZ: "Asia/Shanghai"
      NAMESRV_ADDR: "rocketmq:9876"
```

- 使用命令安装：`# /usr/local/bin/docker-compose -f /docs/dev-ops/environment/environment-docker-compose.yml up -d` 
- 首次安装可能使用不了，一个原因是 brokerIP1 未配置IP，另外一个是默认的 8080 端口占用。

### 2. 修改默认配合

1. 打开 `data/rocketmq/conf/broker.conf` 添加一条 `brokerIP1=127.0.0.1` 在结尾

   ```java
   # 集群名称
   brokerClusterName = DefaultCluster
   # BROKER 名称
   brokerName = broker-a
   # 0 表示 Master, > 0 表示 Slave
   brokerId = 0
   # 删除文件时间点，默认凌晨 4 点
   deleteWhen = 04
   # 文件保留时间，默认 48 小时
   fileReservedTime = 48
   # BROKER 角色 ASYNC_MASTER为异步主节点，SYNC_MASTER为同步主节点，SLAVE为从节点
   brokerRole = ASYNC_MASTER
   # 刷新数据到磁盘的方式，ASYNC_FLUSH 刷新
   flushDiskType = ASYNC_FLUSH
   # 存储路径
   storePathRootDir = /home/app/data/rocketmq/store
   # IP地址
   brokerIP1 = 127.0.0.1
   permittedIP = 192.168.1.218,192.168.1.216
   ```

2. 打开 `data/console/config/application.properties`修改`server.port=9009` 端口。

   ```java
   server.address=0.0.0.0
   server.port=9009
   ```

   > 修改配置后，重启服务。

### 3. RockMQ登录与配置

#### 3.1 登录

RocketMQ 此镜像，会在安装后在控制台打印登录账号信息，你可以查看使用。

![image-20240424174024536](https://lixuanfengs.github.io/blog-images/vp/web/image-20240424174024536.png)

![image-20240424174139076](https://lixuanfengs.github.io/blog-images/vp/web/image-20240424174139076.png)

> 登录：http://192.168.1.20:9009/

#### 3.2 创建Topic

![image-20240424190446212](https://lixuanfengs.github.io/blog-images/vp/web/image-20240424190446212.png)

> 可以命令创建：`docker exec -it rocketmq sh /home/app/rocketmq/bin/mqadmin updateTopic -n localhost:9876 -c DefaultCluster -t lxf-mq`

#### 3.3 创建消费者组

![image-20240424190726802](https://lixuanfengs.github.io/blog-images/vp/web/image-20240424190726802.png)

> 可以使用命令创建：`docker exec -it rocketmq sh /home/app/rocketmq/bin/mqadmin updateSubGroup -n localhost:9876 -c DefaultCluster -g lxf-group`

## 四、工程实现

### 1. 工程结构

![image-20240425101631564](https://lixuanfengs.github.io/blog-images/vp/web/image-20240425101631564.png)

无论是使用RocketMQ还是Kafka，操作本身都相对简单。但关键在于如何在架构中合理地使用这些消息队列技术。如果在项目初期没有正确定义消息的发送和接收规则，可能会导致消息在系统中任意地点被发送和接收，这将使得最终的系统架构难以维护。

因此，在使用MQ时，应当根据DDD（领域驱动设计）的领域事件结构来设计消息的生产和消费。具体来说，可以在领域层（domain）使用基础层（infrastructure layer）来生产消息，然后通过触发器层（trigger layer）来接收消息。这样的设计可以确保消息流的清晰和系统的可维护性，同时也利于业务逻辑与消息处理逻辑的解耦。

### 2. 配置文件

**配置依赖包添加到 pom 文件中**

```xml
<!-- https://mvnrepository.com/artifact/org.apache.rocketmq/rocketmq-client-java -->
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-client-java</artifactId>
    <version>5.0.4</version>
</dependency>
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-spring-boot-starter</artifactId>
    <version>2.2.0</version>
</dependency>
```

**添加配置到 application-dev.yml**

```yml
# RocketMQ 配置
rocketmq:
  name-server: 192.168.1.20:9876
  consumer:
    group: lxf-group
    # 一次拉取消息最大值，注意是拉取消息的最大值而非消费最大值
    pull-batch-size: 10
  producer:
    # 发送同一类消息的设置为同一个group，保证唯一
    group: lxf-group
    # 发送消息超时时间，默认3000
    sendMessageTimeout: 10000
    # 发送消息失败重试次数，默认2
    retryTimesWhenSendFailed: 2
    # 异步消息重试此处，默认2
    retryTimesWhenSendAsyncFailed: 2
    # 消息最大长度，默认1024 * 1024 * 4(默认4M)
    maxMessageSize: 4096
    # 压缩消息阈值，默认4k(1024 * 4)
    compressMessageBodyThreshold: 4096
    # 是否在内部发送失败时重试另一个broker，默认false
    retryNextServer: false
```

### 3. 定义领域事件

**源码**：`cn.cactusli.lxf.dev.tech.domain.salary.event.SalaryAdjustEvent`

![image-20240425102311388](https://lixuanfengs.github.io/blog-images/vp/web/image-20240425102311388.png)

```java
@EqualsAndHashCode(callSuper = true)
@Data
public class SalaryAdjustEvent extends BaseEvent<AdjustSalaryApplyOrderAggregate> {

    public static String TOPIC = "lxf-mq";

    public static SalaryAdjustEvent create(AdjustSalaryApplyOrderAggregate aggregate) {
        SalaryAdjustEvent event = new SalaryAdjustEvent();
        event.setId(RandomStringUtils.randomNumeric(11));
        event.setTimestamp(new Date());
        event.setData(aggregate);
        return event;
    }
}
```

> 每个领域的消息都应由该领域自行定义。在消息发送方面，领域层会负责定义和构造消息，而具体的发送操作则交由基础设施层来处理。

### 4. 消息发送

**源码**：`cn.cactusli.lxf.dev.tech.infrastructure.event.EventPublisher`

![image-20240425102823240](https://lixuanfengs.github.io/blog-images/vp/web/image-20240425102823240.png)

```java
/**
 * Package: cn.cactusli.lxf.dev.tech.infrastructure.event
 * Description:
 *  事件发布，消息推送。你可以在这里扩展各类的消息推送方式，如；异步消息、延迟消息、顺序消息、事务消息。
 *
 * @Author 仙人球⁶ᴳ | 微信：Cactusesli
 * @Date 2024/4/23 17:07
 * @Github https://github.com/lixuanfengs
 */
@Slf4j
@Component
public class EventPublisher {

    @Setter(onMethod_ = @Autowired)
    private RocketMQTemplate rocketmqTemplate;

    /**
     * 普通消息
     *
     * @param topic   主题
     * @param message 消息
     */
    public void publish(String topic, BaseEvent<?> message) {
        try {
            String mqMessage = JSON.toJSONString(message);
            log.info("发送MQ消息 topic:{} message:{}", topic, mqMessage);
            rocketmqTemplate.convertAndSend(topic, mqMessage);
        } catch (Exception e) {
            log.error("发送MQ消息失败 topic:{} message:{}", topic, JSON.toJSONString(message), e);
            // 大部分MQ发送失败后，会需要任务补偿
        }
    }

    /**
     * 延迟消息
     *
     * @param topic          主题
     * @param message        消息
     * @param delayTimeLevel 延迟时长
     */
    public void publishDelivery(String topic, BaseEvent<?> message, int delayTimeLevel) {
        try {
            String mqMessage = JSON.toJSONString(message);
            log.info("发送MQ延迟消息 topic:{} message:{}", topic, mqMessage);
            rocketmqTemplate.syncSend(topic, MessageBuilder.withPayload(message).build(), 1000, delayTimeLevel);
        } catch (Exception e) {
            log.error("发送MQ延迟消息失败 topic:{} message:{}", topic, JSON.toJSONString(message), e);
            // 大部分MQ发送失败后，会需要任务补偿
        }
    }
}
```

> 在基础设施层处理 event 事件，主要涉及到 MQ 消息的发送。

**源码**：`cn.cactusli.lxf.dev.tech.infrastructure.repository.SalaryAdjustRepository`

```java
@Repository
public class SalaryAdjustRepository implements ISalaryAdjustRepository {

    @Resource
    private EventPublisher eventPublisher;

  
    @Override
    @Transactional(rollbackFor = Exception.class, timeout = 350, propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT)
    public String adjustSalary(AdjustSalaryApplyOrderAggregate adjustSalaryApplyOrderAggregate) {

		// ... 省略部分代码 

        /*
         * 发送消息，实际应用常见建议
         * 1. 消息发送，不要写在数据库事务中。因为事务一直占用数据库连接，需要快速释放。
         * 2. 对于一些强MQ要求的场景，需要在发送MQ前，写入一条数据库 Task 记录，发送消息后更新 Task 状态为成功。如果长时间未更新数据库状态或者为失败的，则需要由任务补偿进行处理。
         */
        eventPublisher.publish(SalaryAdjustEvent.TOPIC, SalaryAdjustEvent.create(adjustSalaryApplyOrderAggregate));

        return orderId;
    }

}
```

> 在 `SalaryAdjustRepository` 仓储实现中发送 MQ 消息时，确实需要注意以下两点：
>
> 1. **消息发送不应写在数据库事务中**。这是因为数据库事务会占用数据库连接，而数据库连接需要尽快释放以避免影响系统性能和可用性。因此，建议在完成所有数据库操作并提交事务后，再进行消息的发送。
> 2. **对于对消息队列（MQ）要求较高的场景**，可以在发送 MQ 消息前，先在数据库中写入一条 Task 记录。发送消息后，再更新这条 Task 记录的状态为成功。这样做的目的是为了确保消息的可追踪性和状态的可管理性。如果消息发送后，长时间未能更新数据库中的 Task 状态，或者状态更新为失败，那么就需要通过任务补偿机制来处理这种异常情况。

### 5. 消费消息

**源码**：`cn.cactusli.lxf.dev.tech.trigger.mq.SalaryAdjustMQListener`

![image-20240425103420154](https://lixuanfengs.github.io/blog-images/vp/web/image-20240425103420154.png)

```java
@Slf4j
@Component
@RocketMQMessageListener(topic = "lxf-mq", consumerGroup = "lxf-group")
public class SalaryAdjustMQListener implements RocketMQListener<String> {

    @Override
    public void onMessage(String s) {
        log.info("接收到消息：{}", s);
    }
}
```

> 在配置消息队列的消费者时，首先需要设置消费者组和它们需要消费的主题。这样，消费者就可以根据配置的主题接收到消息。接收到消息后，消费者可以根据业务需求进行相应的处理。

## 六、测试验证

###  1. 单独发送消息测试

```java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class RocketMQTest {

    @Setter(onMethod_ = @Autowired)
    private RocketMQTemplate rocketMQTemplate;

    @Test
    public void test() throws InterruptedException {
        rocketMQTemplate.convertAndSend("lxf-mq", "Hello, World!");
        Thread.sleep(3000);
    }
}
```

> 测试发送消息，方便验证流程。

### 2. 业务流程消息验证

```java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class ISalaryAdjustApplyServiceTest {

    @Resource
    private ISalaryAdjustApplyService salaryAdjustApplyService;

    @Test
    public void test_execSalaryAdjust() throws InterruptedException {
        AdjustSalaryApplyOrderAggregate adjustSalaryApplyOrderAggregate = AdjustSalaryApplyOrderAggregate.builder()
                .employeeNumber("10000001")
                .orderId("100908977676002")
                .employeeEntity(EmployeeEntity.builder().employeeLevel(EmployeePostVO.T3).employeeTitle(EmployeePostVO.T3).build())
                .employeeSalaryAdjustEntity(EmployeeSalaryAdjustEntity.builder()
                        .adjustTotalAmount(new BigDecimal(100))
                        .adjustBaseAmount(new BigDecimal(80))
                        .adjustMeritAmount(new BigDecimal(20)).build())
                .build();

        String orderId = salaryAdjustApplyService.execSalaryAdjust(adjustSalaryApplyOrderAggregate);

        log.info("调薪测试 req: {} res: {}", JSON.toJSONString(adjustSalaryApplyOrderAggregate), orderId);
        Thread.sleep(Integer.MAX_VALUE);
    }

}
```

```java
24-04-25.19:16:19.559 [main            ] INFO  HikariDataSource       - HikariPool-1 - Starting...
24-04-25.19:16:20.617 [main            ] INFO  HikariDataSource       - HikariPool-1 - Start completed.
24-04-25.19:16:20.767 [main            ] INFO  EventPublisher         - 发送MQ消息 topic:lxf-mq message:{"data":{"employeeEntity":{"employeeLevel":"T3","employeeTitle":"T3"},"employeeNumber":"10000001","employeeSalaryAdjustEntity":{"adjustBaseAmount":80,"adjustMeritAmount":20,"adjustTotalAmount":100},"orderId":"100908977676002"},"id":"21599579545","timestamp":"2024-04-25 19:16:20.751"}
24-04-25.19:16:21.021 [main            ] INFO  ISalaryAdjustApplyServiceTest - 调薪测试 req: {"employeeEntity":{"employeeLevel":"T3","employeeTitle":"T3"},"employeeNumber":"10000001","employeeSalaryAdjustEntity":{"adjustBaseAmount":80,"adjustMeritAmount":20,"adjustTotalAmount":100},"orderId":"100908977676002"} res: 100908977676002
24-04-25.19:16:28.540 [ConsumeMessageThread_lxf-group_1] INFO  SalaryAdjustMQListener - 接收到消息：{"data":{"employeeEntity":{"employeeLevel":"T3","employeeTitle":"T3"},"employeeNumber":"10000001","employeeSalaryAdjustEntity":{"adjustBaseAmount":80,"adjustMeritAmount":20,"adjustTotalAmount":100},"orderId":"100908977676002"},"id":"21599579545","timestamp":"2024-04-25 19:16:20.751"}
```

> 运行完成一次调薪方法后，此时MQ就会监听到发送的消息。