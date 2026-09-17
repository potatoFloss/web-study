/**
 * 目标：基于 ECMAScript 标准语法，"默认"导入，工具属性和方法使用
 * 注意：
 *  - 由于Node.js中默认CommonJS标准，ECMAScript标准中的"默认"导出和导入在Node.js中不支持
 *  - 为了在Node.js中使用ECMAScript标准中的"默认"导出和导入，需要在使用这个的文件的当前文件夹中新建一个package.json文件，
 *    并在文件中添加以下内容：
 *    {
 *      "type": "module" // 表示使用ECMAScript标准
 *    }
 */
// 默认导入
/*
格式：
import 默认导出变量名 from './模块文件路径 或者 模块名'
*/
import obj from './utils.js'
console.log(obj)
const result = obj.arraySum([10, 20, 30])
console.log(result)