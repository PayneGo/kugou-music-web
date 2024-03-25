// src/stores/provider.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { LoadingBarApi, MessageApi } from "naive-ui";

export const useProviderStore = defineStore("provider", () => {
  const loadingBar = ref<LoadingBarApi>();

  function setLoadingBar(b: LoadingBarApi) {
    loadingBar.value = b;
  }

  const message = ref<MessageApi>();

  function setMessage(b: MessageApi) {
    message.value = b;
  }

  return { loadingBar, setLoadingBar, message, setMessage };
});
