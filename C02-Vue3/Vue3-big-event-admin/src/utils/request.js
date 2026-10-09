import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
import axios from 'axios'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 100000
})

instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 摘取核心响应数据
    if (res.data.code === 0) {
      return res.data
    }
    // TODO 4. 处理业务失败
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res)
  },
  (err) => {
    // 如果遇到断网或超时，请求根本没有响应，err.response 为 undefined
    // 如果此时访问.data 会直接抛 TypeError，连错误提示都出不来。
    // 所以加 可选链
    ElMessage.error(err.response?.data?.message || '服务异常')
    // TODO 5. 处理401错误
    if (err.response?.status === 401) {
      // 登录过期，重新登录
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
