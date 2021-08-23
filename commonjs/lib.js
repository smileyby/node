// console.log('hello shine');
// exports.shine = 'world';

// exports.add = function(a, b){
//   return a + b;
// }

// exports.geekbang = { hello: 'world' }

// module.exports = function minus(a, b){ // 修改module.exports 会覆盖掉之前再exports上的内容
//   return a - b;
// }

// setTimeout(() => {
//   console.log(exports);
// }, 2000)

module.exports = function game(playerAction){
  var random = Math.random() * 3;
  if (random < 1) {
    var computedAction = 'rock';
  } else if (random > 2) {
    var computedAction = 'scissor';
  } else {
    var computedAction = 'paper';
  }

  if (computedAction == playerAction) {
    console.log('平局');
    return 0;
  } else if (
    (computedAction === 'rock' && playerAction === 'paper') ||
    (computedAction === 'scissor' && playerAction === 'rock') ||
    (computedAction === 'paper' && playerAction === 'scissor')
  ) {
    console.log('你赢啦');
    return -1;
  } else {
    console.log('你输啦');
    return 1;
  }
}

