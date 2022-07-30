<template>
  <!-- 
      SIMPLE TEXT
  -->
  <div v-if="!hoverable" class="container" :style="style">
    <template v-for="(line, i) in textList" :key="i">
      <br v-if="i > 0" />
      <span>
        {{ str(line) }}
      </span>
    </template>
  </div>

  <!-- 
      HOVERABLE TEXT
  -->
  <div v-else class="container" :style="style">
    <template v-for="(line, i) in textList" :key="i">
      <br v-if="i > 0" />
      <word
        v-for="(word, i2) in line.split(' ')"
        :key="i2"
        :modelValue="str(word) + ' '"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, StyleValue } from "vue";

export default defineComponent({
  props: {
    positionRect: Object,
    textList: [String],
    fontSize: String,
    hoverable: Boolean,
  },

  computed: {
    style(): StyleValue {
      if (!this.positionRect) return {};

      return {
        position: "absolute",
        "font-size": this.fontSize || "16px",
        background: "black",
        left: this.positionRect.x - 8 + "px",
        top: this.positionRect.top - 10 + "px",
        width: this.positionRect.width + "px",
        // height: this.positionRect.height + "px",
      };
    },
  },

  methods: {
    str(line: string) {
      return line.replaceAll("<br>", "");
    },
  },
});
</script>

<style scoped>
.container {
  padding: 8px 10px;
  text-align: center;
}
</style>