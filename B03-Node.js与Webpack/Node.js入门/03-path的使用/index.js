/*
  目标：在node.js环境的代码中，应使用绝对路径
  原因：代码的相对路径是以终端所在的文件夹为基准的，而不是当前文件所在的位置
    如果使用相对路径，容易造成目标文件找不到的错误
  解决：使用绝对路径
*/
const fs = require('fs')

// 使用相对路径，找不到文件 open 'D:\04web-learning\web-study\text.txt'
// fs.readFile('../text.txt', (err, data) => {

// 使用绝对路径
// 1. 引入path模块
const path = require('path')
// 2. 调用path.join() 配合 __dirname 组成目标文件的绝对路径
// __dirname 是当前文件所在的位置
fs.readFile(path.join(__dirname, '../text.txt'), (err, data) => {
  if (err) {
    console.log(err)
  }
  console.log(data.toString())
})