<template>
  <span>{{ modelValue }}</span>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
};
</script>

<style scoped>
span:hover {
  color: yellow;
}
</style>