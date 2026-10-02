// 混入
// 确认是否登录
export default {
  methods: {
    // 是否需要弹登录确认框
    // (1) 需要，返回 true，并直接弹出登录确认框
    // (2) 不需要，返回 false
    loginConfirm () {
      if (!this.$store.getters.getToken) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登录才能继续操作哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // 用户点击了确定（去登录）
            // replace：替换当前路由，不保留历史记录
            // push：添加新路由，保留历史记录
            this.$router.replace({
              path: '/login',
              query: {
                // backUrl 登录后，回调到当前页面
                // fullPath 当前路由的完整路径，包含查询参数
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {})
        return true
      }
      return false
    }
  }
}
