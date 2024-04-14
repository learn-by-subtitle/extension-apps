<template>
  <div class="overflow-visible" :style="wrapperStyle">
    <img :src="data" />
  </div>
</template>

<script>
import assetsData from "../../../../common/static/base64Images.ts";

export default {
  props: {
    asset: String,
    width: String,
    height: String,
    scale: Number,
  },

  data() {
    return {};
  },

  computed: {
    data() {
      return assetsData[this.asset];
    },

    wrapperStyle() {
      let style = {
        width: this.width,
        height: this.height,
      };

      return style;
    },
  },
};
</script>
