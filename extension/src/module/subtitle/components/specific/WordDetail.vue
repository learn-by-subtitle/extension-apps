<template>
  <div class="flex flex-col items-center justify-start">
    <div
      class="select-text text-gray-900 flex flex-col overflow-hidden px-20 justify-start items-center"
      :style="{
        height: `${props.height}px`,
        width: `${getWidth()}px`,
      }"
    >
      <!-- WORD -->
      <section
        class="h-1/2 px-[30px] mb-24 flex flex-col justify-end w-full"
        @click.stop=""
      >
        <div class="flex items-center space-x-5 p-5">
          <h1 class="text-9xl white-shadow">{{ title }}</h1>
          <h3 class="text-5xl white-shadow mt-8">{{ phonetic }}</h3>
        </div>

        <Fieldset class="w-full" :legend="targetLanguageTitle">
          <div class="text-center">
            <span class="text-7xl white-shadow">{{
              cleanText(translatedWord!)
            }}</span>
          </div>
        </Fieldset>

        <SaveWord class="my-2" />
      </section>

      <template v-if="store">
        <!-- 
        Definition cards
      -->
        <section class="w-full mt-10">
          <tabs
            class="mb-5 justify-start pl-[30px]"
            :list="store.partsOfSpeech"
            v-model="activeTab"
          />

          <Carousel
            class="w-full"
            :value="meaning?.definitions"
            :page="0"
            :key="activeTab"
            v-if="meaning?.definitions.length"
          >
            <template #item="{ data, index }">
              <Definition class="shadow-md h-full min-h-[100px]" :data="data" />
            </template>
          </Carousel>
        </section>
      </template>

      <template v-else-if="pending">
        <div class="my-32 text-3xl text-center text-yellow-200">
          <span>Loading...</span>
        </div>
      </template>

      <template v-else>
        <div class="my-32 text-3xl text-center text-yellow-200">
          <span>There is not any definition for {{ cleanText(word!) }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { cleanText, firstUpper, getDir } from "../../../../common/helper/text";
import { TranslateService } from "../../../../common/services/translate.service";
import {
  DefinitionStore,
  Meaning,
} from "../../../../common/types/dictionaryapi.type";
import { analytic } from "../../../../plugins/mixpanel";
import Definition from "./Definition.vue";

import Fieldset from "primevue/fieldset";
import SaveWord from "./SaveWord.vue";
import Carousel from "primevue/carousel";

const props = defineProps({
  word: String,
  translatedWord: String,
  language: String,
  height: Number,
  width: Number,
});

const store = ref<DefinitionStore | null>(null);
const pending = ref(false);
const activeTab = ref("");
const meaning = ref<Meaning>();

const targetLanguageTitle = computed(
  () => TranslateService.instance.targetLanguageTitle
);

function getWidth() {
  // maximum with is 780
  return Math.min(780, props.width!);
}

const dir = computed(() => getDir());

const title = computed(() => {
  let word = props.word;
  if (store.value) word = store.value.word;
  return firstUpper(word || "");
});

const phonetic = computed(() => {
  let phonetic = "";
  if (store.value) phonetic = store.value.phonetic;
  return phonetic;
});

watch(
  () => props.word,
  (value) => {
    if (!value) return;
    analytic.track("Word clicked", { word: value });
    fetchWordDetail();
  },
  { immediate: true }
);

watch(
  () => activeTab,
  (value, old) => {
    if (old?.value !== value.value && store.value) {
      analytic.track("Part of speech switched");
    }

    if (value.value.length) {
      meaning.value = store.value!.getPartOfSpeech(value.value);
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

function fetchWordDetail() {
  pending.value = true;
  let cleaned = cleanText(props.word as string);
  TranslateService.instance
    .translateByDictionaryapi(cleaned)
    .then((res) => (store.value = res))
    .finally(() => (pending.value = false));
}
</script>

<style lang="scss" scoped>
.white-shadow {
  color: white;
  text-shadow: 2px 3px 0px #898999;
}
</style>
