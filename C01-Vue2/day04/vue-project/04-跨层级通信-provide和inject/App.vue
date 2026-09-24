<template>
  <div class="app">
    我是APP组件
    <button @click="change">修改数据</button>
    <SonA></SonA>
    <SonB></SonB>
  </div>
</template>

<script>
import SonA from "./components/SonA.vue";
import SonB from "./components/SonB.vue";
export default {
  data() {
    return {
      color: "pink", // 简单类型
      // 复杂类型
      userInfo: {
        name: "zs",
        age: 18,
      },
    };
  },
  // 共享数据给所有后代组件
  provide() {
    return {
      // 简单类型 是非响应式的
      color: this.color,
      // 复杂类型 是响应式的（推荐）
      userInfo: this.userInfo,
    };
  },
  methods: {
    change() {
      this.color = "red";
      this.userInfo.name = "ls";
    },
  },
  components: {
    SonA,
    SonB,
  },
};
</script>

<style>
.app {
  border: 3px solid #000;
  border-radius: 6px;
  margin: 10px;
}
</style>