<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userUpdateAvatarService } from '@/api/user'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

// el-upload 组件实例，用于触发文件选择
const uploadRef = ref()
// 预览地址
const imgUrl = ref('')
// 待提交的 base64 字符串
const avatarBase64 = ref('')

// 回显头像
onMounted(async () => {
  // 布局组件已获取过，这里兜底：刷新后直接进入本页也能拿到数据
  if (!userInfo.value.id) {
    await userStore.getUserInfo()
  }
  imgUrl.value = userInfo.value.user_pic || ''
})

// 选择图片后：读取为 base64 并预览
const onChange = (uploadFile) => {
  const file = uploadFile.raw
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    imgUrl.value = reader.result
    avatarBase64.value = reader.result
  }
  reader.readAsDataURL(file)
}

// 选择图片按钮：触发 el-upload 内部的文件选择框
const chooseImage = () => {
  uploadRef.value.$el.querySelector('input[type="file"]').click()
}

// 上传头像
const onUpload = async () => {
  if (!avatarBase64.value) {
    ElMessage.warning('请先选择图片')
    return
  }
  await userUpdateAvatarService(avatarBase64.value)
  // 同步 store，让顶部头像立即更新
  userStore.setUserInfo({ ...userInfo.value, user_pic: avatarBase64.value })
  ElMessage.success('头像更新成功')
}
</script>

<template>
  <page-container title="更换头像">
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      :auto-upload="false"
      :show-file-list="false"
      accept="image/*"
      :on-change="onChange"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>

    <div class="actions">
      <el-button size="large" type="primary" :icon="Plus" @click="chooseImage">
        选择图片
      </el-button>
      <el-button
        size="large"
        type="success"
        :icon="Upload"
        @click="onUpload"
        :disabled="!avatarBase64"
      >
        上传头像
      </el-button>
    </div>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
      object-fit: cover;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.actions {
  margin-top: 20px;
}
</style>
