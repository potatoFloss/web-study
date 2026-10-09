// pinia 配置仓库统一管理

// 1. 将main.js中所有和pinia相关的代码都放到这里
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// 2. 将所有仓库都放到这里，统一导出
// import userStore from './user'
// export { userStore }
export * from './user'
