---
title: "ES6 常用知识点"
subtitle: "ES6"
date: 2024-4-02 15:44:32
star: true
isOriginal: true
category:
  - ES6s
tag:
  - ES6s
order: 1
---

## ES6+

### let

推荐使用`let`关键字替代 `var`关键字声明变量，因为 `var`存在诸多问题，比如：

#### 越域

```javascript
{
    var a = 1;
    let b = 2;
}
console.log(a); // 1
console.log(b); // ReferenceError: b is not defined
```



####  重复声明

```javascript
// var 可以声明多次
// let 只能声明一次
var m = 1
var m = 2
let n = 3
// let n = 4
console.log(m) // 2
console.log(n) // Identifier 'n' has already been declared
```



#### 变量提升

```javascript
// var 会变量提升
// let 不存在变量提升
console.log(x); // undefined
var x = 10;
console.log(y); //ReferenceError: y is not defined
let y = 20;
```





### const

```javascript
// 1. 声明之后不允许改变
// 2. 一但声明必须初始化，否则会报错
const a = 1;
a = 3; //Uncaught TypeError: Assignment to constant variable.
```



### 解构

#### 数组解构

```javascript
let arr = [1, 2, 3];
//以前我们想获取其中的值，只能通过角标。ES6 可以这样：
const [x, y, z] = arr;// x，y，z 将与 arr 中的每个位置对应来取值
// 然后打印
console.log(x, y, z);
```



#### 对象解构

```javascript
const person = {
    name: "jack",
    age: 21,
    language: ['java', 'js', 'css']
}
// 解构表达式获取值，将 person 里面每一个属性和左边对应赋值
const {name, age, language} = person;
// 等价于下面
// const name = person.name;
// const age = person.age;
// const language = person.language;
// 可以分别打印
console.log(name);
console.log(age);
console.log(language);
//扩展：如果想要将 name 的值赋值给其他变量，可以如下,nn 是新的变量名
const {name: nn, age, language} = person;
console.log(nn);
console.log(age);
console.log(language);
```



### 链判断

如果读取对象内部的某个属性，往往需要判断一下，属性的上层对象是否存在。

比如，读取message.body.user.firstName这个属性，安全的写法是写成下面这样。

```javascript
let  message = null;
// 错误的写法
const  firstName = message.body.user.firstName || 'default';

// 正确的写法
const firstName = (message
                   && message.body
                   && message.body.user
                   && message.body.user.firstName) || 'default';
console.log(firstName)
```



