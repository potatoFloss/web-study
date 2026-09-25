import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
/*
// 1. 全局注册指令
// (1). 注册 聚焦 指令
// Vue.directive('指令名', {指令的配置项})
Vue.directive('focus', {
  // inserted 会在 指令所在的元素，被插入到页面时触发
  inserted(el) {
    // el 指令所绑定的元素
    // console.log(el);
    el.focus()
  }
})
*/
new Vue({
  render: h => h(App),
}).$mount('#app')
