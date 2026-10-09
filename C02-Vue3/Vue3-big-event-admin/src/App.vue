<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const goUser = () => {
  router.push('/user')
  console.log(route)
}

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const { setToken } = userStore
</script>

<template>
  <div>我是App组件</div>
  <button @click="$router.push('/home')">跳转到/home</button>
  <button @click="goUser">跳转到/user</button>
  <div>当前token: {{ userStore.token }}</div>
  <el-button type="primary" @click="setToken('adhjalfabdl')">Primary</el-button>
</template>

<style scoped></style>
