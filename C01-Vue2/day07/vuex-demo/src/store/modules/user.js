const state = {
  userInfo: {
    name: 'zs',
    age: 18
  }
}
const mutations = {
  // 注意：默认模块中的 mutations 和 actions 会被挂载到全局，需要开启 命名空间 namespaced: true （推荐开启），才会被挂载到子模块
  // 调用子模块中的 mutations
  // 1. 原生 -> $store.commit('模块名/mutationName', payload)
  // 2. mapMutations -> 映射 mapMutations('模块名', ['mutationName'])
  changeName (state, newName) {
    state.userInfo.name = newName
  }
}
const actions = {}
const getters = {
  UpperCaseName (state) {
    return state.userInfo.name.toUpperCase()
  }
}

export default {
  // 开启命名空间后，可以通过例如 ...mapState('user', ['userInfo']) 直接访问模块中指定的数据
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
