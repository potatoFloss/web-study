// axios 公共配置
// 基地址
axios.defaults.baseURL = 'https://geek.itheima.net'

// 添加请求拦截器
// https://www.axios-http.cn/docs/interceptors
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 1.1 从本地缓存中获取 token 令牌字符串
  const token = localStorage.getItem('token')
  // 1.2 如果有 token 令牌字符串，则在请求头中携带 token 令牌字符串
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。例如：返回服务器返回的响应结果对象
  // 对响应数据做点什么
  // console.log(response.data)
  const result = response.data
  return result;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么 例如：统一对 401 身份验证失败情况做处理
  // console.dir(error)
  if (error?.response?.status === 401) {
    alert('登录过期，请重新登录')
    // 清除本地缓存中的 token 令牌字符串
    localStorage.removeItem('token')
    location.href = '../login/index.html'
  }

  return Promise.reject(error);
});