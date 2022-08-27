<template>
  <transition>
    <div class="modal-container overflow-y-auto" @click="close" v-if="modelValue">
      <slot />
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
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  z-index: 99999;

  background-image: linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );

  display: flex;
  justify-content: center;
}

/* Transition */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.9s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>