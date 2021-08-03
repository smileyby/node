/**
 * 在node中，通过require() 函数引入外部的模块
 * require() 可以传递一个文件的路径作为参数，node将会自动根据该路径引用外部模块
 * 这里路径如果是相对路径，必须以.或..开头
 * 
 * 使用require() 引入模块以后，该函数会返回一个对象，这个对象代表的是引入的模块
 * 我们使用 require() 引入外部模块时，使用的就是模块标识，我们可以通过模块标识来找到指定的模块
 * 
 * 当node在执行模块中的代码时，它会现在代码的最顶部添加如下代码
 * function (exports, require, module, __filename, __dirname) {
 * 
 * }
 * 
 * 实际上我们模块中的代码，都是包装在函数中执行的，并且在函数执行是，同时传递了5个实参
 * exports
 *  - 该对象用来将变量函数暴露到外部 
 * require, 
 *  - 函数用来引入外部模块
 * module, 
 *  - 代表当前函数本身
 *  - exports就是module的属性
 *  - exports 和 module.exports  本质上是一样的，指向的是同一个对象
 * __filename,
 *  - 当前模块的完整路径
 * __dirname
 *  - 当前模块所在文件夹的完整路径
 */
var math = require('./math.js');
console.log(math.add(1,2));
console.log(arguments.callee+'');