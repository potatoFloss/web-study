/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
// 设置用户名
const creator = '土豆'
// 封装 获取并渲染图书列表的函数
function getBookList() {
  // 1.1 获取数据
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    params: {
      creator
    }
  }).then(result => {
    const bookList = result.data.data
    // 1.2 渲染数据
    const htmlStr = bookList.map((item, index) => {
      const { author, bookname, publisher, id } = item
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${bookname}</td>
          <td>${author}</td>
          <td>${publisher}</td>
          <td data-id="${id}">
            <span class="del">删除</span>
            <span class="edit">编辑</span>
          </td>
        </tr>
      `
    }).join('')
    document.querySelector('.list').innerHTML = htmlStr
  })
}
// 网页加载运行，获取并渲染列表一次
getBookList()

/**
 * 目标2：新增图书功能
 *  2.1 新增弹框->显示和隐藏
 *  2.2 收集表单数据，并提交到服务器保存
 *  2.3 新增成功后，刷新列表
 */
// 2.1 创建弹框对象
const addModalDom = document.querySelector('.add-modal')
const addModal = new bootstrap.Modal(addModalDom)
// 点击保存按钮 -> 隐藏弹框
document.querySelector('.add-btn').addEventListener('click', function () {
  // 2.2 收集表单数据，并提交到服务器保存
  const addForm = document.querySelector('.add-form')
  const bookObj = serialize(addForm, { hash: true, empty: true })
  // 2.3 提交到服务器
  axios({
    url: 'https://hmajax.itheima.net/api/books',
    method: 'POST',
    data: {
      ...bookObj,
      creator
    }
  }).then(result => {
    // 提交成功后，清空表单
    addForm.reset()
    // 新增成功后，隐藏弹框
    addModal.hide()
    // 新增成功后，刷新列表
    getBookList()
  })
})

/**
 * 目标3：删除图书
 *  3.1 删除元素绑定点击事件->获取图书id
 *  3.2 调用删除接口
 *  3.3 刷新图书列表
 */
// 给删除按钮绑定点击事件 （事件委托）
document.querySelector('.list').addEventListener('click', e => {
  // 判断是否点击删除按钮
  if (e.target.classList.contains('del')) {
    // 获取图书id
    const bookId = e.target.parentNode.dataset.id
    // 调用删除接口
    axios({
      url: `https://hmajax.itheima.net/api/books/${bookId}`,
      method: 'DELETE'
    }).then(result => {
      // 删除成功后，刷新列表
      getBookList()
    })
  }
})

/**
 * 目标4：编辑图书
 *  4.1 编辑弹框->显示和隐藏
 *  4.2 获取当前编辑图书的数据，并显示在弹框中
 *  4.3 提交保存修改，刷新图书列表
 */
const editDom = document.querySelector('.edit-modal')
const editModal = new bootstrap.Modal(editDom)
document.querySelector('.list').addEventListener('click', e => {
  if (e.target.classList.contains('edit')) {
    // 获取当前编辑图书的数据，并显示在弹框中
    const theId = e.target.parentNode.dataset.id
    axios({
      url: `http://hmajax.itheima.net/api/books/${theId}`
    }).then(result => {
      const bookObj = result.data.data
      // 4.2 显示在弹框中
      // const { author, bookname, publisher } = bookObj
      // document.querySelector('.edit-form .author').value = author
      // document.querySelector('.edit-form .bookname').value = bookname
      // document.querySelector('.edit-form .publisher').value = publisher
      // 数据对象的“属性名”和标签的“类名”一致
      // 所以，遍历数据对象，使用属性名去获取对应标签，快速赋值
      const keys = Object.keys(bookObj)  // ['author', 'bookname', 'publisher', 'id']
      keys.forEach(key => {
        document.querySelector(`.edit-form .${key}`).value = bookObj[key]
      })
    })

    // 显示编辑弹框
    editModal.show()
  }
})

// 隐藏编辑弹框
document.querySelector('.edit-btn').addEventListener('click', function () {
  const editForm = document.querySelector('.edit-form')
  const { id, bookname, author, publisher } = serialize(editForm, { hash: true, empty: true })
  axios({
    url: `https://hmajax.itheima.net/api/books/${id}`,
    method: 'PUT',
    data: {
      bookname,
      author,
      publisher,
      creator
    }
  }).then(result => {
    // console.dir(result)
    // 提交成功后，刷新列表
    getBookList()
  })

  // 提交成功后，隐藏弹框
  editModal.hide()
})