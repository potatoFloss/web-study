<template>
  <div class="box">
    <h2>Son2 子组件</h2>
    从vuex中获取的值:<label>{{ count }}</label>
    <br />
    <button @click="subCount(1)">值 - 1</button>
    <button @click="subCount(5)">值 - 5</button>
    <button @click="handleSub(10)">值 - 10</button>
    <button @click="changeTitle('通过mapMutations修改标题')">改标题</button>
  </div>
</template>

<script>
// 引入mapState、mapMutations辅助函数
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Son2Com',
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['subCount', 'changeTitle']),
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
