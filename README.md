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

Promise
=======

学习资料：

1.	[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)(基础)
2.	[http://liubin.org/promises-book/](http://liubin.org/promises-book/ )(开源Promise迷你书)
3.	[http://fex.baidu.com/blog/2015/07/we-have-a-problem-with-promises/](http://fex.baidu.com/blog/2015/07/we-have-a-problem-with-promises/)(进阶)
4.	[https://promisesaplus.com/](https://promisesaplus.com/)(官方定义规范)

深入Promise
==========

*	[深入 Promise(一)——Promise 实现详解](https://zhuanlan.zhihu.com/p/25178630)
*	[深入 Promise(二)——进击的 Promise](https://zhuanlan.zhihu.com/p/25198178)
*	[深入 Promise(三)——命名 Promise](https://zhuanlan.zhihu.com/p/25199781)

环境变量
=======

环境变量不属于Node.js的知识范畴，只不过我们在开发Node.js应用时经常与环境变量打交道，所以这里简单介绍下。

环境变量（environment variables）一般是指在操作系统中用来指定操作系统运行环境的一些参数。在Mac和Linux的终端直接输入env，会列出当前的环境变量，如：USER=xxx。简单来讲，环境变量就是传递参数给运行程序的。

在Node.js中，我们经常这么用：

```js
	NODE_ENV = test node app
```

通过以上命令启动程序，指定当前环境变量 `NODE_ENV` 的值为test，那么在app.js 中可通过 `process.env` 来获取环境变量

```js
	console.log(process.env.NODE_ENV) // test
```

另一个常见的例子是使用[debug](https://www.npmjs.com/package/debug)模块时：

```js
	DEBUG=* node app
```

Windows 用户需要首先设置环境变量，然后在执行程序：

```js

	set DEBUG=*
	set NODE_ENV=test
	node app

```

或者使用[cross-env](https://www.npmjs.com/package/cross-env)：

```js
	npm i cross-env -g
```

使用方式：

```js
	cross-env NODE_ENV=test node app
```

package.json
============

package.json 对于Node.js 应用来说是一个不可或缺的文件，它存储了该Node.js应用的名字、版本、描述、作者、入口文件、脚本、版权等等信息。npm官网有package.json每个字段的详细介绍：[https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json)。

## semver

语义化版本（semver）即dependencies、devDependencies和peerDependencies里的如："co":"^4.6.0"。

semver格式：`主版本号·次版本号·修订号`。版本号递增规则如下：
*	`主版本号`：做了不兼容的API修改
*	`次版本号`：做了向下兼容的功能性修改
*	`修订号`：做了向下兼容的bug修改

更多阅读：

1.	[http://semver.org/lang/zh-CN/](http://semver.org/lang/zh-CN/)
2.	[http://taobaofed.org/blog/2016/08/04/instructions-of-semver/](http://taobaofed.org/blog/2016/08/04/instructions-of-semver/)

作为Node.js的开发者，我们在发布npm模块的时候一定要遵循语义化版本的命名规则，即：有breaking change发大的版本，有新增的功能发小的版本，有效的gub修复或优化则发修订版本。




