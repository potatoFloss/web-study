const INFO_KEY = 'hm_shopping_info'
const HISTORY_KEY = 'hm_history_list'

// 封装将个人信息存储到本地存储的方法
const defaultInfo = {
  token: '',
  userId: ''
}

// 从本地存储中获取个人信息
export function getInfo () {
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultInfo
}

// 设置个人信息
export function setInfo (obj) {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

// 移除个人信息
export function removeInfo () {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

// 设置搜索历史
export const setHistoryList = (list) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list))
}
