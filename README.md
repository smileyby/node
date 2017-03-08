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
