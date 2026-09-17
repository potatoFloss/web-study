/**
 * 目标1：设置频道下拉菜单
 *  1.1 获取频道列表数据
 *  1.2 展示到下拉菜单中
 */
// 根据网页机构，我们发现，在“发布文章”和“内容管理”页面，都有频道下拉菜单
// 所以，把获取频道列表数据的代码，封装到一个函数中
async function getChannelList() {
  const res = await axios({
    url: '/v1_0/channels'
  })
  const channelOptionsStr = res.data.channels.map(item => {
    return `<option value="${item.id}">${item.name}</option>`
  }).join('')
  document.querySelector('.form-select').innerHTML = `<option value="" selected="">请选择文章频道</option>${channelOptionsStr}`
}
getChannelList()

/**
 * 目标2：文章封面设置
 *  2.1 准备标签结构和样式
 *  2.2 选择文件并保存在 FormData
 *  2.3 单独上传图片并得到图片 URL 网址
 *  2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
 */
document.querySelector('.img-file').addEventListener('change', async function (e) {
  // 获取图片文件
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('image', file)
  // 上传到服务器
  const res = await axios({
    url: '/v1_0/upload',
    method: 'POST',
    data: formData
  })
  // console.log(res)
  // 得到图片url地址
  const imgUrl = res.data.url
  // 2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
  document.querySelector('.rounded').src = imgUrl
  document.querySelector('.rounded').classList.add('show')
  document.querySelector('.place').classList.add('hide')
})

// 优化，用户点击已有的图片，重新选择新图片
document.querySelector('.rounded').addEventListener('click', function () {
  // 触发文件选择元素的 click 事件方法
  document.querySelector('.img-file').click()
})

/**
 * 目标3：发布文章保存
 *  3.1 基于 form-serialize 插件收集表单数据对象
 *  3.2 基于 axios 提交到服务器保存
 *  3.3 调用 Alert 警告框反馈结果给用户
 *  3.4 重置表单并跳转到列表页
 */
document.querySelector('.send').addEventListener('click', async function () {
  // 判断，如果不是发布文章，就return
  if (this.innerHTML !== '发布') {
    return
  }
  // 3.1 基于 form-serialize 插件收集表单数据对象
  const form = document.querySelector('.art-form')
  const formData = serialize(form, { hash: true, empty: true })
  delete formData.id
  formData.cover = {
    type: 1,
    images: [document.querySelector('.rounded').src]
  }
  try {
    // 3.2 基于 axios 提交到服务器保存
    const res = await axios({
      url: '/v1_0/mp/articles',
      method: 'POST',
      data: formData
    })
    // console.log(res)
    // 3.3 调用 Alert 警告框反馈结果给用户
    myAlert(true, '发布成功')

    // 3.4 重置表单并跳转到列表页
    form.reset()
    editor.setHtml('')
    document.querySelector('.rounded').src = ''
    document.querySelector('.rounded').classList.remove('show')
    document.querySelector('.place').classList.remove('hide')
    setTimeout(() => {
      location.href = '../content/index.html'
    }, 1000)
  } catch (error) {
    // console.dir(error)
    myAlert(false, error.response.data.message)
  }
})

  /**
   * 目标4：编辑-回显文章
   *  4.1 页面跳转传参（URL 查询参数方式）
   *  4.2 发布文章页面接收参数判断（共用同一套表单）
   *  4.3 修改标题和按钮文字
   *  4.4 获取文章详情数据并回显表单
   */
  // 为了避免数据污染，所以使用立即执行函数
  ; (function () {
    // 获取 URL 的查询参数
    // console.log(location.search)
    const paramsStr = location.search
    const params = new URLSearchParams(paramsStr)
    params.forEach(async (value, key) => {
      if (key === 'id') {
        // 说明是编辑文章
        document.querySelector('.title span').innerHTML = '编辑文章'
        document.querySelector('.send').innerHTML = '保存修改'

        // 获取文章详情数据并回显表单
        const res = await axios({
          url: `/v1_0/mp/articles/${value}`,
        })
        console.log(res)
        // 组织我需要的数据对象，为后续遍历回显到页面上做铺垫
        const dataObj = {
          id: res.data.id,  // 文章id
          title: res.data.title,  // 文章标题
          channel_id: res.data.channel_id,  // 文章频道id
          rounded: res.data.cover.images[0],  // 文章封面图片url地址
          content: res.data.content  // 文章内容
        }
        // 遍历数据对象属性，映射到页面元素上去，快速赋值
        Object.keys(dataObj).forEach(key => {
          if (key === 'rounded') {
            // 当属性是图片 rounded 时，需要特殊处理
            if (dataObj[key]) {
              document.querySelector(`.${key}`).classList.add('show')
              document.querySelector(`.${key}`).src = dataObj[key]
              document.querySelector('.place').classList.add('hide')
            }
          } else if (key === 'content') {
            // 当属性是内容 content 时，需要特殊处理
            editor.setHtml(dataObj[key])
          } else {
            document.querySelector(`[name=${key}]`).value = dataObj[key]
          }
        })
      }
    })
  })();

/**
 * 目标5：编辑-保存文章
 *  5.1 判断按钮文字，区分业务（因为共用一套表单）
 *  5.2 调用编辑文章接口，保存信息到服务器
 *  5.3 基于 Alert 反馈结果消息给用户
 */
document.querySelector('.send').addEventListener('click', async function () {
  // 判断，如果不是保存修改，就return
  if (this.innerHTML !== '保存修改') {
    return
  }
  // 收集表单数据
  const form = document.querySelector('.art-form')
  const data = serialize(form, { hash: true, empty: true })
  // console.log(data)
  try {
    const res = await axios({
      url: `/v1_0/mp/articles/${data.id}`,
      method: 'PUT',
      data: {
        ...data,
        cover: {
          type: document.querySelector('.rounded').src ? 1 : 0,
          images: [document.querySelector('.rounded').src]
        }
      }
    })
    // console.log(res)
    myAlert(true, '保存修改成功')
    form.reset()
    editor.setHtml('')
    document.querySelector('.rounded').src = ''
    document.querySelector('.rounded').classList.remove('show')
    document.querySelector('.place').classList.remove('hide')
    // 保存成功后，跳转到列表页
    setTimeout(() => {
      location.href = '../content/index.html'
    }, 1000)
  } catch (error) {
    // console.dir(error)
    myAlert(false, error.response.data.message)
  }

})