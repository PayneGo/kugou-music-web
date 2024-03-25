<script setup lang="ts">
import {
  NLoadingBarProvider,
  NMessageProvider,
  useLoadingBar,
  useMessage,
} from "naive-ui";
import { defineComponent, h } from "vue";
import { RouterView } from "vue-router";
import { useProviderStore } from "@/stores/provider";

const provider = useProviderStore();

const ViewComponent = defineComponent({
  render: () => h(RouterView),
  setup: () => {
    provider.setLoadingBar(useLoadingBar());
    provider.setMessage(useMessage());
  },
});
</script>

<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-dialog-provider>
        <router-view />
        <ViewComponent />
      </n-dialog-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<style scoped></style>
