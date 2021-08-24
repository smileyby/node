/**
 * promise：当前时间循环得不到结果，但未来的事件循环会给你结果
 * 状态：pending fulfilled/resolved  rejected
 * 执行then和catch 会返回一个新的Promise，改Promise最终状态根据then和catch的回调函数的执行结果决定
 * 如果回调函数最终throw，该Promise是rejected状态
 * 如果回调函数最终是return，该Promise是resolved状态
 * 
 * 
 * async / await  
 * async function 是Promise的语法糖封装
 * 异步变成的终极方案 - 以同步的方式写异步
 *  await 关键字可以暂停 async function 的执行
 *  await 关键字 可以以同步的写法获取 Promise结果
 *  try-catch 可以获取 await 所得到的错误
 */
// (function(){
//   var promise = interview();
//   promise
//     .then(() => {
//       console.log('smile');
//     })
//     .catch(() => {
//       console.log('cry');
//     })
//   function interview(){
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (Math.random() < 0.8) {
//           resolve('success');
//         } else {
//           reject(new Error('fail'))
//         }
//       }, 500)
//     })
//   }
// })()

(async function(){
  try {
    // await interview(1);
    // await interview(2);
    // await interview(3);

    await Promise.all([interview(1), interview(2), interview(3)])
  } catch(e) {
    return console.log('cry at' + e.round);
  }
  console.log('smile');
})()

function interview(round){

}