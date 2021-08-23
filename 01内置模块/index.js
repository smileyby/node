// EventEmitter
// 观察者模式
const Geektime = require('./lib.js');
const geektime = new Geektime;
geektime.addListener('newlesson', (res) => {
  if (res.price < 80) {
    console.log('buy!', res);
  }
})