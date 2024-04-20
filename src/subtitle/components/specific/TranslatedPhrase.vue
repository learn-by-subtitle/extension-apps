<template>
  <div
    class="relative flex-row-reverse flex items-center justify-center space-x-2"
  >
    <div class="flex">
      <Button
        class="mx-1"
        severity="secondary"
        v-for="item in items"
        :key="item.label"
        :icon="item.icon"
        :onClick="item.command"
      />
    </div>

    <div class="p-2 rounded-md" :style="props.textStyle">
      <span>{{ cleanText(props.value) }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { cleanText } from "../../../common/helper/text";
import { defineProps, ref } from "vue";

import Button from "primevue/button";

const props = defineProps<{
  value: string;
  textStyle: any;
}>();

const items = ref([
  {
    label: "Info",
    icon: "i-solar-info-square-linear text-2xl",
    command: () => {
      // toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
    },
  },
  {
    label: "Save",
    icon: "i-solar-bookmark-line-duotone text-2xl",
    command: () => {
      // toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
    },
  },
]);
</script>

<style lang="scss">
.word-options {
  .p-speeddial {
    button {
      scale: 0.5;
    }
  }
}
</style>
