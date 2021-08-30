/**
 * httpserver 快速启动服务  npm包
 */
const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs');
const express = require('express');

const game = require('./game.js');

var playerWinCount = 0;
var lastPlayerAction = null;
var sameCount = 0;

const app = express();

app.get('/favicon.ico', function(request, response){
  response.status(200);
});

app.get('/game', 
  function(request, response, next){
    if (playerWinCount >= 3 || sameCount == 9) {
      response.status(500);
      response.send('我不会再玩了！');
      return;
    }
    
    next();

    if (response.playerWon) {
      playerWinCount++;
    }
  },
  function(request, response){
    const query = request.query;
    const playerAction = query.action;
    
    const gameResult = game(playerAction);
    lastPlayerAction = playerAction;

    if (!playerAction) {
      response.status(400);
      response.send('oh！');
      return;
    }

    if (lastPlayerAction == playerAction) {
      sameCount++;
      if (sameCount >= 3) {
        response.status(400);
        response.send('你作弊，我在也不和你玩了');
        sameCount = 9;
        return;
      }
    } else {
      samecount = 0;
    }

    if (playerWinCount >= 3) {
      response.status('500');
      response.send('再也不和你玩了！');
      return;
    }
    
    response.status('200');
    if (gameResult == 0) {
      response.send('平局');
    } else if (gameResult === 1) {
      response.send('你输啦');
    } else {
      response.send('你赢啦');
      playerWinCount += 1;
    }
  }
);

app.get('/', function(request, response){
  response.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
});

app.listen(3000);
