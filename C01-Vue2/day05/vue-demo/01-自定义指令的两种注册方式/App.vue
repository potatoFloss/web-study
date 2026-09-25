<template>
  <div>
    <h1>自定义指令</h1>
    <!-- 不用自定义指令 -->
    <!-- <input ref="inp" type="text" /> -->

    <!-- 自定义指令 v-指令名 -->
    <input v-focus type="text" />
  </div>
</template>

<script>
export default {
  mounted() {
    // 不用自定义指令，实现打开页面，输入框自动获得聚焦的方法
    // this.$refs.inp.focus();
  },

  // 2. 局部注册自定义指令
  directives: {
    // 指令名: {指令的配置项}
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>

<style>
</style>