<!-- 组合式API -->
<!-- computed -->
<!-- 计算属性的基本思想和Vue2保持一致，组合式API下的计算属性只是修改了API写法 -->
<script setup>
// 导入computed函数
import { computed, ref } from 'vue'

// 例1
// 原始数据
const count = ref(10)
// 计算属性
const doubleCount = computed(() => {
  return count.value * 2
})

// 例2
// 原始数据
const list = ref([1, 2, 3, 4, 5])
// 计算属性
const filteredList = computed(() => {
  return list.value.filter(item => item > 2)
})
</script>

<template>
  <p>原始数据：{{ list }}</p>
  <p>计算属性：{{ filteredList }}</p>
  <hr>
  <p>原始数据：{{ count }}</p>
  <p>计算属性：{{ doubleCount }}</p>
</template>

<style scoped>
</style>