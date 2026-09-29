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

export default router
