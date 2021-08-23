/**
 * 文件系统 （File System）
 * - 通过node操作系统中的文件
 * - 使用文件系统，需要先引入 fs核心模块，直接引入不需要下载
 * - 同步和异步调用
 *  - 同步文件系统会阻塞程序的执行，也就是除非操作完毕，否则不会向下执行代码
 *  - 异步文件系统不会阻塞程序的执行，而是在操作完成时，通过回调函数返回结果
 */
const fs = require('fs');

// 打开文件
var fd = fs.openSync('hello.md', 'w');

// 写入内容  2=> 写入的起始位置 encoding => 写入编码 utf-8
fs.writeSync(fd, '今天天气真不错....', 2);

// 关闭文件
fs.closeSync(fd);

console.log(fd);