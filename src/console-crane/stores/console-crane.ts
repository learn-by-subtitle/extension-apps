import { defineStore } from "pinia";
import { ref } from "vue";

export const useConsoleCraneStore = defineStore("console-crane", () => {
  const isActive = ref(false);

  function toggleConsoleCrane(active: boolean | null = null) {
    isActive.value = Boolean(active) || !isActive.value;
  }

  return {
    isActive,
    toggleConsoleCrane,
  };
});
