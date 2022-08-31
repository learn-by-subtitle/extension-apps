<template>
  <transition>
    <div
      class="modal-container overflow-y-auto"
      @click="close"
      v-if="modelValue"
    >
      <slot />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { wait } from "../../../../common/helper/promise";

export default defineComponent({
  props: {
    modelValue: Boolean,
  },

  data() {
    return {
      defaultBodyOverflowY: document.body.style.overflowY,
    };
  },

  watch: {
    modelValue(key) {
      if (key) {
        document.body.style.overflowY = "hidden";
      } else {
        wait(0.1).then((_) => {
          document.body.style.overflowY = this.defaultBodyOverflowY;
        });
      }
    },
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
  top: 0;
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
</style>