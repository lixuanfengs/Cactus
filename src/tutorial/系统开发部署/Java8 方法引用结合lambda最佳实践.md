---
title: "Java8 方法引用结合lambda最佳实践"
subtitle: "Java8 方法引用结合lambda最佳实践"
date: 2024-8-09 14:36:20
category:
   - lambda
tag:
   - lambda
order: 7
---

## 详解lambda中的方法引用

我们现在有一个苹果类，其代码定义如下：

```java
@Data
@AllArgsConstructor
public class Apple  {
    private int weight;
    
}
```

因为重量单位的不同，所以得出的重量的结果可能是不同的，所以我们将计算重量的核心部分抽象成函数式接口，如下`function`所示，它要求我们传入`Apple`返回`Integer`：

```java
private static int getWeight(Apple apple, Function<Apple,Integer> function) {
        return function.apply(apple);
    }
```

假设我们对重量无需任何单位换算即原原本本返回重量本身，那么我们的表达式则直接是`(a)->a.getWeight()`，对应代码如下：

```java
 Apple apple=new Apple(1);
 System.out.println(getWeight(apple,(a)->a.getWeight()));
```

其实这个表达式还不是最精简的，按照方法引用的语法糖，如果我们的`lambda`表达式符合：`(arg)->arg.method()`，即传入的`lambda`就是`(实例变量)->实例变量.实例方法()`，那么这个表达式就可以直接缩写为`arg ClassName::invokeMethod`：

