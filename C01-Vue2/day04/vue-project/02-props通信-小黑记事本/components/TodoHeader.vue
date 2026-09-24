<template>
  <!-- 输入框 -->
  <header class="header">
    <h1>小黑记事本</h1>
    <input
      @keyup.enter="addTodo"
      v-model="todoName"
      placeholder="请输入任务"
      class="new-todo"
    />
    <button @click="addTodo" class="add">添加任务</button>
  </header>
</template>

<script>
export default {
  data() {
    return {
      todoName: "",
    };
  },
  methods: {
    addTodo() {
      if (this.todoName.trim() === "") {
        alert("任务不能为空");
        return;
      }
      // 语法：$emit("事件名", 事件参数)
      this.$emit("addTodo", this.todoName.trim());
      this.todoName = "";
    },
  },
};
</script>

<style>
</style>