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

![](/img/2.2.1.png)

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



npm 使用注意事项
==============

## npm init 

使用`npm init`初始化一个空项目是一个好习惯，即使你对package.json及其他属性非常熟悉，`npm init`页是你开始写新的Node.js 应用或模块的一个快捷办法。`npm init` 有智能的默认选项，比如从根目录名称腿短模块名称，通过`~/.npmrc`
读取你的信息，用你的Git设置来确定repository等等。

## npm install

`npm install` 是我们最常用的npm命令之一，因此我们需要好好了解下这个命令。终端输入`npm install -h`查看使用方式：

![](/img/2.6.1.png)

可以看出：我们通过 `npm install`可以安装npm上发布的某个版本、某个tag、某个版本区间的模块，甚至可以安装本地目录、压缩包和git/github的库作为依赖。

> 小提示：`npm i`是`npm install`的简写，建议使用 `npm i`。

直接使用`npm i` 安装的模块时不会写入package.json的dependencies（或devDependencies），需要额外加个参数：

1.	`npm i express --save`/`npm i express -S`（安装express，同时将`"express":"^4.14.0"`写入dependencies）
2.	`npm i express --save-dev`/`npm i express -D`（安装express，同时将`"express":"^4.14.0"`写入devDependencies）
3.	`npm i express --save --save-exact` （安装express，同时将`"express":"4.14.0"`写入dependencies）

