import Vue from 'vue'
import App from './App.vue'
// 编写导入代码，写在代码顶部
import HmButton from './components/HmButton.vue'

Vue.config.productionTip = false
// 全局注册组件
// Vue.component(组件名, 组件对象)
Vue.component('HmButton', HmButton)

new Vue({
  render: h => h(App),
}).$mount('#app')
