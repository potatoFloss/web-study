<!-- 组合式API -->
<!-- reactive和ref函数 -->
<!-- 
 作用：返回一个响应式对象
 区别：
  reactive函数：只接收对象类型的数据作为参数
  ref函数：接收任意类型（简单类型or对象类型）的数据作为参数

 在实际工作中，推荐使用ref函数创建响应式变量
-->

<!-- reactive函数：创建响应式对象 -->
<!--  
<script setup>
// 导入reactive函数
import { reactive } from 'vue'
// 变量接收 执行函数 传入参数
const state = reactive({
  msg: 'this is message'
})
const setState = () => {
  // 修改数据，更新视图
  state.msg = 'this is new message'
}
</script>

<template>
  <p>{{ state.msg }}</p>
  <button @click="setState">点击修改</button>
</template>
-->

<!-- ref函数：创建响应式变量 -->
<!-- ref函数内部的实现依赖于reactive函数 -->
<script setup>
// 导入ref函数
import { ref } from 'vue'
// 变量接收 执行函数 传入参数
const count = ref(0)
const setCount = () => {
  // 修改数据，更新视图
  // 必须使用.value属性，才能修改响应式变量的值
  count.value++
}
</script>

<template>
  <p>{{ count }}</p>
  <button @click="setCount">点击增加</button>
</template>

<style>
</style>