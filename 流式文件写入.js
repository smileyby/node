var fs = require('fs');

// 创建一个可写流
var ws = fs.createWriteStream('hello.txt');

// on 绑定事件
// once 绑定一次性事件

ws.once('open', function(){
  console.log('流打开了');
});

ws.once('close', function(){
  console.log('流关闭了');
});

ws.write('2021鱼鱼鱼月鱼鱼鱼月鱼鱼鱼月鱼鱼鱼月鱼鱼鱼月鱼鱼鱼月鱼鱼鱼月鱼鱼鱼月鱼鱼鱼月鱼鱼鱼月鱼鱼鱼月');
ws.write('hahaha');
ws.write('鱼鱼鱼月');
ws.write('2021');
ws.write('hahaha');
ws.write('鱼鱼鱼月');

ws.end();

