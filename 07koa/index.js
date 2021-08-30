/**
 * express vs koa
 * express 门槛更低，koa更强大优雅
 * express 封装更多东西，开发更快速，koa可定制型更高
 */
const fs = require('fs');
const game = require('./game.js');
const koa = require('koa');
const mount = require('koa-mount');

var playerWinCount = 0; // 玩家胜利次数，如果超过3，则后续该服务请求返回500
var lastPlayerAction = null; // 玩家上一次的游戏动作
var sameCount = 0; // 王佳连续出同一个动作的次数

const app = new koa();

app.use(
  mount('/favicon.ico', function(ctx){
    ctx.status = 200;
  })
)

const gameKoa = new koa();
gameKoa.use(
  async function(ctx, next){
    if (playerWinCount >= 3) {
      ctx.status(500);
      ctx.body = '我不会再玩了！';
      return;
    }

    await next();

    if (ctx.playerWon) {
      playerWinCount++;
    }
  }
);

gameKoa.use(
  async function(ctx, next){
    const query = ctx.query;
    const playerAction = query.action;
    ctx.playerAction = playerAction;
    if (!playerAction) {
      ctx.status = 400;
      return;
    }

    if (sameCount == 9) {
      ctx.status = 500;
      ctx.body = '我不会在玩了'
    }

    if (lastPlayerAction == playerAction) {
      sameCount++;
      if (sameCount >= 3) {
        ctx.stauts = 400;
        ctx.body = '你作弊，我再也不玩了！';
        sameCount= 9;
        return;
      }
    } else {
      sameCount = 0;
    }
    lastPlayerAction = playerAction;
    ctx.playerAction = playerAction;
    await next();
  }
)

gameKoa.use(
  async function(ctx, next){
    const playerAction = ctx.playerAction;
    const result = game(playerAction);

    await new Promise((resolve) => {
      setTimeout(() => {
        ctx.status = 200;
        if (result == 0) {
          ctx.body = '平局';
        } else if (result == -1) {
          ctx.body = '你输了';
        } else {
          ctx.body = '你赢了';
        }
        resolve();
      })
    }, 500)
  }
)

app.use(
  mount(
    '/game',
    gameKoa
  )
);

app.use(
  mount('/', function(ctx){
    ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8');
  })
);

app.listen(3000);
