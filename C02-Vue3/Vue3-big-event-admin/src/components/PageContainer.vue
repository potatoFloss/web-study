<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="extra">
          <!-- <el-button type="primary">添加分类</el-button> -->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>

    <!-- 内容主体 -->
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
