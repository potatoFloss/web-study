import { createRouter, createWebHistory } from 'vue-router'

// createRouter 创建路由实例
// 1. history模式: createWebHistory   地址栏不带#号 http://xxx/user
// 2. hash模式: createWebHashHistory  地址栏带#号 http://xxx/#/user

// import.meta.env.BASE_URL: vite的配置，路由基地址，默认是'/'
// 详情可参考: https://vitejs.dev/guide/build.html#public-base-path

// 如果将来你部署的域名路径是：http://xxx/my-path/user
// 就在 vite.config.ts 中添加配置 base: 'my-path'，路由这就会加上 my-path 前缀了

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
