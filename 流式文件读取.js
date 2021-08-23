var fs = require('fs');
var rs = fs.createReadStream('test.mp3');
var ws = fs.createWriteStream('a.mp3');

rs.once('open', function(){
  console.log('rs stream open');
})

rs.once('close', function(){
  console.log('rs stream close');
  // 数据读取完毕 关闭
  ws.end();
})

ws.once('open', function(){
  console.log('ws stream open');
})

ws.once('close', function(){
  console.log('ws stream close');
})

rs.on('data', function(data){
  // 每次最大读取 65536 字节 64kb
  // console.log(data.length);
  // 将读取到的数据写入到流中
  ws.write(data);
})