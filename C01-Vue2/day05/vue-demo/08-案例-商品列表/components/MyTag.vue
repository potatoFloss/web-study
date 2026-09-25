<template>
  <div class="my-tag">
    <!-- 
      自动获取焦点
        方法1：ref $refs $nextTick
        方法2：自定义指令 v-focus 全局注册
     -->
    <!-- 失去焦点时，隐藏 @blur="isEdit = false" -->
    <input
      v-if="isEdit"
      v-focus
      ref="inp"
      @blur="isEdit = false"
      :value="value"
      @keyup.enter="handleEnter"
      class="input"
      type="text"
      placeholder="输入标签"
    />
    <!-- 双击 @dblclick="" -->
    <div v-else @dblclick="dblClick" class="text">{{ value }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false,
    };
  },
  props: {
    value: String,
  },
  methods: {
    dblClick() {
      this.isEdit = true;
      // this.$nextTick(() => {
      //   this.$refs.inp.focus();
      // });
    },
    handleEnter(e) {
      // 非空判断
      if (e.target.value.trim() === "") {
        alert("标签不能为空");
        return;
      }
      this.$emit("input", e.target.value.trim());
      this.isEdit = false;
    },
  },
};
</script>

<style lang="less" scoped>
.my-tag {
  cursor: pointer;
  .input {
    appearance: none;
    outline: none;
    border: 1px solid #ccc;
    width: 100px;
    height: 40px;
    box-sizing: border-box;
    padding: 10px;
    color: #666;
    &::placeholder {
      color: #666;
    }
  }
}
</style>