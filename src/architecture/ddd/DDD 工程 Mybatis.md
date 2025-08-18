---
title: "DDD 工程 Mybatis"
subtitle: "DDD 工程 Mybatis"
date: 2024-4-11 10:54:20
category:
  - DDD 技术体系
tag:
  - DDD 技术体系
order: 5
---
## 一、案例背景

为了清晰明了地展示MyBatis的常用功能,我们设定了一个公司雇员薪酬管理的开发场景。

![image-20240418180519158](https://lixuanfengs.github.io/blog-images/vp/web/image-20240418180519158.png)

- 首先，雇员员工和对应的薪资待遇，是一个1v1的关系。
- 之后，薪资表与调薪表，是一个1vn的关系。每次晋升、普调，都会有一条对应的调薪记录。
- 最后，有了这样3个表，我们就可以很好的完成，员工的插入、批量插入，和事务操作调薪。

## 二、领域模型

**模型定义**：[https://bugstack.cn/md/road-map/ddd.html (opens new window)](https://bugstack.cn/md/road-map/ddd.html)- 你可以先参 [DDD (opens new window)](https://bugstack.cn/md/road-map/ddd.html)篇，这样可以更好的理解模型概念和设计原则。

![image-20240419112246984](https://lixuanfengs.github.io/blog-images/vp/web/image-20240419112246984.png)

![image-20240419113046073](https://lixuanfengs.github.io/blog-images/vp/web/image-20240419113046073.png)

此场景的业务用于对指定的用户进行**晋升加薪调幅**，但因为加薪会需要操作3个表，包括；雇员表 - 修改个人Title、薪资表 - 修改薪酬、调薪记录表 - 每一次加薪都写一条记录。

此场景用于为指定用户进行晋升加薪调整。加薪操作需涉及以下3个表:

1. **雇员表**:修改员工的职位(Title)信息
2. **薪资表**:修改员工的薪酬数额
3. **调薪记录表**:为每次加薪操作添加一条调薪记录

### 1. model

####  1.1 值对象

```java
public enum EmployeePostVO {

    T1("T-1", "初级工程师"),
    T2("T-2", "初级工程师"),
    T3("T-3", "中级工程师"),
    T4("T-4", "中级工程师"),
    T5("T-5", "高级工程师"),
    T6("T-6", "高级工程师"),
    T7("T-7", "架构师"),
    T8("T-8", "架构师");

    private final String code;
    private final String desc;

		// 省略部分

}
```

> 当一个实体对象中的一个值，是有多个范围时候，则需要定义出值对象。由于此类的值对象更贴近于当前的场景业务，所以一般不会被定义为共用的枚举。如此此类值范围，都会被定义为值对象。

####  1.2 实体对象

```java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeEntity {

    /** 雇员级别 */
    private EmployeePostVO employeeLevel;
    /** 雇员岗位Title */
    private EmployeePostVO employeeTitle;

}

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeSalaryAdjustEntity {

    /** 总额调薪 */
    private BigDecimal adjustTotalAmount;
    /** 基础调薪 */
    private BigDecimal adjustBaseAmount;
    /** 绩效调薪 */
    private BigDecimal adjustMeritAmount;

}
```

> 实体对象是对数据库对象的抽象，大多数时候是 1:1 的关系结构，在一些复杂的模型场景中会是1:n的结构。

####  1.3 聚合对象

```java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdjustSalaryApplyOrderAggregate {

    /** 雇员编号 */
    private String employeeNumber;
    /** 调薪单号 */
    private String orderId;
    /** 雇员实体 */
    private EmployeeEntity employeeEntity;
    /** 雇员实体 */
    private EmployeeSalaryAdjustEntity employeeSalaryAdjustEntity;

}
```

> 聚合对象是对实体对象和值对象的封装，代表着一类业务的聚合。通常是作为 service 服务层中入参出现。

### 2. repository

```java
public interface ISalaryAdjustRepository {

    String adjustSalary(AdjustSalaryApplyOrderAggregate adjustSalaryApplyOrderAggregate);

}
```

> 在DDD中，仓储的设计采用了依赖倒置原则，由领域层定义接口，然后由依赖领域包的基础设施层来实现这些接口。
>
> 依赖倒置还自然地实现了PO（数据库持久化对象）的隔离，防止它们被外部直接使用。这种设计精巧地确保了结构的严谨性，避免了对象的滥用。

### 3. service

```java
public interface ISalaryAdjustApplyService {

    String execSalaryAdjust(AdjustSalaryApplyOrderAggregate adjustSalaryApplyOrderAggregate);

}
```

> 在简单场景下，确实不需要额外的设计模式。但对于复杂场景，设计模式的应用是必不可少的，以避免将所有代码都集中在如SalaryAdjustApplyService的实现类中，这样做会使得代码难以维护。同时，不应仅将聚合对象视为充血模型；实际上，充血结构应该涵盖领域内的每一个领域包，将状态和行为视为一个统一的整体。通过这样的模型结构设计，你可以更好地拆分业务对象并实现领域功能。

## 三、配置文件

![image-20240419170826012](https://lixuanfengs.github.io/blog-images/vp/web/image-20240419170826012.png)

> 工程中关于 MyBatis 的使用，在 lxf-dev-tech-app 下进行统一配置。因为所有配置信息都放到一起，比较方便管理，也利于线上上线后，提取配置文件。

## 四、功能实现

接下来，我们将介绍一些 MyBatis 的功能。您可以结合 DDD 的理念来理解这些功能的实现位置，这不仅有助于学习 MyBatis，还能帮助您掌握 DDD 的设计理念。

### 1. 插入&批量插入

**源码**：`cn.cactusli.lxf.dev.tech.infrastructure.dao.IEmployeeDAO`

```java
@Mapper
public interface IEmployeeDAO {

    void insert(EmployeePO employee);

    void insertList(List<EmployeePO> list);

    void update(EmployeePO employeePO);

    EmployeePO queryEmployeeByEmployNumber(String employNumber);

}
```

**xml**：`employee_mapper.xml`

```xml
<insert id="insert" parameterType="cn.bugstack.xfg.dev.tech.infrastructure.po.EmployeePO">
    INSERT INTO employee(employee_number, employee_name, employee_level, employee_title, create_time, update_time)
    VALUES(#{employeeNumber}, #{employeeName}, #{employeeLevel}, #{employeeTitle}, now(), now())
</insert>

<insert id="insertList" parameterType="java.util.List">
    INSERT INTO employee(employee_number, employee_name, employee_level, employee_title, create_time, update_time)
    VALUES
    <foreach collection="list" item="item" separator=",">
        (#{item.employeeNumber}, #{item.employeeName}, #{item.employeeLevel}, #{item.employeeTitle}, now(), now())
    </foreach>
</insert>
```

使用配置文件的方式确实更便于维护，同时您也可以尝试使用 MyBatis 提供的注解方式来完成数据操作。这两种方式各有优势，您可以根据项目的具体需求来选择适合的方法。

### 2. 事务&注解编程

Spring 提供的事务分为注解事务和编程事务，其中编程事务可以实现更细粒度的控制。

在 Spring Boot 中，事务管理的隔离级别可以通过 `@Transactional` 注解的 `isolation` 属性进行配置。常见的事务隔离级别包括：

- **DEFAULT**：使用底层数据库的默认隔离级别。例如，MySQL 默认为 REPEATABLE READ，Oracle 默认为 READ COMMITTED。
- **READ_UNCOMMITTED**：最低的隔离级别，允许读取未提交的数据变更，可能会导致脏读、不可重复读和幻读问题。
- **READ_COMMITTED**：允许读取已经提交的数据变更，可以避免脏读问题，但可能会出现不可重复读和幻读问题。
- **REPEATABLE_READ**：保证同一事务中多次读取同一数据时，结果始终一致，可以避免脏读和不可重复读问题，但可能会出现幻读问题。
- **SERIALIZABLE**：最高的隔离级别，可以避免脏读、不可重复读和幻读问题，但会影响并发性能。

Spring Boot 默认使用 DEFAULT 隔离级别。除非有特殊需求，通常建议使用默认隔离级别。

事务的传播行为也可以通过 `@Transactional` 注解的 `propagation` 属性进行配置。常用的传播行为包括：

- **Propagation.REQUIRED**：默认的传播行为，如果当前存在事务，则加入该事务，否则新建一个事务。
- **Propagation.SUPPORTS**：如果当前存在事务，则加入该事务，否则以非事务的方式执行。
- **Propagation.MANDATORY**：如果当前存在事务，则加入该事务，否则抛出异常。
- **Propagation.REQUIRES_NEW**：无论当前是否存在事务，都会新建一个事务，如果当前存在事务，则将当前事务挂起。
- **Propagation.NOT_SUPPORTED**：以非事务的方式执行操作，如果当前存在事务，则将当前事务挂起。
- **Propagation.NEVER**：以非事务的方式执行操作，如果当前存在事务，则抛出异常。
- **Propagation.NESTED**：如果当前存在事务，则在该事务的嵌套事务中执行，否则新建一个事务。嵌套事务是独立于外部事务的，但如果外部事务回滚，则嵌套事务也会回滚。

`@Transactional` 注解还可以配置其他属性，例如隔离级别、超时时间、只读等，以满足不同的业务需求。

#### 2.1 注解事务

**源码**：`cn.cactusli.lxf.dev.tech.infrastructure.repository.SalaryAdjustRepository`

```java
@Transactional(rollbackFor = Exception.class, timeout = 350, propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT)
public String adjustSalary(AdjustSalaryApplyOrderAggregate adjustSalaryApplyOrderAggregate) {
    String employeeNumber = adjustSalaryApplyOrderAggregate.getEmployeeNumber();
    String orderId = adjustSalaryApplyOrderAggregate.getOrderId();
    EmployeeEntity employeeEntity = adjustSalaryApplyOrderAggregate.getEmployeeEntity();
    EmployeeSalaryAdjustEntity employeeSalaryAdjustEntity = adjustSalaryApplyOrderAggregate.getEmployeeSalaryAdjustEntity();
    EmployeePO employeePO = EmployeePO.builder()
            .employeeNumber(employeeNumber)
            .employeeLevel(employeeEntity.getEmployeeLevel().getCode())
            .employeeTitle(employeeEntity.getEmployeeTitle().getDesc()).build();
    // 更新岗位
    employeeDAO.update(employeePO);
    EmployeeSalaryPO employeeSalaryPO = EmployeeSalaryPO.builder()
            .employeeNumber(employeeNumber)
            .salaryTotalAmount(employeeSalaryAdjustEntity.getAdjustTotalAmount())
            .salaryMeritAmount(employeeSalaryAdjustEntity.getAdjustMeritAmount())
            .salaryBaseAmount(employeeSalaryAdjustEntity.getAdjustBaseAmount())
            .build();
    // 更新薪酬
    employeeSalaryDAO.update(employeeSalaryPO);
    EmployeeSalaryAdjustPO employeeSalaryAdjustPO = EmployeeSalaryAdjustPO.builder()
            .employeeNumber(employeeNumber)
            .adjustOrderId(orderId)
            .adjustTotalAmount(employeeSalaryAdjustEntity.getAdjustTotalAmount())
            .adjustBaseAmount(employeeSalaryAdjustEntity.getAdjustMeritAmount())
            .adjustMeritAmount(employeeSalaryAdjustEntity.getAdjustBaseAmount())
            .build();
    // 写入流水
    employeeSalaryAdjustDAO.insert(employeeSalaryAdjustPO);
    return orderId;
}
```

> 这个事务主要处理的是调整薪资的操作，具体实现则是放在仓储层。在实现时，需要特别注意事务注解的配置，确保事务的正确性和一致性。

#### 2.2 编程事务

![image-20240419172347940](https://lixuanfengs.github.io/blog-images/vp/web/image-20240419172347940.png)

> 使用编程事务，需要在这里创建出一个事务模板，当然你不创建也可以使用。只不过这样统一的配置会更加方便。

##### 2.2.2 事务使用

```java
private TransactionTemplate transactionTemplate;
@Override
public void insertEmployeeInfo(EmployeeInfoEntity employeeInfoEntity) {
    transactionTemplate.execute(new TransactionCallbackWithoutResult() {
        @Override
        protected void doInTransactionWithoutResult(TransactionStatus status) {
            try {
                EmployeePO employeePO = EmployeePO.builder()
                        .employeeNumber(employeeInfoEntity.getEmployeeNumber())
                        .employeeName(employeeInfoEntity.getEmployeeName())
                        .employeeLevel(employeeInfoEntity.getEmployeeLevel())
                        .employeeTitle(employeeInfoEntity.getEmployeeTitle())
                        .build();
                employeeDAO.insert(employeePO);
                EmployeeSalaryPO employeeSalaryPO = EmployeeSalaryPO.builder()
                        .employeeNumber(employeeInfoEntity.getEmployeeNumber())
                        .salaryTotalAmount(employeeInfoEntity.getSalaryTotalAmount())
                        .salaryMeritAmount(employeeInfoEntity.getSalaryMeritAmount())
                        .salaryBaseAmount(employeeInfoEntity.getSalaryBaseAmount())
                        .build();
                employeeSalaryDAO.insert(employeeSalaryPO);
            } catch (Exception e) {
                status.setRollbackOnly();
                e.printStackTrace();
            }
        }
    });
}
```

> 之后，您可以选择手动处理事务，这种方式可以更细致地控制事务的每一个环节。通过手动处理，您可以根据操作的返回结果来决定是否需要回滚事务，而不是仅在发生异常时自动回滚。这样做增加了灵活性，允许根据具体情况做出最合适的决策

### 3. 插件&数据加密

在使用 MyBatis 时，插件开发是一个常见的应用场景，尤其是在进行数据的加解密、路由、日志记录等方面。现在，我将指导你如何实现一个针对指定字段的加解密处理插件，以确保敏感信息如雇员的姓名、薪资和级别不被有心人士盗取。

**源码**：`cn.cactusli.lxf.dev.tech.plugin.FieldEncryptionAndDecryptionMybatisPlugin`

```java
@Intercepts({
        @Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class}),
        @Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class})
})
public class FieldEncryptionAndDecryptionMybatisPlugin implements Interceptor {

    /**
     * 密钥，必须是16位
     */
    private static final String KEY = "1898794876567654";
    /**
     * 偏移量，必须是16位
     */
    private static final String IV = "1233214566547891";

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        Object[] args = invocation.getArgs();
        MappedStatement mappedStatement = (MappedStatement) args[0];
        Object parameter = args[1];
        String sqlId = mappedStatement.getId();

        if (parameter != null && (sqlId.contains("insert") || sqlId.contains("update")) ) {
            String columnName = "employeeName";
            if (parameter instanceof Map) {
                List<Object> parameterList = (List<Object>) ((Map<?, ?>) parameter).get("list");
                for (Object obj : parameterList) {
                    if (hasField(obj, columnName)) {
                        String fieldValue = BeanUtils.getProperty(obj, columnName);
                        String encryptedValue = encrypt(fieldValue);
                        BeanUtils.setProperty(obj, columnName, encryptedValue);
                    }
                }
            } else {
                if (hasField(parameter, columnName)) {
                    String fieldValue = BeanUtils.getProperty(parameter, columnName);
                    String encryptedValue = encrypt(fieldValue);
                    BeanUtils.setProperty(parameter, columnName, encryptedValue);
                }
            }
        }

        Object result = invocation.proceed();

        if (result != null && sqlId.contains("query")) {
            // 查询操作，解密
            String columnName = "employeeName";
            if (result instanceof List) {
                List<Object> resultList = (List<Object>) result;
                for (Object obj : resultList) {
                    if (!hasField(obj, columnName)) continue;
                    String fieldValue = BeanUtils.getProperty(obj, columnName);
                    if (StringUtils.isBlank(fieldValue)) continue;
                    String decryptedValue = decrypt(fieldValue);
                    BeanUtils.setProperty(obj, columnName, decryptedValue);
                }
            }
        }

        return result;
    }

    public String encrypt(String content) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        byte[] raw = KEY.getBytes();
        SecretKeySpec secretKeySpec = new SecretKeySpec(raw, "AES");
        IvParameterSpec ivParameterSpec = new IvParameterSpec(IV.getBytes());
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivParameterSpec);
        byte[] encrypted = cipher.doFinal(content.getBytes());
        return Base64.getEncoder().encodeToString(encrypted);
    }

    /**
     * AES解密
     *
     * @param content 密文
     * @return 明文
     * @throws Exception 异常
     */
    public String decrypt(String content) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        byte[] raw = KEY.getBytes();
        SecretKeySpec secretKeySpec = new SecretKeySpec(raw, "AES");
        IvParameterSpec ivParameterSpec = new IvParameterSpec(IV.getBytes());
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivParameterSpec);
        byte[] encrypted = Base64.getDecoder().decode(content);
        byte[] original = cipher.doFinal(encrypted);
        return new String(original);
    }

    public boolean hasField(Object obj, String fieldName) {
        Class<?> clazz = obj.getClass();
        while (clazz != null) {
            try {
                Field field = clazz.getDeclaredField(fieldName);
                return true;
            } catch (NoSuchFieldException e) {
                clazz = clazz.getSuperclass();
            }
        }
        return false;
    }

}
```

> 代码定义了一个MyBatis插件，用于在数据库操作中自动加密和解密特定字段。插件通过拦截MyBatis的执行器（Executor）方法来实现这一功能。
>
> **拦截器配置**:
>
> - 使用
>
>   ```java
>   @Intercepts
>   ```
>
>   注解定义了两个拦截点：
>
>   - `update`方法，用于处理插入（insert）和更新（update）操作。
>   - `query`方法，用于处理查询（query）操作。
>
> - 每个拦截点都指定了要拦截的方法名和参数类型。
>
> **加密和解密逻辑**:
>
> - **密钥（KEY）**和**偏移量（IV）**都被硬编码在代码中，用于AES加密算法的配置。
> - `encrypt`方法使用AES/CBC/PKCS5Padding模式进行加密。
> - `decrypt`方法使用相同的模式进行解密。
> - 加解密过程中，使用`SecretKeySpec`和`IvParameterSpec`来配置Cipher对象。
>
> **拦截方法实现**:
>
> - `intercept`方法是插件的核心，它根据拦截到的SQL操作类型（插入/更新或查询）来处理数据。
> - 对于插入和更新操作，代码检查参数对象中是否存在指定的字段（如`employeeName`），如果存在，则将该字段的值加密后再设置回对象。
> - 对于查询操作，结果集中对应的字段值会被解密。
> - 加密和解密操作仅在字段存在时进行，使用`hasField`方法来检查对象是否包含特定字段。
>
> **辅助方法**:
>
> - `hasField`方法用于检查一个对象是否包含某个字段，即使该字段在父类中定义也能检测到。
>
> 通过这种方式，插件确保了敏感数据在数据库存储时的安全性，并在应用层面保持数据的可用性和正确性。

## 五、测试验证

###  1. 调薪

```java
@Test
public void test_execSalaryAdjust() {
    AdjustSalaryApplyOrderAggregate adjustSalaryApplyOrderAggregate = AdjustSalaryApplyOrderAggregate.builder()
            .employeeNumber("10000001")
            .orderId("100908977676001")
            .employeeEntity(EmployeeEntity.builder().employeeLevel(EmployeePostVO.T3).employeeTitle(EmployeePostVO.T3).build())
            .employeeSalaryAdjustEntity(EmployeeSalaryAdjustEntity.builder()
                    .adjustTotalAmount(new BigDecimal(100))
                    .adjustBaseAmount(new BigDecimal(80))
                    .adjustMeritAmount(new BigDecimal(20)).build())
            .build();
    String orderId = salaryAdjustApplyService.execSalaryAdjust(adjustSalaryApplyOrderAggregate);
    log.info("调薪测试 req: {} res: {}", JSON.toJSONString(adjustSalaryApplyOrderAggregate), orderId);
}
```

```java
24-04-19.18:04:21.934 [main            ] INFO  HikariDataSource       - HikariPool-1 - Starting...
24-04-19.18:04:22.396 [main            ] INFO  HikariDataSource       - HikariPool-1 - Start completed.
24-04-19.18:04:22.607 [main            ] INFO  ISalaryAdjustApplyServiceTest - 调薪测试 req: {"employeeEntity":{"employeeLevel":"T3","employeeTitle":"T3"},"employeeNumber":"10000001","employeeSalaryAdjustEntity":{"adjustBaseAmount":80,"adjustMeritAmount":20,"adjustTotalAmount":100},"orderId":"100908977676002"} res: 100908977676002
```

### 2. 查询

```java
@Test
public void test_queryEmployInfo() {
    EmployeeInfoEntity employeeInfoEntity = employeeService.queryEmployInfo("10000001");
    log.info("测试结果：{}", JSON.toJSONString(employeeInfoEntity));
}
```

```java
24-04-19.18:06:05.467 [main            ] INFO  IEmployeeServiceTest   - 测试结果：{"employeeLevel":"T-3","employeeName":"仙人球","employeeNumber":"10000001","employeeTitle":"中级工程师","salaryBaseAmount":5300.00,"salaryMeritAmount":5300.00,"salaryTotalAmount":5300.00}
24-04-19.18:06:05.475 [SpringApplicationShutdownHook] INFO  HikariDataSource       - HikariPool-1 - Shutdown initiated...
24-04-19.18:06:05.480 [SpringApplicationShutdownHook] INFO  HikariDataSource       - HikariPool-1 - Shutdown completed.
```

