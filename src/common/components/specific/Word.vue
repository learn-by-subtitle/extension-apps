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
span {
  transition: all ease 200ms;
}

span:hover {
  color: yellow;
  cursor: pointer;
}
</style>