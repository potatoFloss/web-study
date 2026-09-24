<template>
  <div class="App">
    <!-- 快捷链接 -->
    <XtxShortCut></XtxShortCut>
    <!-- 顶部导航 -->
    <XtxHeaderNav></XtxHeaderNav>
    <!-- 轮播区域 -->
    <XtxBanner></XtxBanner>
    <!-- 新鲜好物 -->
    <XtxNewGoods></XtxNewGoods>
    <!-- 热门品牌 -->
    <XtxHotBrand></XtxHotBrand>
    <!-- 最新专题 -->
    <XtxTopic></XtxTopic>
    <!-- 版权底部 -->
    <XtxFooter></XtxFooter>
  </div>
</template>

<script>
import XtxShortCut from "./components/XtxShortCut.vue";
export default {
  components: {
    XtxShortCut,
  },
};
</script>

<style>
</style>