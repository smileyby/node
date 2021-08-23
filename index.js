// var a = require('./module1.js');
// console.log(a);
// console.log(a.name);
// a.sayName();
// var math = require('math');
// console.log(math);
/**
 * 使用模块名称 引入模块时，会首先在当前 node_modules 中寻找，如果找到则直接使用，如果没有则向上一级目录寻找，直到找到为止，直到找到我们磁盘的根目录，依然没有则报错
 */
var express = require('express');
console.log(express);

