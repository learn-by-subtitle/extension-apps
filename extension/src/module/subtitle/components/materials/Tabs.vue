<template>
  <div class="flex justify-center space-x-5 text-2xl">
    <button
      v-for="tab of list"
      :key="tab"
      :class="[
        'rounded-md shadow-sm text-gray-700 px-4 py-3',
        active == tab ? 'bg-pink-500 text-white' : 'bg-white',
      ]"
      @click.stop="activateTab(tab)"
    >
      {{ title(tab) }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    list: {},
    modelValue: String,
  },

  data() {
    return {
      active: "",
    };
  },

  watch: {
    list: {
      immediate: true,
      deep: true,
      handler(list, old) {
        if (!list || !list.length) return;
        if (JSON.stringify(list) == JSON.stringify(old)) return;

        this.activateTab(list[0]);
      },
    },
  },

  methods: {
    activateTab(tab) {
      this.active = tab;
      this.$emit("update:modelValue", tab);
    },

    title(tab) {
      let parts = tab.toLowerCase().split("");
      parts[0] = tab[0].toUpperCase();
      return parts.join("");
    },
  },
};
</script>

<style></style>
