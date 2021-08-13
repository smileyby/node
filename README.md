* dir 列出当前目录下的所有文件
* cd 目录名  进入到指定的目录
* md 目录名  创建一个文件夹
* rd 目录名  删除一个文件夹

当我们在命令行窗口打开一个文件，或调用一个程序时

- 系统会首先在当前目录下寻找文件会程序
  - 找到直接打开
  - 没有则会依次到环境变量path的路径中寻找，直到找到为止，没找到就报错
- 进程和线程
  - 进程：负责给程序运行提供必备的环境
  - 线程：线程负责执行进程中的程序
  - 单线程：js
  - 多线程：主流语言都是多线程

node.js 是一个能够在服务器运行JavaScript的开发源代码跨平台JavaScript运行环境

* 文件夹内，路径处直接从输入 cmd 回车快速打开当前目录下命令行窗口

> exports 和 module.exports 区别

* 通过exports只能使用 . 的方式来向外暴露内部变量
  * exports.xxx = xxx
* 那module.exports既可以通过 . 的形式，也可以直接赋值
  * module.exports.xxx = xxx
  * module.exports = {}

> 包结构

* package.json: 描述文件
* bin：可执行二进制文件
* lib：js代码
* doc：文档
* test：单元测试

> npm

* npm version 查看版本
* npm seaarch 关键词 搜索包
* npm init  初始化
* npm install --save 安装包并添加到依赖中
* npm install -g 全局安装
* npm install 下载当前项目的全部依赖

```javascript
// 检查文件是否存在
fs.existsSync(path); 

// 获取文件信息
fs.stat(path, callback); 
fs.statSync(path); 

// 删除文件
fs.unlink(path, callback);
fs.unlinkSync(path);

// 列出文件
fs.readdir(path[, options], callback);
fs.readdirSync(path[, options]);

// 截断文件
fs.truncate(path, len, callback);
fs.truncateSync(path, len);

// 建立目录
fs.mkdir(path[, mode], callback);
fs.mkdirSync(path[, mode]);

// 删除陌路
fs.rmdir(path, callback);
fs.rmdirSync(path)

// 重命名文件和目录
fs.rename(oldPath, newPath, callback);
fs.renameSync(oldPath, newPath);

// 见识文件更改写入
fs.watchFile(filename[, options], listener);

```

