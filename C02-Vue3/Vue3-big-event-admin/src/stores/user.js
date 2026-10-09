import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'big-user', // 唯一标识
  () => {
    const token = ref('') // 定义token
    // 设置token
    const setToken = (newToken) => {
      token.value = newToken
    }
    return {
      token,
      setToken
    }
  },
  {
    persist: true // 开启持久化
  }
)
