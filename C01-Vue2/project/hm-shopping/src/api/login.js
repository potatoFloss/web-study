// 此处存放所有和登录页面相关的请求函数
import request from '@/utils/request'

// 1. 获取图形验证码
export function getPicCode () {
  return request.get('/captcha/image')
}
