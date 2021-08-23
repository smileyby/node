var fs = require('fs');
fs.open('hello.txt', 'w', function(err, fd){
  if (!err) {
    fs.write(fd, '今天天气真好...', function(err){
      if (!err) {
        fs.close(fd, function(err){
          console.log(err);
        });
      }
    })
  }
})