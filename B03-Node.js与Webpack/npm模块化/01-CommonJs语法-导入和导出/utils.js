/**
 * 目标：基于 CommonJS 标准语法，封装属性和方法并导出
 */
const baseURL = 'http://hmajax.itheima.net'
const getArraySum = arr => arr.reduce((sum, item) => sum += item, 0)

// 导出
/*
格式：
module.exports = {
  属性名: 属性值,
  方法名: 方法值
}
*/
module.exports = {
  baseURL,
  getArraySum
}
