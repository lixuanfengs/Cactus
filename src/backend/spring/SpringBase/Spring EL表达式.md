---
title: "Spring EL表达式"
subtitle: "Spring EL表达式"
date: 2024-9-17 10:15:26
category:
- Spring
tag:
- Spring
order: 1
---

## Spring EL表达式概述

Spring Expression Language（SpEL）是一种功能强大的表达式语言，广泛应用于Spring框架中。它允许在运行时动态地查询和操作对象图，支持属性访问、方法调用、集合操作、逻辑运算等多种功能。本文将详细介绍SpEL的背景、基本用法、应用场景及其在实际开发中的应用。

## SpEL基本用法

### 表达式解析器

SpEL 的核心组件是 `SpelExpressionParser`，用于解析和评估表达式。

```java
ExpressionParser parser = new SpelExpressionParser();
```

### 文本表达式

SpEL 支持多种文本表达式类型，如字符串、数字、布尔值等。

```java
Expression exp = parser.parseExpression("'Hello World'");
String message = exp.getValue(String.class); // 输出: Hello World

parser.parseExpression("1.024E+3").getValue(Long.class);  // 1024  , 指数形式
parser.parseExpression("0xFFFF").getValue(Integer.class); // 65535 , 十六进制
parser.parseExpression("true").getValue(Boolean.class);   // true
parser.parseExpression("null").getValue();    
```

### 变量定义与访问

通过 `EvaluationContext` 可以在表达式中使用变量。

```java
EvaluationContext context = new StandardEvaluationContext();
ExpressionParser parser = new SpelExpressionParser();
String greeting = parser.parseExpression("#greeting").getValue(context, String.class); // 输出: Hello, SpEL

String cactusli = parser.parseExpression("new String('cactusli')").getValue(String.class);   // 输出: cactusli 

```

### 属性访问

SpEL 支持通过属性名称访问对象的属性。

```java
class User {
    private String name;
    public User(String name) { this.name = name; }
    public String getName() { return name; }
}

User user = new User("Alice");
context.setVariable("user", user);

String name = parser.parseExpression("#user.name").getValue(context, String.class); // 输出: Alice
```

### 方法调用和构造函数

SpEL 支持调用对象的方法和构造函数。

```java
String result = parser.parseExpression("'Hello'.concat(' World')").getValue(String.class); // 输出: Hello World
```

### 集合的对象访问

```java
EvaluationContext context = new StandardEvaluationContext();  // 表达式的上下文,
List<String> list = Lists.newArrayList("a", "b");
Map<String, String> map = Maps.newHashMap();
map.put("A", "1");
map.put("B", "2");
context.setVariable("person", person);                        // 为了让表达式可以访问该对象, 先把对象放到上下文中
context.setVariable("map", map);
context.setVariable("list", list);
// 列表
parser.parseExpression("#list[0]").getValue(context, String.class)           // a , 下标
// map
parser.parseExpression("#map[A]").getValue(context, String.class);           // 1 , key
// 方法
parser.parseExpression("#person.getAge()").getValue(context, Integer.class); // 18 , 方法访问 
```

### 对类型以及原生类的操作和控制

T 操作符可以用于获取类型信息，并调用对象的静态方法。

```java
/ 获取类型
parser.parseExpression("T(java.util.Date)").getValue(Class.class); // class java.util.Date
// 访问静态成员(方法或属性)
parser.parseExpression("T(Math).abs(-1)").getValue(Integer.class); // 1
// 判断类型
parser.parseExpression("'asdf' instanceof T(String)").getValue(Boolean.class); // true;
```

### 操作符

Spring EL 支持大多数的数学、逻辑和关系操作符。

- 关系操作符, 包括: eq(==), ne(!=), lt()<, le(<=), gt(>), ge(>=)
- 逻辑运算符, 包括: and(&&), or(||), not(!)
- 数学操作符, 包括: 加(+), 减(-), 乘(*), 除(/), 取模(%), 幂指数(^)
- 其他操作符, 如: 三元操作符, instanceof, 赋值(=), 正则匹配

