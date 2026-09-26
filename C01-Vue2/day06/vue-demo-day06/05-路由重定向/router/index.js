import Home from '@/views/Home'
import Search from '@/views/Search'
import NotFound from '@/views/NotFound.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) // VueRouter插件初始化

// 创建了一个路由对象
const router = new VueRouter({
  // 路由模式 默认是 hash 模式，在 history 模式中，地址栏没有 #
  // 如果要使用 history 模式，需要告知后台，需要后台配置相应的规则
  mode: 'history',
  routes: [
    // 路由重定向
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    // 动态路由传参 :words 为动态参数 
    // ? 表示其为可选参数（可以不传参）
    { path: '/search/:words?', component: Search },
    // 404 没有匹配的路径  * 表示匹配所有路径
    // 但是，* 不能放在最前面，否则会匹配所有路径，导致路由跳转失败
    // 所以，* 要放在最后面
    { path: '*', component: NotFound }
  ]
})

export default router