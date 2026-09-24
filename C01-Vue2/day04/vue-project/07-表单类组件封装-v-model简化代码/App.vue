<template>
  <div class="app">
    <!-- <BaseSelect :value="selectId" @input="selectId = $event"></BaseSelect> -->
    <!-- 可以将上面的代码替换为下面的代码 -->
    <BaseSelect v-model="selectId"></BaseSelect>
  </div>
</template>

<script>
import BaseSelect from "./components/BaseSelect.vue";
export default {
  data() {
    return {
      selectId: "102",
    };
  },
  components: {
    BaseSelect,
  },
};
</script>

<style>
</style>