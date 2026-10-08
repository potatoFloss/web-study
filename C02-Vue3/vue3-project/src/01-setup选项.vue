<!-- 组合式API -->
<!-- setup选项的2种写法 -->

<!-- 第1种写法：写在script标签中 -->
<!--  
<script>
export default {
  setup() { // setup在beforeCreate钩子之前执行
    console.log('this is setup')
    // setup函数中的数据和方法需在末尾以对象的形式return，才能在模板中使用
    const msg = 'hello vue3'
    const logMsg = () => {
      console.log(msg)
    }
    return {
      msg,
      logMsg
    }
  },
  beforeCreate() {
    console.log('this is beforeCreate')
  }
}
</script>
-->

<!-- 第2种写法：<script setup> 语法糖 -->
<!-- 无需 export default，编译时自动导出；变量和方法直接暴露给模板，无需 return -->
<script setup>
const msg = 'hello vue3 setup 语法糖' 
const logMsg = () => {
  console.log(msg)
}
</script>

<template>
  <div></div>
  <button @click="logMsg">点击打印</button>
</template>

<style>
</style>
