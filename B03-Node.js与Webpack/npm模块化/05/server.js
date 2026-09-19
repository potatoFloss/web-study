/*
  npm软件包的使用：
    1. 查看文件夹中是否有package.json文件
    2. 如果没有，通过npm init命令，创建一个package.json文件
    3. npm i 软件包名，安装依赖包
    4. 在代码中引入依赖包
*/
const dayjs = require('dayjs')
const nowDateStr = dayjs().format('YYYY-MM-DD')
console.log(nowDateStr)
