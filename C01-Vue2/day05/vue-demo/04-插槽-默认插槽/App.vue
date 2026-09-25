<template>
  <div>
    <!-- 2. 使用组件时，在组件标签内填入需要定制的内容 -->
    <MyDialog> 你确认要退出本系统么? </MyDialog>
    <MyDialog> 你确认要删除选中的项么? </MyDialog>
  </div>
</template>

<script>
import MyDialog from "./components/MyDialog.vue";
export default {
  data() {
    return {};
  },
  components: {
    MyDialog,
  },
};
</script>

<style>
body {
  background-color: #b3b3b3;
}
</style>