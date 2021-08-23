try {
  // 此处try catch 是不能捕获到 setTimeout内抛出的错误的
  interview(function(res){
    if (res instanceof Error) {
      return console.log('cry', res);
    }
    console.log('smile');
  });
} catch(err) {
  console.log('cry', err);
}

function interview(callback){
  setTimeout(() => {
    if (Math.random() < 0.8) {
      callback('success');
    } else {
      // throw new Error('fail'); 
      callback(new Error('fail'))
    }
  }, 500)
}