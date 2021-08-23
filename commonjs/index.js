// console.log('start require');
// var lib = require('./lib.js');
// console.log('end require', lib);

// lib.additional = 'test'; // 此处的lib与lib.js 中的exports是同一个引用

var playerAction = process.argv[process.argv.length - 1];
const game = require('./lib.js');

let count = 0;
process.stdin.on('data', e => {
  const playerAction = e.toString().trim();
  const result = game(playerAction);
  console.log({result});
  if (result == -1) {
    count++;
  }

  if (count === 3) {
    console.log('你太厉害了');
    process.exit();
  }
})