这样的层层判断非常麻烦，因此 [ES2020](https://github.com/tc39/proposal-optional-chaining) 引入了“链判断运算符”（optional chaining operator）**?.**，简化上面的写法。

```javascript
const firstName = message?.body?.user?.firstName || 'default';
```



### 参数默认值

```javascript
//在 ES6 以前，我们无法给一个函数参数设置默认值，只能采用变通写法：
function add(a, b) {
  // 判断 b 是否为空，为空就给默认值 1
  b = b || 1;
  return a + b;
}
// 传一个参数
console.log(add(10));

//现在可以这么写：直接给参数写上默认值，没传就会自动使用默认值
function add2(a, b = 1) {
  return a + b;
}

// 传一个参数
console.log(add2(10));
```



### 箭头函数

```javascript
//以前声明一个方法
// var print = function (obj) {
// console.log(obj);
// }
// 可以简写为：
var print = obj => console.log(obj);
// 测试调用
print(100);
```



```javascript
// 两个参数的情况：
var sum = function (a, b) {
    return a + b;
}
// 简写为：
//当只有一行语句，并且需要返回结果时，可以省略 {} , 结果会自动返回。
var sum2 = (a, b) => a + b;
//测试调用
console.log(sum2(10, 10));//20
// 代码不止一行，可以用`{}`括起来
var sum3 = (a, b) => {
    c = a + b;
    return c;
};
//测试调用
console.log(sum3(10, 20));//30
```





### Promise

代表 `异步对象`，类似Java中的 `CompletableFuture`

**Promise** 是现代 JavaScript 中异步编程的基础，是一个由异步函数返回的可以向我们指示当前操作所处的状态的对象。在 Promise 返回给调用者的时候，操作往往还没有完成，但 Promise 对象可以让我们操作最终完成时对其进行处理（无论成功还是失败）



####  fetch

fetch 是浏览器支持从远程获取数据的一个函数，这个函数返回的就是 `Promise 对象`

```javascript
const fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

console.log(fetchPromise);

fetchPromise.then((response) => {
  console.log(`已收到响应：${response.status}`);
});

console.log("已发送请求……");
```



通过 fetch() API 得到一个 Response 对象；

- **response.status**： 读取响应状态码
- **response.json()**：读取响应体json数据；（**这也是个异步对象**）

```javascript
const fetchPromise = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((json) => {
    console.log(json[0].name);
  });
});
```

#### Promise状态

首先，Promise 有三种状态：

- **待定（pending）**：初始状态，既没有被兑现，也没有被拒绝。这是调用 fetch() 返回 Promise 时的状态，此时请求还在进行中。
- **已兑现（fulfilled）**：意味着操作成功完成。当 Promise 完成时，它的 then() 处理函数被调用。
- **已拒绝（rejected）**：意味着操作失败。当一个 Promise 失败时，它的 catch() 处理函数被调用。



#### Promise对象

```javascript
const promise = new Promise((resolve, reject) => {
// 执行异步操作
if (/* 异步操作成功 */) {
      resolve(value);// 调用 resolve，代表 Promise 将返回成功的结果
    } else {
      reject(error);// 调用 reject，代表 Promise 会返回失败结果
    }
});
```



```javascript
    let get = function (url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: "GET",
                data: data,
                success(result) {
                    resolve(result);
                },
                error(error) {
                    reject(error);
                }
            });
        })
    }
```



### Async关键字

Async主要目的是希望 把Promise.then的各种写法，转换为 同步代码块写法的方式，增强可读性

- `async 函数`是使用`async关键字声明的函数`。async 函数是 [AsyncFunction](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) 构造函数的实例，并且其中允许使用 await 关键字。
- `async 和 await` 关键字让我们可以用一种更简洁的方式写出基于 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 的异步行为，而无需刻意地链式调用 promise。
- `async 函数` 返回的还是 `Promise对象`

```javascript
async function myFunction() {
  // 这是一个异步函数

}
```



在异步函数中，你可以在调用一个返回 Promise 的函数之前使用 **await** 关键字。这使得代码在该点上等待，直到 Promise 被完成，这时 Promise 的响应被当作返回值，或者被拒绝的响应被作为错误抛出。

```javascript
async function fetchProducts() {
  try {
    // 在这一行之后，我们的函数将等待 `fetch()` 调用完成
    // 调用 `fetch()` 将返回一个“响应”或抛出一个错误
    const response = await fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    );
    if (!response.ok) {
      throw new Error(`HTTP 请求错误：${response.status}`);
    }
    // 在这一行之后，我们的函数将等待 `response.json()` 的调用完成
    // `response.json()` 调用将返回 JSON 对象或抛出一个错误
    const json = await response.json();
    console.log(json[0].name);
  } catch (error) {
    console.error(`无法获取产品列表：${error}`);
  }
}

fetchProducts();
```



### 模块化

**将 JavaScript 程序拆分为可按需导入的单独模块**的机制。Node.js 已经提供这个能力很长时间了，还有很多的 JavaScript 库和框架已经开始了模块的使用（例如，[CommonJS](https://en.wikipedia.org/wiki/CommonJS) 和基于 [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) 的其他模块系统 如 [RequireJS](https://requirejs.org/)，以及最新的 [Webpack](https://webpack.github.io/) 和 [Babel](https://babeljs.io/)）。

好消息是，最新的浏览器开始原生支持模块功能了。



#### 工程架构

![工程架构](https://lixuanfengs.github.io/blog-images/vp/web/工程架构.png)



#### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="main.js" type="module"/>
</head>
<body>
<h1>模块化测试</h1>
</body>
</html>
```



#### user.js

放在 `libs/user.js`

```javascript
const  user = {
    username: "张三",
    age: 18
}

const isAdult = (age)=>{
    if (age > 18){
        console.log("成年人")
    }else {
        console.log("未成年")
    }
}


export {user,isAdult}

// Java 怎么模块化；
// 1、 druid.jar
// 2、import 导入类

// JS 模块化；
// 1、 xxx.js
// 2、 xxx.js 暴露功能；
// 3、import 导入 xxx.js 的功能
//xxx.js 暴露的功能，别人才能导入
```



#### main.js

```javascript
// 所有的功能不用写在一个JS中
import {user,isAdult} from './libs/user.js'


alert("当前用户："+user.username)

isAdult(user.age);
```

