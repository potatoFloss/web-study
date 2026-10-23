<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

// 表单实例，用于提交前校验
const formRef = ref()

// 表单数据（id 不显示，但提交时必须带上）
const formModel = ref({
  id: '',
  username: '',
  nickname: '',
  email: ''
})

// 校验规则
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '昵称必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: ['blur', 'change']
    }
  ]
}

// 回显用户信息
onMounted(async () => {
  // 布局组件挂载时也会获取，这里兜底：刷新后直接进入本页也能拿到数据
  if (!userInfo.value.id) {
    await userStore.getUserInfo()
  }
  formModel.value = {
    id: userInfo.value.id,
    username: userInfo.value.username,
    nickname: userInfo.value.nickname,
    email: userInfo.value.email
  }
})

// 提交修改
const onSubmit = async () => {
  await formRef.value.validate()
  await userUpdateInfoService(formModel.value)
  // 同步 store，让顶部昵称等信息立即更新
  userStore.setUserInfo({ ...userInfo.value, ...formModel.value })
  ElMessage.success('修改成功')
}
</script>

<template>
  <page-container title="基本资料">
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="登录名称">
        <el-input v-model="formModel.username" disabled />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="formModel.nickname" />
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formModel.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style lang="scss" scoped></style>
