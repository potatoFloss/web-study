<template>
  <div class="app">
    <button @click="isShow = true">退出按钮</button>
    <!-- :属性名.sync 等价于 :属性名 + @update:属性名 -->
    <BaseDialog :visible.sync="isShow"></BaseDialog>
    <!-- <BaseDialog
      :visible="isShow"
      @update:visible="isShow = $event"
    ></BaseDialog> -->
  </div>
</template>

<script>
import BaseDialog from "./components/BaseDialog.vue";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {},
  components: {
    BaseDialog,
  },
};
</script>

<style>
</style>