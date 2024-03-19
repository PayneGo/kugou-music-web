import { ref } from "vue";

export function useSearch() {
  const searchInputValue = ref("12312");
  return { searchInputValue };
}
