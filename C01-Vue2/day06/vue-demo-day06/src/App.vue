<template>
  <div class="h5-wrapper">
    <!-- 
      keep-alive Vue内置组件，包裹需要缓存的动态组件
      切换过程中，将被切换出去的组件缓存在内存中（提升性能）
      三个属性：
        include：指定需要缓存的组件
          include: "被缓存的组件名数组"
        exclude：指定不需要缓存的组件
        max：指定缓存的组件数量，默认值为10，和include搭配使用
      使用了keep-alive组件后，缓存的组件拥有了两个新的钩子函数：
        activated：组件被激活时调用
        deactivated：组件被停用时调用
      同时也失去了常见的组件的生命周期钩子函数
     -->
    <keep-alive :include="['LayoutPage']">
      <!-- 一级路由出口 -->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "h5-wrapper",
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
<style lang="less" scoped>
.h5-wrapper {
  .content {
    margin-bottom: 51px;
  }
  .tabbar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: flex;
    background: #fff;
    border-top: 1px solid #e4e4e4;
    a {
      flex: 1;
      text-decoration: none;
      font-size: 14px;
      color: #333;
      -webkit-tap-highlight-color: transparent;
      &.router-link-active {
        color: #fa0;
      }
    }
  }
}
</style>