![图片](https://lixuanfengs.github.io/blog-images/vp/web/lambad1.png)

于是我们的代码就可以精简成下面这样：

```java
System.out.println(getWeight(apple,Apple::getWeight));
```

除了上述这个公式以外，其实还有另外两种公式，如下所示我们的map映射希望将流中的字符串转为整型，然后输出：

```java
  Arrays.asList("1").stream()
                .map(s -> Integer.parseInt(s))
                .forEach(i -> System.out.println(i));
```

按照jdk8的语法糖，对应的静态类调用静态方法的表达式`(args)->className.staticMethod(args)`可以直接缩写为`className->staticMethod(args)`，于是我们的整型转换的就可以直接缩写为`Integer::parseInt`：

![图片](https://lixuanfengs.github.io/blog-images/vp/web/lambad2.png)

```java
 Arrays.asList("1").stream()
                .map(Integer::parseInt)
                .forEach(i -> System.out.println(i));
```

最后一种则是针对多参数的如下所示，这是一个常规的排序lambda编程：

```java
 List<String> str = Arrays.asList("a","b","A","B");
str.sort((s1, s2) -> s1.compareToIgnoreCase(s2));
```

按照Java8的语法糖：`(arg1,arg2)->arg1.instanceMethod(arg2)`可以直接转换为`arg1ClassName::invokeInstanceMethod`，于是我们的就有了下面的推导：

![图片](https://lixuanfengs.github.io/blog-images/vp/web/lambad3.png)

最终我们的表达式就变成了这样：

```java
List<String> str = Arrays.asList("a","b","A","B");
        str.sort(String::compareToIgnoreCase);
```

### 方法引用对于含参构造器的抽象

我们再来一个难一点的例子，假设我们的现在的类有重量和颜色两种属性，并指明使用全参构造器完成实例创建，我们如何将这个构造器转换为方法引用呢？

```java
@Data
@AllArgsConstructor
public class Apple  {
    private int weight;

    private String color;

}
```

这里我们不妨简单梳理一下，我们的构造器为传参顺序为`weight`、`color`然后创建`Apple`实例，对此我们可以大体抽象出函数式接口的签名为`(Integer,String)->Apple`，基于这个签名我们可以直接套用公式`BiFunction`，它的签名为`(T,U)->R`，参数列表符合要求，我们直接将类型代入完成函数式接口抽象：

```java
private static Apple createApple(Integer weight,String color,BiFunction<Integer, String, Apple> func) {
        return func.apply(weight, color);
    }
```

基于上述的签名的参数列表和预期返回值，我们得出下面这样一条`lambda`表达式作为入参传入，由此得到一个`Apple`实例：

```java
 createApple(1,"yellow",(w,s)->new Apple(w,s));
```

按照上文所说的公式，于是我们的表达式又可以转为方法引用：

```java
 createApple(1,"yellow",Apple::new);
```

### lambda和方法引用的结合

我们希望对苹果类进行排序，对此我们给出苹果类的实例集合：

```java
List<Apple> appleList = Arrays.asList(new Apple(80, "green"),
                new Apple(200, "red"),
                new Apple(155, "yellow"),
                new Apple(120, "red"));
```

查看函数式接口`Comparator`的抽象方法 `int compare(T o1, T o2);`得出对应的函数签名为`(T,T)->Integer`，代入我们的Apple类，那么这个比较器的函数描述符则是`(Apple,Apple)->Integer`，于是我们就有了下面这条`lambda`表达式：

```java
 Comparator<Apple> comparator = (a1,a2)->a1.getWeight()-a2.getWeight();
```

我们键入如下代码进行调用输出：

```java
 appleList.sort(comparator);
 appleList.forEach(System.out::println);
```

和预期比较结果一致：

```java
Apple(weight=80, color=green)
Apple(weight=120, color=red)
Apple(weight=155, color=yellow)
Apple(weight=200, color=red)
```

实际上我们还可以做的更加精简，因为JDK8中的`Comparator`已经为比较器提供了一个方法`comparing`，查看其源码可以看到他要求传入一个入参`keyExtractor`，从语义上就可以知道这个参数是作为比较的条件，以我们的例子就是`Apple`的`weight`。 这个`keyExtractor`是`Function`接口，查看其泛型我们也可以知晓它的函数式签名为`T->R`，由此我们可以推理出该方法本质就是通过Function接口变量`keyExtractor`生成比较变量的实例然后调用`compareTo`进行比较并返回结果：

```java
//要求传入keyExtractor即作为比较的条件
public static <T, U extends Comparable<? super U>> Comparator<T> comparing(
            Function<? super T, ? extends U> keyExtractor)
    {
        //......
        return (Comparator<T> & Serializable)
         //通过keyExtractor生成key值调用其compareTo方法进行比较
            (c1, c2) -> keyExtractor.apply(c1).compareTo(keyExtractor.apply(c2));
    }
```

基于上述分析我们就可以开始编写这个比较器的`keyExtractor`的`lambda`表达式了，如下图，通过`keyExtractor`泛型得出函数描述符为`(T)->R`，基于我们的场景推导出公式是`apple实例->apple实例的weight`，最后`comparing`回基于这个函数接口生成的`R对象(我们的场景是weight即int类型)`调用`compareTo`进行比较：

![图片](https://lixuanfengs.github.io/blog-images/vp/web/lambad4.png)

于是我们就有了这样一条lambda表达式，但这还不是最精简的：

```java
Comparator<Apple> comparator = Comparator.comparing(a->a.getWeight());
```

按照`lambda`的语法糖:`instance->instance.method` 可以直接转为`instanceType::method`，我们最终的表达式如下，预期结果也和之前一致：

```java
 Comparator<Apple> comparator = Comparator.comparing(Apple::getWeight);
```

当然有时候我们希望能够对结果进行反向排序，我们也只需在comparing方法后面加一个reversed即实现，从语义和使用上是不是都很方便呢？

```java
Comparator<Apple> comparator = Comparator.comparing(Apple::getWeight).reversed();
```

## 复合表达式

### 复合比较器

自此我们基本将方法引用的推导和使用都讲完了，接下来我们还是基于`lambda`做一些实用的拓展，先来说说复合比较器，以上文的苹果为例，假设我们希望当重量一样时，在比较颜色进行进一步比较，那么我们就可以直接通过`thenComparing`生成复合表达式：

```java
 Comparator<Apple> comparator = Comparator.comparing(Apple::getWeight).reversed().thenComparing(Apple::getColor);
```

### 谓词复合

还是用上面的例子，我们希望根据不同的条件从苹果集合中过滤出复合条件的苹果，对此我们基于`Predicate`即断言函数式接口编写了一个`filterApple`方法：

```java
private static List<Apple> filterApple(List<Apple> appleList, Predicate<Apple> predicate) {
        List<Apple> list = new ArrayList<>();
        for (Apple apple : appleList) {
            //复合predicate设定条件的苹果存入集合中
            if (predicate.test(apple)) {
                list.add(apple);
            }
        }
        return list;
    }
```

假如客户需要过滤出红色的苹果，基于predicate的签名我们得出这样一个表达式，这里就不多介绍了：

```java
 filterApple(appleList, apple -> apple.getColor().equals("red"));
```

假如这时候我们有需要过滤出不为红色的苹果呢？其实`JDK8`为我们提供了一个非常强大的谓词`negate`，我们完全可以基于上面的代码进行改造从而实现需求，如下所示`negate`就相当于`!"red".equals(a.getColor());`，语义是不是很清晰呢？

```java
Predicate<Apple> predicate = apple -> apple.getColor().equals("red");
        filterApple(appleList, predicate.negate());
```

但是我们需要再次变化了，我们希望找出红色且重量大于150，或者颜色为绿色的苹果，这时候又怎么办呢？我们说过`JDK8`提供了`and`、`or`等谓词，我们的代码完全可以写成下文所示,可以看到代码语义以及流畅度都相比`JDK8`之前的各种`&& ||`拼接`for`循环来说优雅非常多：

```java
 //过滤出红色的苹果
        Predicate<Apple> predicate = apple -> apple.getColor().equals("red");
        //过滤出红色且大于150 或者绿色的苹果
        Predicate<Apple> redAndHeavyAppleOrGreen = predicate.and(apple -> apple.getWeight() > 150).
                or(apple -> apple.getColor().equals("green"));


        filterApple(appleList, redAndHeavyAppleOrGreen);
```

### 函数复合

我们都说代码和数学息息相关，其实java8也提供很多函数式接口可以运用于数学公式上,例如，我们现在需要计算`f(g(x))`，这个公式学过高数的同学都知道，是先计算`g(x)`再将`g(x)`的结果作为入参交给`f(x)`计算，对应题解案例如下：

```java
我们假设g(x)=x * 2
f(x)=x+1
假如x=1
那么f(g(x))最终就会等于4
```

了解数学公式之后，我们完全可以使用java代码表示出来，首先我们先声明一下`f(x)`和`g(x)`：

```java
//f(x)
 Function<Integer, Integer> f = x -> x + 1;
 //g(x)
 Function<Integer, Integer> g = x -> x * 2;
```

在表示`g(f(x))`，通过复合表达式`andThen`表达了数学的计算顺序，即显得出`f(x)`结果，然后`(andThen)`代入`g(x)`中：

```java
 //意味先计算f(x)在计算g(x)
 Function<Integer, Integer> h = f.andThen(g);
System.out.println(result); //输出 4
```

基于上面的例子，如果我们还需要计算`f(g(x))`要怎么办呢？从f(x)角度来看，g(x)的结果组合到f(x)上，所以我们可以直接实用compose方法：

```java
 Function<Integer, Integer> gfx = f.compose(g);
 Integer result = gfx.apply(1);
 System.out.println(result);// 输出 3
```

选其中一种好理解的实用就行了。

## 小结

自此我们将方法引用的推导和实用，以及各种表达式组合的内容都介绍完了，希望对你有帮助。