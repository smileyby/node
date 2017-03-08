require
=======

require用加载一个文件的代码，关于require的机制这里不展开讲解，请仔细阅读[官方文档](https://nodejs.org/api/modules.html)。

简单开阔一下几点：

*	require可加载.js/.json/.node后缀的文件
*	require的过程中是同步的，所以这样是错误的

```javascript

	setTimeout(() => {
		module.exports = {a: 'hello'};
	}, 0)

```

require这个文件得到的是空对象 {}

*	require目录的机制是：
	*	如果目录下有package.json并指定了main字段，则用之
	*	如果不存在package.json，则依次尝试加载目录下的index.js和index.node
*	require过的文件会加载到缓存，所以多次require同一个文件（模块）不会重复加载
*	判断是否是程序的入口有两种方式
	*	require.main === module (推荐)
	*	module.parent === null

#### 循环引用

循环引用（或循环以来）简单点来说就是a文件require了b文件，然后b文件有反过来require了a文件。我们用a->b代表brequire了a。

简单的情况：

```js
	
	a->b
	b->a

```

复杂点的情况：

```js
	
	a->b
	b->c
	c->a

```

循环引用并不会报错，导致的结果是require的结果是空对象{}，原因是b require了a，a又去require了b，此时b还没初始化，所以只能拿到初始值{}。当产生循环引用时，一般有两种解决办法：

1.	通过分离公用的代码到另一个文件解决，如果上面简单的情况的话，可拆出公用的代码到c中，如下：

```js

	c->a
	c->b

```

2.	不在最外层require，在用到的地方require，通常在函数的内部

总的来说，循环以来的陷阱并不容易出现，但一旦出现了，对于新手来说还真不好定位。它的存在给大家提了个醒，要时刻注意你项目的一览关系，不要过于复杂，那一天你发现一个你明明已经exports的方法报：undefined is not a function，我们就该提醒下自己：哦，也许是它来了。

exports和module.exports
=======================

require用来加载代码，而exports和module.exports则用来到处代码。
很多新手可能米或与exports和module.exports的区别，为了更好的理解export和module.exports的关系，我们先来巩固下js的基础。示例：

```js
	
	var a = {name: 1};
	var b = a;
	
	console.log(a);
	console.log(b);
	
	b.name = 2;
	console.log(a);
	console.log(b);
	
	var b = {name: 3};
	console.log(a);
	console.log(b);

```

运行js的结果：

```js

	{ name: 1 }
	{ name: 1 }
	{ name: 2 }
	{ name: 2 }
	{ name: 2 }
	{ name: 3 }

```

解释：a是一个对象，b是对a的引用，即a和b指向同一块内存，所以前两个输出一样。当对a做修改时，即a和b指向同一块内存地址的内容发生了改变，所以a也会体现出来，所以第三四个输出一样。当b被覆盖时，b指向了一块新的内存，a还是指向原来的内存。所以最后连个输出不一样。

明白了上述例子后，我们只需要知道三点就知道export和module.exports的区别了：

1.	module.exports初始值为一个空对象{}
2.	exports是指向的module.exports的引用
3.	erquire()返回的是module.exports而不是exports

Node.js官网文档的截图正式了我们的观点

![](2.2.1.png)

exports = module.exports = {...}

我们经常看到这样的写法：

```js

	exports = module.exports = {...}

```

上面的代码等价于：

```js

	module.exports = {...}
	exports = module.exports

```

原理很简单，：module.exports指向新的对象时，exports断开月module.exports的引用，那么通过exports = module.exports 让exports重新指向module.exports。


