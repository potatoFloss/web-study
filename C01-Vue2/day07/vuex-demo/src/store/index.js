// 这里存放 vuex 相关的核心代码
import Vue from 'vue'
import Vuex from 'vuex'

// 插件安装
Vue.use(Vuex)

// 创建仓库(空仓库)
// const store = new Vuex.Store()
const store = new Vuex.Store({
  // 严格模式，开启后，任何在组件中修改state中的数据，都会报错
  // 有利于初学者检测不规范的代码，上线时需要关闭
  strict: true,
  // 通过state提供数据
  state: {
    title: '仓库大标题',
    count: 100
  },

  // 通过mutation提供修改state中的数据的方法
  mutations: {
    // 所有mutation函数，第一个参数都是state，代表仓库中的数据
    // 注意，mutation函数有且只有一个提交载荷(payload，即除state外的其他参数)
    // 如果将来需要传递多个参数，则用对象/数组的形式传递
    addCount (state, num) {
      // 修改state中的数据
      state.count += num
    },
    subCount (state, num) {
      state.count -= num
    },
    changeCount (state, newCount) {
      state.count = newCount
    },
    changeTitle (state, newTitle) {
      state.title = newTitle
    }
  }
})

// 导出给 main.js 使用
export default store
