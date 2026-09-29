import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      // 购物车数据 [{}, {}, ...]
      list: []
    }
  },
  mutations: {
    updateList (state, newList) {
      state.list = newList
    },
    // 更新购物车商品数量
    updateCount (state, obj) {
      // 找到对应商品
      const item = state.list.find(item => item.id === obj.id)
      // 更新数量
      item.count = obj.newCount
    }
  },
  actions: {
    // 请求方式：get
    // 请求地址：http://localhost:3000/cart
    async getList (context) {
      const res = await axios.get('http://localhost:3000/cart')
      console.log(res)
      context.commit('updateList', res.data)
    },
    // 更新购物车商品数量
    async updateCountAsync (context, obj) {
      // 修改服务器数据
      /**
       * 请求方式：patch
       * 请求地址：http://localhost:3000/cart/:id值
       * 请求参数：
       * {
       *   name: '新值',   [可选]
       *   price: '新值',  [可选]
       *   count: '新值',  [可选]
       *   thumb: '新值'   [可选]
       * }
      */
      await axios.patch(`http://localhost:3000/cart/${obj.id}`, {
        count: obj.newCount
      })
      // 将修改同步更新到vuex
      context.commit('updateCount', obj)
    }
  },
  getters: {
    // 总数量
    totalCount (state) {
      return state.list.reduce((sum, item) => sum + item.count, 0)
    },
    // 总金额
    totalPrice (state) {
      return state.list.reduce((sum, item) => sum + item.count * item.price, 0)
    }
  }
}
