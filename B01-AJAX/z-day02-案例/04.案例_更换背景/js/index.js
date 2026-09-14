/**
 * 目标：网站-更换背景
 *  1. 选择图片上传，设置body背景
 *  2. 上传成功时，"保存"图片url网址
 *  3. 网页运行后，"获取"url网址使用
 * */
const uploadBtn = document.querySelector('.bg-ipt')
uploadBtn.addEventListener('change', function (e) {
  // console.dir(e.target.files[0])
  const fd = new FormData()
  fd.append('img', e.target.files[0])
  // 5. 提交到服务器
  axios({
    url: 'http://hmajax.itheima.net/api/uploadimg',
    method: 'POST',
    data: fd
  }).then(result => {
    // console.dir(result.data.data.url)
    const imgUrl = result.data.data.url
    // document.querySelector('body').style.backgroundImage = `url(${imgUrl})`
    document.body.style.backgroundImage = `url(${imgUrl})`
    // 6. 保存图片url网址
    localStorage.setItem('bgUrl', imgUrl)
  })
})

const bgUrl = localStorage.getItem('bgUrl')
// bgUrl && (document.querySelector('body').style.backgroundImage = `url(${bgUrl})`)
bgUrl && (document.body.style.backgroundImage = `url(${bgUrl})`)