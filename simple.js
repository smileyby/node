// 简单文件写入
/**
 * flag: 
 * - w(覆盖写入)，文件不存在则创建
 * - a 打开文件用于追加
 * - r+ 读写，文件不存在就报错
 */
var fs = require('fs');
fs.writeFile('simple.txt', '简单写入', {flag: 'a'}, function(err){
  if (!err) {
    console.log('写入成功');
  }
});
