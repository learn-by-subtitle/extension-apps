<template>
  <div class="bg-white rounded-md px-5 py-6 text-2xl">
    <p class="font-medium text-gray-600">{{ data?.definition }}</p>
    <p class="italic text-gray-400">{{ data?.example }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { Definition } from "../../types/dictionaryapi.type";

export default defineComponent({
  props: {
    data: { type: Object as PropType<Definition> },
  },
});
</script>

<style>
</style>