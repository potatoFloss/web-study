import { getCartList } from '@/api/cart'

// 存储购物车数据
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 获取购物车列表 成功后，将购物车列表存储到state.cartList
    setCartList (state, newList) {
      state.cartList = newList
    },
    // 切换对应id的商品选中状态
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    // 切换全选状态
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    }
  },
  actions: {
    // 获取购物车列表 异步操作
    async getCartAction (context) {
      const { data } = await getCartList()
      // 由于获取的数据没有复选框选中状态，所以需要手动添加
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    }
  },
  getters: {
    // 购物车商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 被选中的商品列表
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 被选中的商品总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 被选中的商品总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods.goods_price_min * item.goods_num
      }, 0).toFixed(2)
    },
    // 所有的小选是否都选中
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
