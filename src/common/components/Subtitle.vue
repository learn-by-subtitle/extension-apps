<template>
  <div class="container" :style="style">
    <div>{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    positionRect: Object,
    text: String,
    fontSize: String,
  },

  computed: {
    style() {
      if (!this.positionRect) return {};

      return {
        position: "absolute",
        "font-size": this.fontSize || "16px",
        background: "red",
        left: this.positionRect.x + "px",
        top: this.positionRect.top + "px",
        width: this.positionRect.width + "px",
        height: this.positionRect.height + "px",
      };
    },
  },
};
</script>

<style scoped>
.container {
  padding: 8px 10px;
}
</style>