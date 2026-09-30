import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginIndex from '@/views/login'
import LayoutIndex from '@/views/layout'
import SearchIndex from '@/views/search'
import SearchList from '@/views/search/list.vue'
import ProDetailIndex from '@/views/prodetail'
import PayIndex from '@/views/pay'
import MyOrderIndex from '@/views/myorder'

import LayoutHome from '@/views/layout/home.vue'
import LayoutCategory from '@/views/layout/category.vue'
import LayoutCart from '@/views/layout/cart.vue'
import LayoutUser from '@/views/layout/user.vue'

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: LoginIndex },
    {
      path: '/',
      component: LayoutIndex,
      redirect: '/home',
      children: [
        { path: '/home', component: LayoutHome },
        { path: '/category', component: LayoutCategory },
        { path: '/cart', component: LayoutCart },
        { path: '/user', component: LayoutUser }
      ]
    },
    { path: '/search', component: SearchIndex },
    { path: '/searchlist', component: SearchList },
    // 动态路由传参，确认将来是哪个商品的详情页
    { path: '/prodetail/:id', component: ProDetailIndex },
    { path: '/pay', component: PayIndex },
    { path: '/myorder', component: MyOrderIndex }
  ]
})

// 全局前置守卫
// 定义一个需要鉴权的路由路径数组
const authList = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  /**
   * 1. to   往哪里去， 到哪去的路由信息对象
   * 2. from 从哪里来， 从哪来的路由信息对象
   * 3. next() 是否放行
   *    如果next()调用，就是放行
   *    next(路径) 拦截到某个路径页面
  */
  // 当路径不需要鉴权时，直接放行
  if (!authList.includes(to.path)) {
    next()
    return
  }
  // 当路径需要鉴权时，判断是否有token
  const token = store.getters.getToken
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
