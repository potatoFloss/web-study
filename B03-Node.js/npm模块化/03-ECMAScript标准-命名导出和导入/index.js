/**
 * 目标：基于 ECMAScript 标准语法，"命名"导入，工具属性和方法使用
 */
// 命名导入
/*
格式：import {变量名} from './模块文件路径 或者 模块名'
*/
import { baseURL, getArraySum } from './utils.js'
console.log(obj)
console.log(baseURL)
console.log(getArraySum)
const result = getArraySum([10, 21, 33])
console.log(result)