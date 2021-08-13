/**
 * Buffer(缓冲区)
 *  - buffer 的结构和数组很像，操作的方法也和数组类似
 *  - 数组中不能存储二进制文件，而buffer就是专门用来存储二进制数据
 *  - 在buffer中存储的都是二进制数据 （计算机总所有的二进制都会以16进制显示，因为二进制太长了）
 */

var str = 'hello';

var buf = Buffer.from(str);
console.log(buf.length);