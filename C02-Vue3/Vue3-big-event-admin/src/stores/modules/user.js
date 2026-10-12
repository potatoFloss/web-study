import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

export const useUserStore = defineStore(
  'big-user', // 唯一标识
  () => {
    // 定义token
    const token = ref('')
    // 设置token
    const setToken = (newToken) => {
      token.value = newToken
    }
    // 用户信息
    const userInfo = ref({})
    // 获取用户信息
    const getUserInfo = async () => {
      const res = await userGetInfoService()
      userInfo.value = res.data
    }
    // 设置用户信息
    const setUserInfo = (newUserInfo) => {
      userInfo.value = newUserInfo
    }
    return {
      token,
      setToken,
      userInfo,
      getUserInfo,
      setUserInfo
    }
  },
  {
    persist: true // 开启持久化
  }
)
