<template>
  <span
    :id="id"
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
    id: { type: String, required: true },
    modelValue: { type: String, required: true },
  },

  computed: {
    ...mapState(useMarkerStore, ["isMarkingMode", "isMarking"]),
  },

  methods: {
    ...mapActions(useMarkerStore, [
      "markWord",
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
          this.modelValue?.trim(),
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
      return;
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
