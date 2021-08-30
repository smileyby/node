const net = require('net');
const data = [
  {0: 0.7991442401213242},
  {1: 0.46914413812900935},
  {2: 0.8087882378632092},
  {3: 0.011672343086990056},
  {4: 0.15362798173012981},
  {5: 0.8874065608358557},
  {6: 0.9752381135775474},
  {7: 0.6485957785306904},
  {8: 0.4248299837980525},
  {9: 0.9372886592640566}
]
const server = net.createServer((socket) => {
  socket.on('data', function(buffer){
    const lessonid = buffer.readInt16BE();
    setTimeout(()=>{
      buffer.write(
        Buffer.from(data[lessonid])
      )
    }, 500)
  })
})

server.listen(4000);