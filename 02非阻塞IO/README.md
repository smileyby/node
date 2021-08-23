nodejs的非阻塞I/O
1. I/O 就是input/output，一个系统的输入和输出
2. 阻塞I/O和非阻塞I/O的区别就在于系统接收输入再到输出期间，能不能接受其他输入


node 异步编程
1. 回调函数格式规范
  1.1 error-first callback
  1.2 Node-style callback
2. 第一个参数是 error，后面才是结果