<template>
  <span
    @mousedown="toggleMarking(true)"
    @mousemove="onMouseenter"
    @mouseout="onMouseout"
    :class="{
      selected: checkedSelected(id),
      pointer: !isMarkingMode && checkedSelected(id),
    }"
    >{{ modelValue }}</span
  >
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { useMarkerStore } from "../../../../stores/marker";
import { defineComponent } from "vue";
import { log } from "../../../../common/helper/log";

export default defineComponent({
  props: {
    id: { type: Number, required: true },
    modelValue: { type: String, required: true },
  },

  mounted() {
    log(this.id, this.modelValue);
  },

  computed: {
    ...mapState(useMarkerStore, ["isMarkingMode", "isMarking"]),
  },

  methods: {
    ...mapActions(useMarkerStore, [
      "markWord",
      "toggleMarkingMode",
      "toggleMarking",
      "checkedSelected",
      "clear",
    ]),

    onMouseenter() {
      // Mark single word
      if (!this.isMarkingMode) {
        this.clear();
        this.markWord(
          this.id,
          this.modelValue,
          this.$el.getBoundingClientRect()
        );
      }

      // Mark multiple words
      if (this.isMarkingMode && this.isMarking) {
        this.markWord(
          this.id,
          this.modelValue,
          this.$el.getBoundingClientRect()
        );
      }
    },

    onMouseout() {
      if (!this.isMarkingMode) {
        this.clear();
      }
    },
  },
});
</script>

<style scoped>
span {
  transition: all ease 200ms;
}

.selected {
  color: yellow !important;
}

.pointer {
  cursor: pointer;
}
</style>
