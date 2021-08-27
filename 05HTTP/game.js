module.exports = function(playerAction){
  var random = Math.random() * 3;
  if (random < 1) {
    var computedAction = 'rock';
  } else if (random > 2) {
    var computedAction = 'scissor';
  } else {
    var computedAction = 'paper';
  }

  if (computedAction == playerAction) {
    return 0;
  } else if (
    (computedAction === 'rock' && playerAction === 'paper') ||
    (computedAction === 'scissor' && playerAction === 'rock') ||
    (computedAction === 'paper' && playerAction === 'scissor')
  ) {
    return 1;
  } else {
    return -1;
  }
}