/**
 * 1. 同步文件读取
 * 2. 异步文件读取
 * 3. 简单文件读取
 * 4. 流式文件写入
 */
var fs = require('fs');
var path = 'C:/Users/YJYZ/Desktop/test/test.mp3';
fs.readFile(path, function(err, data){
  if (!err) {
    // 将data写入到文件中
    fs.writeFile('hello.mp3', data, function(err){
      if (!err) {
        console.log('文件写入成功！');
      }
    })
  }
});