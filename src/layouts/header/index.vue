<script setup lang="ts">
import { useDialog } from "naive-ui";
import loginDialog from "@/components/home/login.vue";

const dialog = useDialog();

function showLoginDialog() {
  dialog.create({
    showIcon: false,
    closable: false,
    content: () => {
      return h(loginDialog, {});
    },
  });
}
</script>

<template>
  <div class="layout-header">
    <div class="left">
      <span class="logo">ＣＩＬＩＣＩＬＩ</span>
    </div>
    <div class="center">
      <n-input type="text" placeholder="基本的 Input" />
    </div>
    <div class="right">
      <n-button @click="showLoginDialog"> 登录 </n-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-header {
  display: flex;

  height: 40px;

  border-bottom: 1px solid #bab8b8;

  padding: 5px 30px;

  .left {
    width: 40%;

    display: flex;
    align-items: center;

    .logo {
      color: $primary-color;

      font: {
        weight: 2em;
      }
    }
  }

  .center {
    width: 20%;
  }

  .right {
    width: 40%;

    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
