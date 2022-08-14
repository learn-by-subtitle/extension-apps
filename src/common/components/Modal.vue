<template>
  <transition>
    <div class="modal-container" @click="close" v-if="modelValue">
      <div @click.stop="">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    modelValue: Boolean,
  },

  methods: {
    close(event: MouseEvent) {
      this.$emit("update:modelValue", false);
    },
  },
});
</script>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 50%);

  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

/* Transition */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>