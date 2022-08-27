<template>
  <div class="select-none" :style="style">
    <img class="w-full" :src="logoPath" />
  </div>
</template>

<script>
import { getAsset } from "../../helper/assets";

export default {
  props: {
    size: { type: Number, default: 100 },
  },

  computed: {
    logoPath() {
      return getAsset("logo.jpg");
    },

    style() {
      return {
        width: this.size + "px",
        // height: this.size + "px",
      };
    },
  },
};
</script>