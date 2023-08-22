<template>
  <span
    @mouseenter="onMouseenter"
    @mouseout="onMouseout"
    :class="{
      selected: checkSelectedWord(id),
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
    ...mapState(useMarkerStore, ["isMarking"]),
  },

  methods: {
    ...mapActions(useMarkerStore, [
      "markWord",
      "toggleMarking",
      "checkSelectedWord",
      "clear",
    ]),

    onMouseenter() {
      this.markWord(this.id, this.modelValue);
    },

    onMouseout() {
      if (!this.isMarking) {
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
  cursor: pointer;
}
</style>
