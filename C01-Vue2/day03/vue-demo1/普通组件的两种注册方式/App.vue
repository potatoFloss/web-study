<template>
  <!-- 组件名一般和类名一致 -->
  <div class="App">
    <!-- 引入HmHeader组件 -->
    <HmHeader></HmHeader>
    <!-- 引入HmMain组件 -->
    <HmMain></HmMain>
  </div>
</template>

<script>
import HmHeader from "./components/HmHeader.vue";
import HmMain from "./components/HmMain.vue";
export default {
  components: {
    // '组件名': 组件对象
    // 组件名的命名规则 大驼峰
    HmHeader: HmHeader,
    HmMain,
  },
};
</script>

<style>
.App {
  width: 600px;
  height: 700px;
  background-color: #87ceeb;
  margin: 0 auto;
  padding: 20px;
}
</style>