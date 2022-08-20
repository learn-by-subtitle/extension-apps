<template>
  <div class="bg-white rounded-md px-6 py-7 text-gray-600">
    <p class="font-medium text-4xl">{{ data?.definition }}</p>
    <p class="italic text-gray-400 text-3xl mt-3">{{ data?.example }}</p>

    <div class="my-10" v-if="antonyms.length || synonyms.length" />

    <div v-if="antonyms.length">
      <p class="text-2xl">
        <span class="font-bold">Antonyms: </span><span>{{ antonyms }}</span>
      </p>
    </div>

    <div v-if="synonyms.length">
      <p class="text-2xl">
        <span class="font-bold">Synonyms: </span><span>{{ synonyms }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import { Definition } from "../../../../common/types/dictionaryapi.type";

export default defineComponent({
  props: {
    data: { type: Object as PropType<Definition> },
  },

  computed: {
    antonyms() {
      let antonyms = "";

      if (this.data?.antonyms && this.data?.antonyms.length) {
        antonyms = this.data?.antonyms.join(", ");
      }

      return antonyms;
    },

    synonyms() {
      let synonyms = "";

      if (this.data?.synonyms && this.data?.synonyms.length) {
        synonyms = this.data?.synonyms.join(", ");
      }

      return synonyms;
    },
  },
});
</script>

<style>
</style>