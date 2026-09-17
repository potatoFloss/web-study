/**
 * 目标：基于 ECMAScript 标准语法，封装属性和方法并"默认"导出
 */
const baseURL = 'http://hmajax.itheima.net'
const getArraySum = arr => arr.reduce((sum, item) => sum += item, 0)

// 默认导出
/*
格式：
export default {
  属性名: 属性值,
  方法名: 方法值
}
*/
export default {
  url: baseURL,
  arraySum: getArraySum
}