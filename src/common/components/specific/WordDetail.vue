<template>
  <div class="w-3/4 xl:w-3/5 2xl:w-1/2 text-gray-900">
    <template v-if="store">
      <!-- WORD -->
      <section
        class="mt-40 mb-36 flex justify-center items-center"
        @click.stop=""
      >
        <div class="flex items-center space-x-5">
          <h1 class="text-9xl white-shadow">{{ store.word }}</h1>
          <h3 class="text-5xl white-shadow mt-8">{{ store.phonetic }}</h3>
        </div>
      </section>

      <tabs class="my-4" :list="store.partsOfSpeech" v-model="activeTab" />

      <!-- 
        Definition cards
      -->
      <template v-for="(part, i) in store.partsOfSpeech" :key="i">
        <div
          @click.stop=""
          v-if="activeTab == part"
          class="flex flex-col"
        >
          <Definition
            class="my-2 shadow-md last:mb-3"
            v-for="(definition, i2) in store.getPartOfSpeech(part).definitions"
            :key="i2"
            :data="definition"
          />
        </div>
      </template>
    </template>

    <template v-else-if="pending">
      <span>Loading...</span>
    </template>

    <template v-else>
      <span>There is not any definition for {{ word }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { cleanText } from "../../helper/text";
import { TranslateService } from "../../services/translate.service";
import { DefinitionStore } from "../../types/dictionaryapi.type";
import Definition from "./Definition.vue";

export default defineComponent({
  props: {
    word: String,
    language: String,
  },
  data(): {
    store: DefinitionStore | null;
    pending: Boolean;
    activeTab: string;
  } {
    return {
      store: null,
      pending: false,
      activeTab: "",
    };
  },
  watch: {
    word: {
      immediate: true,
      handler(value) {
        if (!value || this.language == "en") return;
        this.translate();
      },
    },
  },
  mounted() {
    console.log("Word detail mounted");
  },
  methods: {
    translate() {
      this.pending = true;
      let cleaned = cleanText(this.word as string);
      TranslateService.instance
        .translateByDictionaryapi(cleaned)
        .then((res) => (this.store = res))
        .finally(() => (this.pending = false));
    },
  },
  components: { Definition },
});
</script>

<style lang="scss" scoped>
.white-shadow {
  color: white;
  text-shadow: 2px 3px 0px #898999;
}
</style>