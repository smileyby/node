interview(function(err){
  if (err) {
    return console.log('cry at 1st round');
  }
  interview(function(err){
    if (err) {
      return console.log('cry at 2nd round');
    }

    interview(function(err){
      if (err) {
        return console.log('cry at 3rd round');
      }
      console.log('smile');
    });
  });
  
});

function interview(callback){
  setTimeout(() => {
    if (Math.random() > 0.2) {
      callback(undefined, 'success');
    } else {
      callback(new Error('fail'))
    }
  }, 500)
}