第三种方式将固定版本号写入dependencies，建议线上的Node.js应用都采取这种锁定版本号的方式，因为你不可能保证第三方模块下个小版本是没哟验证bug的，即使是流行的模块。拿Mongoose来说，Mongoose 4.1.4引入了一个bug导致调用一个文档entry的remove会删除整个集合的文档，见[https://github.com/Automattic/mongoose/blob/master/History.md#415--2015-09-01](https://github.com/Automattic/mongoose/blob/master/History.md#415--2015-09-01)

> 后面会介绍更安全的 `npm shrinkwrap`的用法

运行以下命令：

```

npm config set save-exact true 

```

这样每次 `npm i xxx --save` 的时候会锁定依赖的版本号，相当于加了 `--save-exact` 参数。

> 小提示：`npm config set` 命令将配置写到了 ~/.npmrc 文件，运行 `npm config list` 查看。

## npm scripts

npm 提供了灵活而强大的 scripts 功能，见 [官方文档](https://docs.npmjs.com/misc/scripts)。

npm 的 scripts 有一些内置的缩写命令，如常用的：

- `npm start` 等价于 `npm run start` 
- `npm test` 等价于 `npm run test` 

## npm shrinkwrap

前面说过要锁定依赖的版本，但这并不能完全防止意外情况的发生，因为锁定的只是最外一层的依赖，而里层依赖的模块的 package.json 有可能写的是 `"mongoose": "*"`。为了彻底锁定依赖的版本，让你的应用在任何机器上安装的都是同样版本的模块（不管嵌套多少层），通过运行 `npm shrinkwrap`，会在当前目录下产生一个 `npm-shrinkwrap.json`，里面包含了通过 node_modules 计算出的模块的依赖树及版本。上面的截图也显示：只要目录下有 npm-shrinkwrap.json 则运行 `npm install` 的时候会优先使用 npm-shrinkwrap.json 进行安装，没有则使用 package.json 进行安装。

更多阅读：

1. https://docs.npmjs.com/cli/shrinkwrap
2. http://tech.meituan.com/npm-shrinkwrap.html

> 注意: 如果 node_modules 下存在某个模块（如直接通过 `npm install xxx` 安装的）而 package.json 中没有，运行 `npm shrinkwrap` 则会报错。另外，`npm shrinkwrap` 只会生成 dependencies 的依赖，不会生成 devDependencies 的。

## 初始化一个Express项目

首先，我们新建一个目录myblog，在改目录下运行`npm init` 生成一个package.json，如下所示：

![](/img/3.1.1.png)

> 注意：括号里的是默认值，如果使用默认值则直接回车即可，否则输入自定义内容后回车。

然后安装express并写入package.json:

```

npm i express@4.14.0 --save

```

新建index.js,添加如下代码：

```

	var express = require('express');
	var app = express();

	app.get('/', function(req, res) {
		res.send('hello, express');
	});

	app.listen(3000);

```

以上代码的意思是：生成一个express实例app，挂载一个根路由器控制器，然后监听3000端口并启动程序。运行`node index`，打开浏览器访问 `localhost:3000`时，页面应显示 hello，express。

这是一个最简单的一个使用费express的例子，后面会介绍路由及模板的使用。

## supervisor

在开发过程中，每次修改代码保存后，我们需要手动重启程序，才能查看改动的效果。使用[supervisor](https://www.npmjs.com/package/supervisor)可以解决这个繁琐的问题，全局安装supervisor：

```
	
	npm install -g supervisor

```

运行 `supervisor --harmony index`启动程序，如下所示：

![](/img/3.1.2.png)

supervisor 会监听当前目录下node和js后缀的文件，这些文件发生改动是，suoervisor会自动重启程序。

## 路由

前面我们只是挂载了根路径的路由控制器，现在修改index.js如下：

```

	var express = require('express');
	var app = express();
	
	app.get('/', function(req, res) {
		res.send('hello, express');
	});
	
	app.get('/users/:name', function(req, res) {
		res.send('hello, ' + req.parmas.name);
	});
	
	app.listen(3000);

```

以上代码的意思是：当访问根路径是，依然返回hello，express，当访问如 `localhost:3000/user/username` 路径时，返回hello，username。路径中`:name`起了占位符的作用，这个占位符的名字是name，可以通过`req.params.name`渠道实际的值。

> 小提示： expressshiyong1le1[path-to-regexp](https://www.npmjs.com/package/path-to-regexp)模块实现的路由匹配。

不难看出：req包含了请求来的县关系新，res则用来返回请求的响应，更多请查阅[express官方文档](http://expressjs.com/en/4x/api.html)。下面介绍几个常用的req的属性：

*	`req.query`：解析后的url中的querystring，如`?name=haha`，req.query的值为`{name: 'haha'}`
*	`req.params`：解析url中的占位符，如`/:name`，访问/haha,req.params的值为`{name:'haha'}`
*	`req.body`：解析后请求体，需使用相关的模块，如[body-parser](https://www.npmjs.com/package/body-parser)，请求体为`{"name", "haha"}，则req.body`为`{name: 'haha'}`

## express.Router

上面只是很简单的路由使用的例子（将所有的路由控制函数都放到了index.js），但在实际开发中通常有几十甚至上百的路由，都写在index.js既臃肿又不好维护，这时可以使用express.Router实现更优雅的路由解决方案。在myblog目录下创建空文件夹routes，在routes目录下创建index.js和user.js。最后代码如下：

#### index.js

```

	var express = require('express');
	var app = express();
	var indexRouter = require('./routes/index');
	var userRouter = require('./routes/users');
	
	app.use('/', indexRouter);
	app.use('./users'. userRouter);
	
	app.listen(3000)

```

#### routes/index.js

```

	var express = require('express');
	var router = express.Router();
	
	router.get('/', function(req, res) {
		res.send('hello, express');
	});

	module.exports = router;

```

#### routes/user.js

```

	var express = require('express');
	var	router = express.Router();
	 
	touter.get('/:name', function(req, res) {
		res.send('hello, ' + req.params.name);	
	});
	
	module.exports = router;

```

以上代码的意思是：我们将`/`和`/users/:name`的路由分别都放在routes/index.js和routes/users.js中，每个路由文件通过生成一个express.Router实例router并导出，通过`app.use`挂载到不同的路径。这两种代码实现了相同的功能，但在实际开发中推荐使用express.Router将不同的路由分离到不同的路由文件中。

## 模板引擎

模板引擎（Template Engine）是一个将页面模板和数据结合起来生成html的工具。上例中，我们只是返回纯文本给浏览器，现在我们修改代码返回一个html页面给浏览器。

#### ejs

模板引擎有很多， [ejs](https://www.npmjs.com/package/ejs) 是其中一种，因为它使用起来十分简单，而且与express集成良好，所以我们使用ejs。安装ejs：

```

	npm i ejs --save

```

修改index.js如下：

```

	var path = require('path');
	var express = require('express');
	var app = express();
	var indexRouter = require('./routes/index');
	var userRouter = require('./routes/users');
	
	app.set('views', path.join(_dirname, 'views')); //设置存放模板的目录
	app.set('view engine', 'ejs'); // 修改模板引擎为ejs
	
	app.use('/', indexRouter);
	app.use('/users', useRouter);
	
	app.listen(3000);

```

通过`app.set`设置模板引擎为ejs和存放模板的目录。在myblog下新建views文件夹，在views下新建users.ejs，添加如下代码：

#### views/user.ejs

```

	var express = require('express');
	var router = express.Router();
	
	router.get('/:name', function(req, res) {
		res.render('users', {
			name: req.params.name
		});
	});
	
	module.exports = router;

```

通过调用`res.render`函数渲染ejs模板，res.render第一个参数是模板的名字，这里是users则会匹配view/users.ejs，第二个参数是传给模板的数据，这里传入name，则在ejs模板中可使用name。`res.render`的作用就是将模板和数据结合生成html，同事设置响应头中的 `Content-Type: text/html`,告诉浏览器我返回的是html，不是纯文本，要按html展示。现在我们访问`localhost:3000/user/haha`,如下所示：

![](/img/3.3.1.png)

上面代码可以看到，我们在模板`<%= name.toUpperCase() %>`中使用了JavaScript的语法`.toUpperCase()`将名字转化成大写，那这个`<%= xxx %>`是什么东西呢？ejs有三种常用标签：

1.	`<% code %>`：运行JavaScript代码，不输出
2.	`<%= code %>`：显示转以后的HTML内容
3.	`<%- code %>`：显示原始HTML内容

> 注意：`<%= code %>`和`<%- code %>`都可以是JavaScript表达式生成的字符串，当变量code为普通字符串时，两者没有区别。当code比如为`<h1>hello</h1>`这种字符串时，`<%= code %>`会原样输出`<h1>hello</h1>`，而`<%- code %>`则会显示H1大的hello字符串。

下面的例子解释了`<% code %>`的用法：

#### Data

```

	supplies: ['mop', 'broom', 'duster']

```

#### Template

```

	<ul>
		<% for(var i = 0; i<supplies.length; i++) { %>
			<li><%= supplies[i] %></li>
		<% } %>
	</ul>

```

#### Result

```html
	
	<ul>
		<li>mop</li>
		<li>broom</li>
		<li>duster</li>
	</ul>

```

更多ejs的标签请看[官方文档](https://www.npmjs.com/package/ejs#tags)

## includes

我们使用模板引擎同城不是一个页面对应一个模板，这样就失去了模板的有事，而是把模板拆成可复用的模板片段组合使用，如在views下新建header.js和footer.ejs，并修改users.ejs：

#### view/header.ejs

```html

	<!DOCTYPE html>
	<html>
		<head>
			<style type="text/css">
				body {padding: 50px;font: 14px "Lucida Grande", helvetica, Arial, sans-serif;}
			</style>
		</head>
		<body>

```

#### views/footer.ejs

```html

		</body>
	</html>

```

#### views/user.ejs

```

	<%- include('header') %>
		<h1><%= name.toUpperCase() %></h1>
		<p>hello, <%= name %></p>
	<%- include('footer') %>

```

我们将原来的users.ejs拆成了header.ejs和footer.ejs，并在users.ejs内置的include方法引入，从而实现了跟前一个模板文件相同的功能。

> 小提示：拆分模板组件通常有两个好处：
> * 模板可复用，减少重复代码
> * 柱模板结构清晰
> * 注意：要用`<%- include('header') %>`而不是`<%= include('header') %>`





















