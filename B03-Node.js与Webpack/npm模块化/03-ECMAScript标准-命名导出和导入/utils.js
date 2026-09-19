/**
 * 目标：基于 ECMAScript 标准语法，封装属性和方法并"命名"导出
 */
/*
格式：export const 变量名 = 值
适用于按需导出和导入
默认导出，可以一次性导出多个属性或方法
*/
export const baseURL = 'http://hmajax.itheima.net'
export const getArraySum = arr => arr.reduce((sum, item) => sum += item, 0)
