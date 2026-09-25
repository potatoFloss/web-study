import Vue from 'vue'
import App from './App.vue'

/**
 * 路由的使用步骤 5 + 2
 * 1. 下载路由插件 版本v3.6.5 口诀”2 3 3，3 4 4“
 * 2. 引入
 * 3. 安装注册 Vue.use()
 * 4. 创建路由对象
 * 5. 注入到 new Vue() 中，建立关联
*/

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
