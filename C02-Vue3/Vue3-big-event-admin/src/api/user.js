import request from '@/utils/request'

// 注册接口
export const userRegisterService = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}

// 登录接口
export const userLoginService = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

// 获取用户信息接口
export const userGetInfoService = () => request.get('/my/userinfo')

// 更新用户基本信息接口
export const userUpdateInfoService = (data) => request.put('/my/userinfo', data)
