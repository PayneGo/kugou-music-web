<template>
  <n-menu :options="menuOptions" @update:value="handleUpdateValue" />
</template>

<script lang="ts">
import { defineComponent, h, Component } from "vue";
import { NIcon, useMessage } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { RouterLink } from "vue-router";

const menuOptions: MenuOption[] = [
  {
    label: "1973年的弹珠玩具",
    key: "pinball-1973",
    disabled: false,
  },
  {
    label: "每日推荐",
    key: "pinball-1973",
    disabled: false,

  },
];

export default defineComponent({
  setup() {
    const message = useMessage();
    return {
      menuOptions,
      handleUpdateValue(key: string, item: MenuOption) {
        message.info("[onUpdate:value]: " + JSON.stringify(key));
        message.info("[onUpdate:value]: " + JSON.stringify(item));
      },
    };
  },
});
</script>
