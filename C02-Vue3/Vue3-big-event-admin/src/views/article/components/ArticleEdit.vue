<!-- 抽屉组件 -->
<script setup>
import { ref, nextTick } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artPublishService,
  artGetDetailService,
  artEditService
} from '@/api/article.js'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request.js'
import axios from 'axios'

// 控制抽屉的显示与隐藏
const visibleDrawer = ref(false)
// 默认表单数据
const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
const formModel = ref({ ...defaultForm })
// 图片地址
const imgUrl = ref('')
// 添加文章完成后，表单内容重置
const formRef = ref()
const editorRef = ref()

// 本地预览图片
const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

// 发布文章
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  // 文章状态
  formModel.value.state = state
  // 将formModel.value转换成formData格式
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  // 判断当前是 ”添加文章“ 还是 ”编辑文章“
  if (formModel.value.id) {
    console.log('编辑文章')
    await artEditService(fd)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    // 通知父组件，刷新文章列表
    emit('success', 'edit')
  } else {
    // 添加文章
    // 调用添加文章接口，发起请求
    await artPublishService(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    // 通知父组件，刷新文章列表
    emit('success', 'add')
  }
}

// 向外暴露open方法
const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    console.log('编辑回显')
    const res = await artGetDetailService(row.id)
    formModel.value = res.data
    // 图片地址需要特殊处理
    // 1. 将服务器基地址拼接在得到的图片地址前
    imgUrl.value = baseURL + formModel.value.cover_img
    // 2. 提交给后台，要求图片为file格式，所以需要将网络图片，转换为file格式
    formModel.value.cover_img = await imageUrlToFile(
      imgUrl.value,
      formModel.value.cover_img
    )
  } else {
    formModel.value = { ...defaultForm }
    imgUrl.value = ''
    // 等抽屉内的 quill-editor 渲染完成，才能拿到 editorRef
    await nextTick()
    editorRef.value.setHTML('')
    console.log('添加文章')
  }
}
defineExpose({
  open
})

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select v-model="formModel.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 禁止element-plus自动上传文件 auto-upload=false
             本地预览图片地址 URL.createObjectURL(file) 
        -->
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
      object-fit: cover; /* 新增：等比缩放，裁剪超出部分 */
      object-position: center; /* 新增：居中裁剪 */
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
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
