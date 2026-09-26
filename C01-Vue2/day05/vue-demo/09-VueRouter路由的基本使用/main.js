import Vue from 'vue'
import App from './App.vue'

/**
 * 路由的使用步骤 5 + 2
 * 
 * 5个基础步骤：
 * 1. 下载路由插件 版本v3.6.5 口诀”2 3 3，3 4 4“
 * 2. 引入
 * 3. 安装注册 Vue.use()
 * 4. 创建路由对象
 * 5. 注入到 new Vue() 中，建立关联
 * 
 * 2个核心步骤：
 * 1. 创建对应的组件（views文件夹中），配置路由规则
 * 2. 准备导航链接，配置路由出口（匹配的组件 展示的位置）
*/

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Find from './views/Find.vue'
import My from './views/My.vue'
import Friend from './views/Friend.vue'

const router = new VueRouter({
  // route 一条路由规则 {path: 路径, component: 组件}
  // routes 路由规则数组
  routes: [
    { path: '/find', component: Find },
    { path: '/my', component: My },
    { path: '/friend', component: Friend }
  ]
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
