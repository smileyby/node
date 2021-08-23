const glob = require('glob');
// var result = null;
// console.time();
// result = glob.sync(__dirname + '/**/*');
// console.timeEnd();
// console.log(result);

var result = null;
console.time('glob');
glob(__dirname + '/**/*', function(err, res){ // 通过回调函数来编程的方式就是异步编程
  result = res;
  console.log('got result');
});
console.timeEnd('glob');
console.log(1+2);
