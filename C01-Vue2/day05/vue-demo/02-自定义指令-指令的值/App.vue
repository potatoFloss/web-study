<template>
  <div>
    <h1 v-color="color1">指令的值1测试</h1>
    <h1 v-color="color2">指令的值2测试</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color1: "red",
      color2: "blue",
    };
  },
  directives: {
    color: {
      // 1. inserted 提供的是 元素被添加到页面中时的逻辑（即只执行一次，后续值变化不会执行）
      inserted(el, binding) {
        // console.log(el, binding.value)
        // binding.value 是指令的值，即 v-color="color1" 中的 color1 或 color2
        el.style.color = binding.value;
      },
      // 2. update 提供的是 指令的值变化时DOM更新的逻辑（即每次值变化都会执行）
      update(el, binding) {
        el.style.color = binding.value;
      },
    },
  },
};
</script>

<style>
</style>