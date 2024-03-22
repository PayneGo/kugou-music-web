<!--  -->
<template>
  <router-view />
  <div class="main">
    <div class="top"><top /></div>
    <div class="body">
      <div class="side"><side /></div>
      <div class="body-body"><body-main /></div>
    </div>
    <div class="footer"><footers /></div>
  </div>
</template>

<style scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
}
.body {
  flex-wrap: wrap;
  height: 80%;
  display: flex;
  background: #0582ff;
}

.side {
  display: flex;
  width: 20%;
  background: #0df320;
  justify-content: space-evenly;
}

.body-body {
  width: 80%;
  background: #b7ee14;
  justify-content: space-evenly;
}

.footer {
  height: 14.6%;
  display: flex;
}

.top {
  background: #03f965;
  display: flex;
}

* {
  margin: 0;
  padding: 0;
}
</style>

<script setup lang="ts">
import top from "./header/index.vue";

import bodyMain from "./body/index.vue";

import side from "./menu/index.vue";

import footers from "./footer/footer.vue"
</script>
