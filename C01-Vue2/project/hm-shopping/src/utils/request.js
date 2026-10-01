import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

// 创建axios实例，避免污染全局axios
const instance = axios.create({
  baseURL: 'https://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: {
    platform: 'H5' // 所有请求统一带上平台标识
  }
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  const token = store.getters.getToken
  if (token) {
    config.headers['Access-Token'] = token
  }
  // 显示loading
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 是否禁止背景点击
    duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // 返回的响应数据会多包一层data，需要手动处理一下
  const res = response.data
  console.log(res)
  // 处理错误码
  if (res.status !== 200) {
    // Toast 默认采用单例模式，即同一时间只会存在一个 Toast
    // 所以这里不需要手动关闭loading
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    // 关闭loading
    Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出axios实例
export default instance
