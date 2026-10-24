<script setup>
import { ref } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores'
import { userUpdatePasswordService } from '@/api/user'

const userStore = useUserStore()

// 表单实例，用于提交前校验 / 重置
const formRef = ref()

// 表单数据
const formModel = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

// 自定义校验：原密码和新密码不能一样
const checkOldPwd = (rule, value, callback) => {
  if (value === formModel.value.new_pwd) {
    callback(new Error('原密码和新密码不能相同'))
  } else {
    callback()
  }
}

// 自定义校验：新密码和确认密码必须一样
const checkRePwd = (rule, value, callback) => {
  if (value !== formModel.value.new_pwd) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

// 校验规则：6-15 位非空字符
const rules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '原密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    { validator: checkOldPwd, trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '新密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '确认密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    { validator: checkRePwd, trigger: 'blur' }
  ]
}

// 修改密码
const onSubmit = async () => {
  await formRef.value.validate()
  await userUpdatePasswordService(formModel.value)
  ElMessage.success('修改密码成功，请重新登录')
  // 密码已变更，清空登录状态并回到登录页
  userStore.setToken('')
  userStore.setUserInfo({})
  router.push('/login')
}

// 重置表单（清空输入和校验提示）
const onReset = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <page-container title="重置密码">
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="max-width: 500px"
      size="large"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="formModel.old_pwd" type="password" show-password />
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="formModel.new_pwd" type="password" show-password />
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="formModel.re_pwd" type="password" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改密码</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
