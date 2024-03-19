<template>
  <div class="layout-body">
    <div class="left">
      列表
    </div>
    <div class="right">
      <calender />
    </div>
  </div>
</template>

<script setup lang="ts">
import calender from "@/components/calender/calendar.vue";
</script>

<style scoped lang="scss">
.layout-body {
  display: flex;

  height: 100px;

  padding: 5px 30px;

  .left {
    width: 20%;

    display: flex;
  }

  .right {
    width: 70%;
  }
}
</style>
