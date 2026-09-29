<template>
  <div class="box">
    <h2>Son2 子组件</h2>
    从vuex中获取的值:<label>{{ count }}</label>
    <br />
    <button @click="subCount(1)">值 - 1</button>
    <button @click="subCount(5)">值 - 5</button>
    <button @click="handleSub(10)">值 - 10</button>
    <button @click="changeCountAction(888)">1s后修改为888</button>
    <button @click="changeTitle('通过mapMutations修改标题')">改标题</button>

    <hr>
    <div>{{ list }}</div>
    <div>{{ filterList }}</div>

    <hr>
    <!-- 测试，访问模块中的数据 - mapState -->
    <div>{{ user.userInfo.name }}</div>
    <div>{{ setting.backgroundColor }}</div>
    <div>{{ userInfo.age }}</div>

    <hr>
    <!-- 测试，访问模块中的getters - mapGetters -->
    <div>{{ UpperCaseName }}</div>

    <hr>
    <!-- 测试，访问模块中的mutations - mapMutations -->
    <button @click="changeName('xiaodong')">改名</button>
  </div>
</template>

<script>
// 引入mapState、mapMutations辅助函数
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'Son2Com',
  computed: {
    // mapState 和 mapGetters 都是映射属性，所以经过展开运算符后，放在 computed 中使用
    ...mapState(['count', 'list', 'user', 'setting']),
    ...mapState('user', ['userInfo']),
    ...mapGetters(['filterList']),
    ...mapGetters('user', ['UpperCaseName'])
  },
  methods: {
    // mapMutations 和 mapActions 都是映射方法，所以经过展开运算符后，放在 methods 中使用
    ...mapMutations(['subCount', 'changeTitle']),
    ...mapActions(['changeCountAction']),
    ...mapMutations('user', ['changeName']),
    handleSub (num) {
      this.$store.commit('subCount', num)
    },
    handleChange () {
      this.$store.commit('changeTitle', '哈哈哈哈')
    }
  }
}
</script>

<style lang="css" scoped>
.box {
  border: 3px solid #ccc;
  width: 400px;
  padding: 10px;
  margin: 20px;
}
h2 {
  margin-top: 10px;
}
</style>
