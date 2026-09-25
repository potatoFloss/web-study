<template>
  <div class="app">
    <div v-if="isShowEdit">
      <input ref="inp" type="text" v-model="editValue" />
      <button>确认</button>
    </div>
    <div v-else>
      <span>{{ title }}</span>
      <button @click="handleEdit">编辑</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "大标题",
      isShowEdit: false,
      editValue: "",
    };
  },
  methods: {
    handleEdit() {
      // 1. 显示输入框
      this.isShowEdit = true;

      // 2. 让输入框获取焦点
      // 报错，因为 Vue是异步Dom更新，需要所有代码执行完成后，才更新Dom
      // this.$refs.inp.focus();

      // 解决方法：在 $nextTick(函数) 中执行对应操作
      // $nextTick(函数) 是 Vue 提供的一个方法，用于在 DOM 更新完成后执行对应操作
      this.$nextTick(() => {
        this.$refs.inp.focus();
      });
    },
  },
};
</script>

<style>
</style>