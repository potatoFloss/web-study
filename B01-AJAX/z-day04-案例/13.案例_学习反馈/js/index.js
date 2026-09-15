/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */
// 1.1 设置省份下拉菜单数据
axios({
  url: 'http://hmajax.itheima.net/api/province'
}).then(result => {
  // console.log(result)
  const provinceHtmlStr = result.data.list.map(pname => {
    return `<option value="${pname}">${pname}</option>`
  }).join('')
  document.querySelector('.province').innerHTML = `<option value="">省份</option>${provinceHtmlStr}`
})

// 1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
document.querySelector('.province').addEventListener('change', async function (e) {
  // console.log(e.target.value)
  // 获取对应城市的名字
  const result = await axios({
    url: 'http://hmajax.itheima.net/api/city',
    params: {
      pname: e.target.value
    }
  })
  const cityHtmlStr = result.data.list.map(cname => {
    return `<option value="${cname}">${cname}</option>`
  }).join('')
  // 渲染城市下拉菜单
  document.querySelector('.city').innerHTML = `<option value="">城市</option>${cityHtmlStr}`
  // 清空地区下拉菜单
  document.querySelector('.area').innerHTML = `<option value="">地区</option>`
})

// 1.3 切换城市，设置地区下拉菜单数据
document.querySelector('.city').addEventListener('change', async (e) => {
  // console.log(e.target.value)
  const pname = document.querySelector('.province').value
  const cname = e.target.value
  const result = await axios({
    url: 'http://hmajax.itheima.net/api/area',
    params: {
      pname,
      cname
    }
  })
  const areaHtmlStr = result.data.list.map(aname => {
    return `<option value="${aname}">${aname}</option>`
  }).join('')
  // 渲染地区下拉菜单
  document.querySelector('.area').innerHTML = `<option value="">地区</option>${areaHtmlStr}`
})

/**
 * 目标2：收集数据提交保存
 *  2.1 监听提交的点击事件
 *  2.2 依靠插件收集表单数据
 *  2.3 基于axios提交保存，显示结果
 */
document.querySelector('.submit').addEventListener('click', async () => {
  // 收集表单数据
  const form = document.querySelector('.info-form')
  const data = serialize(form, { hash: true, empty: true })
  try {
    const result = await axios({
      url: 'https://hmajax.itheima.net/api/feedback',
      method: 'POST',
      data
    })
    alert(result.data.message)
  } catch (error) {
    // console.dir(error)
    alert(error.response.data.message)
  }

})