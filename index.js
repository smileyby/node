const koa = require('koa');
const mount = require('koa-mount');
const static = require('koa-static');
const fs = require('fs');

const app = new koa();

// 匹配静态文件路径并输出
app.use(
  static(__dirname + '/source/')
)

app.use(
  mount('/', async (ctx) => {
    ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8')
  })
);

app.listen(3000);