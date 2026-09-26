import Home from '@/views/Home'
import Search from '@/views/Search'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) // VueRouter插件初始化

// 创建了一个路由对象
const router = new VueRouter({
  routes: [
    { path: '/home', component: Home },
    // 动态路由传参 :words 为动态参数 
    // ? 表示其为可选参数（可以不传参）
    { path: '/search/:words?', component: Search }
  ]
})

export default router