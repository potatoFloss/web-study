<template>
  <!-- 主体区域 -->
  <section id="app">
    <!-- 语法：@事件名="方法名" -->
    <TodoHeader @addTodo="add"></TodoHeader>
    <!-- 单向数据流 props 传递数据 -->
    <!-- 语法：:属性名="变量名" -->
    <TodoMain @del="del" :list="list"></TodoMain>
    <TodoFooter @clear="clear" :list="list"></TodoFooter>
  </section>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoMain from "./components/TodoMain.vue";
import TodoFooter from "./components/TodoFooter.vue";

// 渲染功能
// 1. 提供数据？-> 提供在公共的上级组件中 即App.vue
// 2. 通过单向数据流，将数据传递给子组件
// 3. 子组件通过v-for渲染数据

// 添加功能
// 1. 收集表单数据 -> v-model
// 2. 监听事件 -> 回车 / 点击添加按钮
// 3. 通过单向数据流，$emit 将任务名传递给上级组件
// 4. 上级组件进行添加 -> unshift方法 添加到数组的最前面

// 删除功能
// 1. 监听事件 -> 点击删除按钮
// 2. 通过单向数据流，$emit 将任务id传递给上级组件
// 3. 上级组件进行删除 -> filter方法 过滤出id不是删除任务id的任务，赋值给list

// 统计功能
// 1. 通过单向数据流，将list传递给子组件
// 2. 子组件通过length属性，统计任务数量

// 清空功能
// 1. 监听事件 -> 点击清空按钮
// 2. 通过单向数据流，$emit 将任务名传递给上级组件
// 3. 上级组件进行清空 -> 赋值给list

// 持久化存储
// 1. 通过watch深度监听list数组的变化
// 2. 进入页面，优先读取localStorage中的数据
// 3. 当list数组发生变化时，将list数组转换为字符串，存储到localStorage中
// 4. 页面刷新时，从localStorage中获取字符串，转换为数组，赋值给list
export default {
  data() {
    return {
      list: JSON.parse(localStorage.getItem("list")) || [
        { id: 1, name: "吃饭" },
        { id: 2, name: "睡觉" },
        { id: 3, name: "学习" },
      ],
    };
  },
  methods: {
    add(todoName) {
      this.list.unshift({
        id: +new Date(),
        name: todoName,
      });
    },
    del(id) {
      this.list = this.list.filter((item) => item.id !== id);
    },
    clear() {
      this.list = [];
    },
  },
  watch: {
    list: {
      deep: true,
      handler(newVal) {
        localStorage.setItem("list", JSON.stringify(newVal));
      },
    },
  },
  components: {
    TodoHeader,
    TodoMain,
    TodoFooter,
  },
};
</script>

<style>
</style>
