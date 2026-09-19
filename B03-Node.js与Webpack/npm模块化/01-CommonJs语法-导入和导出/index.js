/**
 * 目标：基于 CommonJS 标准语法，导入工具属性和方法使用
 */
// 导入
/*
内置模块导入写模块名，例如：http、fs、path等。
自定义模块，写模块文件路径。例如：require('./utils.js')
*/
const obj = require('./utils.js')
console.log(obj)
console.log(obj.baseURL)
const result = obj.getArraySum([5, 1, 2, 3])
console.log(result)