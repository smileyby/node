/**
 * httpserver 快速启动服务  npm包
 */
const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs');

const game = require('./game.js');

let playerWon = 0;

http.createServer(function(request, response){
  const parseUrl = url.parse(request.url);
  if (parseUrl.pathname === '/favicon.ico') {
    response.writeHead('200');
    response.end('hello');
    return;
  }
  
  if (parseUrl.pathname == '/game') {
    const query = querystring.parse(parseUrl.query);
    const playerAction = query.action;
    const gameResult = game(playerAction);

    if (playerWon >= 3) {
      response.writeHead('500');
      response.end('再也不和你玩了！');
    }

    response.writeHead('200');
    if (gameResult == 0) {
      response.end('平局');
    } else if (gameResult === 1) {
      response.end('你输啦');
    } else {
      response.end('你赢啦');
      playerWon += 1;
    }
    response.end();
  }

  if (parseUrl.pathname == '/') {
    fs.createReadStream(__dirname + '/index.html').pipe(response);
  }
}).listen(3000);