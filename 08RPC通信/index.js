// const buffer1 = Buffer.form('abcd');

const fs = require('fs');
const protobuf = require('protocol-buffers');
const schema = protobuf(fs.readFileSync(__dirname + '/test.proto', 'utf-8'));

console.log(schema);
const buffer = schema.Column.encode({
  id: 1,
  name: 'node',
  price: 80.4
})
console.log(schema.Column.decode(buffer));
