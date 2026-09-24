<template>
  <div class="app">
    <!-- 监听子组件的changeId事件，selectId = changeId事件的形参，即$event -->
    <BaseSelect :cityId="selectId" @changeId="selectId = $event"></BaseSelect>
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
  methods: {
    handleChange(e) {
      console.log(e);
      this.selectId = e;
    },
  },
};
</script>

<style>
</style>