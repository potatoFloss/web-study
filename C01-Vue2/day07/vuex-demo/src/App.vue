<template>
  <div id="app">
    <h1>根组件-{{ title }}-{{ $store.state.count }}</h1>
    <!-- 由于state中的数据遵循单向数据流，所以不能直接用v-model进行双向绑定 -->
    <input type="text" :value="count" @input="handleInput">
    <Son1></Son1>
    <hr>
    <Son2></Son2>
  </div>
</template>

<script>
import Son1 from './components/Son1.vue'
import Son2 from './components/Son2.vue'
// 引入mapState辅助函数
import { mapState } from 'vuex'

export default {
  name: 'app',
  created () {
    // 仓库配置成功时，控制台可以打印仓库对象
    console.log(this.$store.state)
  },
  // 通过mapState辅助函数映射state中的数据
  computed: {
    ...mapState(['title', 'count'])
  },
  methods: {
    handleInput (e) {
      const num = Number(e.target.value)
      this.$store.commit('changeCount', num)
    }
  },
  data: function () {
    return {

    }
  },
  components: {
    Son1,
    Son2
  }
}
</script>

<style>
#app {
  width: 600px;
  margin: 20px auto;
  border: 3px solid #ccc;
  border-radius: 3px;
  padding: 10px;
}
</style>
