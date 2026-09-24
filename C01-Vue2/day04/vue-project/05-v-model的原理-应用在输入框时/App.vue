<template>
  <div class="app">
    <input v-model="msg1" type="text" />
    <br />
    <!-- v-model 语法糖 应用在输入框时 -->
    <!-- 在模板中，获取事件的形参 -> $event -->
    <input :value="msg2" @input="msg2 = $event.target.value" type="text" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg1: "",
      msg2: "",
    };
  },
};
</script>

<style>
</style>