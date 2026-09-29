<template>
  <div class="box">
    <h2>Son1 子组件</h2>
    从vuex中获取的值: <label>{{ $store.state.count}}</label>
    <br>
    <button @click="handleAdd(1)">值 + 1</button>
    <button @click="handleAdd(10)">值 + 10</button>
    <button @click="handleChange()">改标题</button>
    <button @click="handleChangeAction(666)">1s后修改为666</button>

    <hr>
    <div>{{ $store.state.list }}</div>
    <div>{{ $store.getters.filterList }}</div>

    <hr>
    <!-- 测试，访问模块中的数据 - 原生方式 -->
    <div>{{ $store.state.user.userInfo.name }}</div>
    <div>{{ $store.state.setting.backgroundColor }}</div>

    <hr>
    <!-- 测试，访问模块中的getters - 原生方式 -->
    <div>{{ $store.getters['user/UpperCaseName'] }}</div>

    <hr>
    <!-- 测试，访问模块中的mutations - 原生方式 -->
    <button @click="handleChangeUserName('heihei')">改名</button>
  </div>
</template>

<script>
export default {
  name: 'Son1Com',
  methods: {
    handleAdd (num) {
      // 错误代码（vue默认不会监测，因为检测需要成本）
      // 仓库的数据同样遵循单向数据流，不能直接修改state中的数据（如果在组件中修改，会导致后期维护时找不到修改的位置）
      // this.$store.state.count++

      // 正确代码（通过mutation修改state中的数据）
      // 提交调用mutation
      this.$store.commit('addCount', num)
      console.log(this.$store.state.count)
    },
    handleChange () {
      this.$store.commit('changeTitle', '仓库新标题')
    },
    handleChangeAction (num) {
      // 调用 action
      // this.$store.dispatch('action名字', payload)
      this.$store.dispatch('changeCountAction', num)
    },
    handleChangeUserName (newName) {
      this.$store.commit('user/changeName', newName)
    }
  }
}
</script>

<style lang="css" scoped>
.box{
  border: 3px solid #ccc;
  width: 400px;
  padding: 10px;
  margin: 20px;
}
h2 {
  margin-top: 10px;
}
</style>
