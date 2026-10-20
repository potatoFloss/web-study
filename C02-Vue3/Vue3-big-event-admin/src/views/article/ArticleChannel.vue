<script setup>
import { ref } from 'vue'
import { artGetChannelsService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelDialogEdit from '@/views/article/components/ChannelEdit.vue'

// loading效果
const loading = ref(false)

// 文章分类列表
const channelsList = ref([])

// 获取文章分类列表
const getChannelsList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelsList.value = res.data
  loading.value = false
}
getChannelsList()

// 弹窗
const dialog = ref()
const onAddChannel = () => {
  dialog.value.open({})
}
const onEditChannel = (row) => {
  console.log(row)
  dialog.value.open(row)
}
const onDelChannel = (row) => {
  console.log(row)
}

// 弹窗成功回调-刷新列表
const onSuccess = () => {
  getChannelsList()
}
</script>

<template>
  <page-container title="文章分类">
    <!-- 具名插槽 template包裹 #extra是v-slot:extra的缩写 -->
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>

    <!-- 文章分类列表 -->
    <el-table
      v-loading="loading"
      :data="channelsList"
      border
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="onEditChannel(scope.row)"
          >
          </el-button>
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="onDelChannel(scope.row)"
          >
          </el-button>
        </template>
      </el-table-column>

      <!-- 没有数据 -->
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 弹窗 -->
    <channel-dialog-edit
      ref="dialog"
      @success="onSuccess"
    ></channel-dialog-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
