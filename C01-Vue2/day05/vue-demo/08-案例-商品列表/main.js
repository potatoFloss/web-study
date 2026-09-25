import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 全局注册自定义指令
Vue.directive('focus', {
  // inserted：指令所在的元素渲染完成后执行
  inserted(el) {
    el.focus();
  }
})



new Vue({
  render: h => h(App),
}).$mount('#app')
