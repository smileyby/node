var fs = require('fs');
var rs = fs.createReadStream('test.mp3');
var ws = fs.createWriteStream('b.mp3');

// pipe 可以将可读流中的内容，直接输出到可写流中
rs.pipe(ws);