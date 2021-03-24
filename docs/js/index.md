# 面试题未整理

- 请写出如下代码的打印结果
```js
function Foo() {
    Foo.a = function() {
        console.log(1)
    }
    this.a = function() {
        console.log(2)
    }
}
Foo.prototype.a = function() {
    console.log(3)
}
Foo.a = function() {
    console.log(4)
}
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
```

- 写出下面打印结果

```js
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);
```

- 模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况

- 实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度
- 请实现一个 add 函数，满足以下功能。

```js
add(1); 			// 1
add(1)(2);  	// 3
add(1)(2)(3)；// 6
add(1)(2, 3); // 6
add(1, 2)(3); // 6
add(1, 2, 3); // 6
```

- var、let 和 const 区别的实现原理是什么


- 输出结果是什么
```js
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]);

---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]);

---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]);
```

- 使用 JavaScript Proxy 实现简单的数据绑定
- 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。
- a.b.c.d 和 a['b']['c']['d']，哪个性能更高？
- 箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？
- 要求设计 LazyMan 类，实现以下功能。

```js
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```
- 某公司 1 到 12 月份的销售额存在一个对象里面
如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。
- 输出以下代码的执行结果并解释为什么

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) 	
console.log(b.x)
```

- 实现 (5).add(3).minus(2) 功能。
- call 和 apply 的区别是什么，哪个性能更好一些
- 输出以下代码执行的结果并解释为什么

```js
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```

- 实现一个 sleep 函数
比如 sleep(1000) 意味着等待1000毫秒，可从 Promise、Generator、Async/Await 等角度实现

- 下面代码输出什么

```js
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```

- 下面代码中 a 在什么情况下会打印 1？

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}
```

- 使用迭代的方式实现 flatten 函数。
- 简单改造下面的代码，使之分别打印 10 和 20。

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```

- 下面的代码打印什么内容，为什么？

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```

- 改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。

```js
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}
```

- 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？
- 介绍模块化发展历程
- 有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣
Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()
- 情人节福利题，如何实现一个 new

- 代码结果

```js
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```

- ES5/ES6 的继承除了写法以外还有什么区别？
- 请分别用深度优先思想和广度优先思想实现一个拷贝函数？
- 介绍下深度优先遍历和广度优先遍历，如何实现？
- 介绍下 Set、Map、WeakSet 和 WeakMap 的区别？
- 什么是防抖和节流？有什么区别？如何实现？
- ['1', '2', '3'].map(parseInt) what & why ?

- 写一个倒计时函数
- 写一个函数，第一次调用返回0，之后每次调用返回比之前大1
- 闭包、作用域的理解
- 实现一个bind函数

- one(add(two())) // 3 two(add(one())) // 3 写出 one() two() add()的实现
- ES6常用到哪些，对class的理解，手写一个对继承的实现

- class继承中子类想使用父类的方法，应该用什么方式调用(super的意义)
- class的实现 用原型写一个继承
- 什么是闭包，什么时候使用闭包，闭包会造成什么问题。callback是否为闭包
- 什么情况会造成内存泄露（setTimeout, setInterval）,还有呢？
- 给数组添加元素的方法
- ES6 新增的数组方法
- ES6 新增的数据结构，和 object 的区别
- ES6新增的四种集合

- 同时发送四个异步请求，但是需要顺序执行 1 -> 2 -> 3 -> 4 的返回结果， 如果1到了就执行1 ，如果2先到1没到则需要等待1执行完毕

- 利用 apply 实现 bind

```js
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}
```

### 参考

- [Promise](https://zhuanlan.zhihu.com/p/30797777)