另外三元操作符有个特殊的用法, 一般用于赋默认值, 比如: parseExpression("#name?:'defaultName'"), 如果变量name为空时设置默认值.

```java
parser.parseExpression("1 > -1").getValue(Boolean.class);         // true
parser.parseExpression("1 gt -1").getValue(Boolean.class);        // true
parser.parseExpression("true or true").getValue(Boolean.class);   // true
parser.parseExpression("true || true").getValue(Boolean.class);   // true
parser.parseExpression("2 ^ 3").getValue(Integer.class);          // 8
parser.parseExpression("true ? true : false").getValue(Boolean.class); // true
parser.parseExpression("#name ?: 'default'").getValue(context, String.class); // default
parser.parseExpression("1 instanceof T(Integer)").getValue(Boolean.class); // true
parser.parseExpression("'5.00' matches '^-?\d+(\.\d{2})?$'").getValue(Boolean.class); // true
parser.parseExpression("#person.name").getValue(context, String.class);  // Tom , 原来的值
parser.parseExpression("#person.name = 'Jim'").getValue(context, String.class); // Jim , 赋值之后
parser.parseExpression("#person.name").getValue(context, String.class);  // Jim, 赋值起了作用
```

### 避免空指针

当访问一个对象的属性或方法时, 若该对象为null, 就会出现空指针异常. 安全导航会判断对象是否为null,如果是的话, 就返回null而不是抛出空指针异常. 使用方式就是在对象后面加个 **?**， 如下:

```java
java代码解读复制代码// 使用这种表达式可以避免抛出空指针异常
parser.parseExpression("#name?.toUpperCase()").getValue(context, String.class); // null
```

### this变量

有个特殊的变量#this来表示当前的对象. 常用于集合的过滤

```java
//java代码解读复制代码// this 使用示例
parser.parseExpression("{1, 3, 5, 7}.?[#this > 3]").getValue(); // [5, 7]
```

### 集合选择

可以使用选择表达式对集合进行过滤或一些操作，从而生成一个新的符合选择条件的集合, 有如下一些形式:

- `?[expression]`: 选择符合条件的元素
- `^[expression]`: 选择符合条件的第一个元素
- `$[expression]`: 选择符合条件的最后一个元素
- `![expression]`: 可对集合中的元素挨个进行处理

对于集合可以配合#this变量进行过滤, 对于map, 可分别对keySet及valueSet分别使用key和value关键字;

```java
// 集合
parser.parseExpression("{1, 3, 5, 7}.?[#this > 3]").getValue(); // [5, 7] , 选择元素
parser.parseExpression("{1, 3, 5, 7}.^[#this > 3]").getValue(); // 5 , 第一个
parser.parseExpression("{1, 3, 5, 7}.$[#this > 3]").getValue(); // 7 , 最后一个
parser.parseExpression("{1, 3, 5, 7}.![#this + 1]").getValue(); // [2, 4, 6, 8] ,每个元素都加1
// map
Map<Integer, String> map = Maps.newHashMap();
map.put(1, "A");
map.put(2, "B");
map.put(3, "C");
map.put(4, "D");
EvaluationContext context = new StandardEvaluationContext();
context.setVariable("map", map);
parser.parseExpression("#map.?[key > 3]").getValue(context);             // {4=D}
parser.parseExpression("#map.?[value == 'A']").getValue(context);        // {1=A}
parser.parseExpression("#map.?[key > 2 and key < 4]").getValue(context); // {3=C}
```

### 模板表达式

模板表达式允许文字和表达式混合使用, 一般选择使用#{}作为一个定界符:

```java
EvaluationContext context = new StandardEvaluationContext();  //表达式的上下文,
ExpressionParser parser = new SpelExpressionParser();
parser.parseExpression("他的名字为#{#person.name}", new TemplateParserContext()).getValue(context); // 他的名字为Tom
```