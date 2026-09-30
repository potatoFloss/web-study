// 此处存放所有和登录页面相关的请求函数
import request from '@/utils/request'

// 1. 获取图形验证码
export function getPicCode () {
  return request.get('/captcha/image')
}

// 2. 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode, // 图形验证码
      captchaKey, // 图形验证码key
      mobile // 手机号
    }
  })
}

// 3. 登录
export function codeLogin (mobile, smsCode) {
  return request.post('/passport/login', {
    form: {
      mobile, // 手机号
      smsCode, // 短信验证码
      isParty: false, // 是否是第三方登录
      partyData: {} // 第三方登录信息
    }
  })
}
