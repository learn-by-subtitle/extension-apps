<template>
  <select-languege
    v-model="lang"
    @update:modelValue="onChanged"
    label="Select target languege"
  />
</template>

<script>
export default {
  data() {
    return {
      lang: "fa",
    };
  },

  mounted() {
    this.lang = localStorage.getItem("target") || "fa";
  },

  methods: {
    onChanged() {
      localStorage.setItem("target", this.lang);

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let tabId = tabs[0].id;

        chrome.tabs.sendMessage(tabId, { target: this.lang });
      });
    },
  },
};
</script>

<style>
</style>