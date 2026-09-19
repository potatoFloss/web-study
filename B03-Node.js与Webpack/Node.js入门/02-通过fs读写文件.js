/*
  fs模块：文件系统模块
*/
// 引入fs模块
const fs = require('fs')
// 写入文件
fs.writeFile('./text.txt', 'hello Node.js', (err) => {
  if (err) {
    console.log(err)
  }
})
// 读取文件
fs.readFile('./text.txt', (err, data) => {
  if (err) {
    console.log(err)
  }
  // data是buffer 16进制数据流对象
  console.log(data)
  console.log(data.toString())
})
