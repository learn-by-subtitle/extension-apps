<template>
  <div
    class="select-text text-gray-900 flex flex-col overflow-hidden px-8 justify-center items-center"
    :style="{
      height: `${height}px`,
      width: `${width}px`,
    }"
  >
    <!-- WORD -->
    <section
      class="mt-40 mb-36 flex flex-col justify-center items-center"
      @click.stop=""
    >
      <div class="flex items-center space-x-5">
        <h1 class="text-9xl white-shadow">{{ title }}</h1>
        <h3 class="text-5xl white-shadow mt-8">{{ phonetic }}</h3>
      </div>

      <div class="mt-20 flex items-center" :dir="dir">
        <span class="text-7xl white-shadow">{{
          $filters.cleanText(translatedWord)
        }}</span>

        <div class="mt-6 scale-75">
          <span
            class="text-xl rounded-md shadow-sm bg-gray-500 text-white justify-end px-3 py-2"
            >{{ targetLanguageTitle }}</span
          >
        </div>
      </div>
    </section>

    <template v-if="store">
      <tabs class="my-4" :list="store.partsOfSpeech" v-model="activeTab" />

      <!-- 
        Definition cards
      -->
      <section class="flex-1 overflow-y-auto w-1/2">
        <template v-for="(part, i) in store.partsOfSpeech" :key="i">
          <div @click.stop="" v-if="activeTab == part" class="flex flex-col">
            <Definition
              class="my-3 shadow-md last:mb-3"
              v-for="(definition, i2) in store.getPartOfSpeech(part)
                .definitions"
              :key="i2"
              :data="definition"
            />
          </div>
        </template>
      </section>
    </template>

    <template v-else-if="pending">
      <div class="my-32 text-3xl text-center text-yellow-200">
        <span>Loading...</span>
      </div>
    </template>

    <template v-else>
      <div class="my-32 text-3xl text-center text-yellow-200">
        <span
          >There is not any definition for {{ $filters.cleanText(word) }}</span
        >
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { cleanText, firstUpper, getDir } from "../../../../common/helper/text";
import { TranslateService } from "../../../../common/services/translate.service";
import { DefinitionStore } from "../../../../common/types/dictionaryapi.type";
import { analytic } from "../../../../plugins/mixpanel";
import Definition from "./Definition.vue";

export default defineComponent({
  props: {
    word: String,
    translatedWord: String,
    language: String,
    height: Number,
    width: Number,
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

  computed: {
    targetLanguageTitle() {
      return TranslateService.instance.targetLanguageTitle;
    },

    dir() {
      return getDir();
    },

    title() {
      let word = this.word;

      if (this.store) word = this.store.word;

      return firstUpper(word || "");
    },

    phonetic() {
      let phonetic = "";

      if (this.store) phonetic = this.store.phonetic;

      return phonetic;
    },
  },

  watch: {
    word: {
      immediate: true,
      handler(value) {
        if (!value) return;

        analytic.track("Word clicked", { word: value });

        this.fetchWordDetail();
      },
    },

    activeTab(value, old) {
      if (old.length) {
        analytic.track("Part of speech switched");
      }
    },
  },

  methods: {
    fetchWordDetail() {
      this.pending = true;

      let cleaned = cleanText(this.word as string);

      TranslateService.instance
        .translateByDictionaryapi(cleaned)
        .then((res) => (this.store = res))
        .finally(() => (this.pending = false));
    },
  },

  components: { Definition: Definition as any },
});
</script>

<style lang="scss" scoped>
.white-shadow {
  color: white;
  text-shadow: 2px 3px 0px #898999;
}
</style>
