console.log(process.argv);
var playerAction = process.argv[process.argv.length - 1];
console.log(playerAction);

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
} else if (
  (computedAction === 'rock' && playerAction === 'paper') ||
  (computedAction === 'scissor' && playerAction === 'rock') ||
  (computedAction === 'paper' && playerAction === 'scissor')
) {
  console.log('你赢啦');
} else {
  console.log('你输啦');
}
