// 这里存放 vuex 相关的核心代码
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import setting from './modules/setting.js'

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
    count: 100,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
  },

  // 通过action提供异步操作
  // 注意：不能直接修改 state 中的数据，只能通过 context.commit 提交 mutation 修改
  actions: {
    // context 上下文（此处未分模块，可以当作 store 仓库）
    // context.commit('mutationName', payload)
    changeCountAction (context, num) {
      // 异步操作（此处用 setTimeout 模拟异步操作，实际项目中可以是请求数据等）
      setTimeout(() => {
        context.commit('changeCount', num)
      }, 1000)
    }
  },

  // 通过getters提供（类似计算属性）
  getters: {
    // 注意：
    // 1. getters 函数的第一个参数是 state，代表仓库中的数据
    // 2. getters 函数必须要有返回值
    filterList (state) {
      return state.list.filter(item => item > 5)
    }
  },

  // 模块化管理
  modules: {
    user,
    setting
  }
})

// 导出给 main.js 使用
export default store
