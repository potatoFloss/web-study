/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = '土豆丝'
axios({
  url: 'http://hmajax.itheima.net/api/settings',
  params: {
    creator
  }
}).then(result => {
  // console.dir(result.data.data)
  const userObj = result.data.data
  Object.keys(userObj).forEach(key => {
    // 特殊情况判断
    if (key === 'avatar') {  // avatar 对应 prew
      document.querySelector('.prew').src = userObj[key]
    } else if (key === 'gender') {
      const genderList = document.querySelectorAll('.gender')
      const genderNum = userObj[key]
      genderList[genderNum].checked = true
    } else {
      document.querySelector(`.${key}`).value = userObj[key]
    }
  })
})

// 2. 修改用户头像
document.querySelector('.upload').addEventListener('change', function (e) {
  // console.dir(e.target.files[0])
  const fd = new FormData()
  fd.append('avatar', e.target.files[0])
  fd.append('creator', creator)
  axios({
    url: 'https://hmajax.itheima.net/api/avatar',
    method: 'PUT',
    data: fd
  }).then(result => {
    // console.dir(result.data.data.avatar)
    document.querySelector('.prew').src = result.data.data.avatar
  })
})

// 3. 修改用户信息
document.querySelector('.submit').addEventListener('click', function () {
  const userForm = document.querySelector('.user-form')
  const userObj = serialize(userForm, { hash: true, empty: true })
  userObj.gender = +userObj.gender
  userObj.creator = creator
  axios({
    url: 'https://hmajax.itheima.net/api/settings',
    method: 'PUT',
    data: userObj
  }).then(() => {
    // console.dir(result)
    const toastDom = document.querySelector('.my-toast')
    const toast = new bootstrap.Toast(toastDom)
    toast.show()
  })

})
