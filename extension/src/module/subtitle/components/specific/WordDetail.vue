<template>
  <div
    class="select-text text-gray-900 flex flex-col overflow-hidden px-20 justify-start items-center"
    :style="{
      height: `${height}px`,
      width: `${width}px`,
    }"
  >
    <!-- WORD -->
    <section class="my-16 border-solid overflow-hidden" @click.stop="">
      <div class="flex-1 flex items-center space-x-5 p-5">
        <h1 class="text-9xl white-shadow">{{ title }}</h1>
        <h3 class="text-5xl white-shadow mt-8">{{ phonetic }}</h3>
      </div>

      <Fieldset :legend="targetLanguageTitle">
        <div class="text-center">
          <span class="text-7xl white-shadow">{{
            cleanText(translatedWord!)
          }}</span>
        </div>
      </Fieldset>

      <SaveWord class="my-2" />
    </section>

    <template v-if="store">
      <section class="flex justify-between">
        <tabs
          class="mb-5 justify-start flex-1"
          :list="store.partsOfSpeech"
          v-model="activeTab"
        />
      </section>

      <!-- 
        Definition cards
      -->
      <section class="flex-1 overflow-y-auto">
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
        <span>There is not any definition for {{ cleanText(word!) }}</span>
      </div>
    </template>

    <OverlayPanel ref="collectionToggle">
      <h1>
        <span class="text-3xl">Collection</span>
      </h1>
    </OverlayPanel>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { cleanText, firstUpper, getDir } from "../../../../common/helper/text";
import { TranslateService } from "../../../../common/services/translate.service";
import { DefinitionStore } from "../../../../common/types/dictionaryapi.type";
import { analytic } from "../../../../plugins/mixpanel";
import Definition from "./Definition.vue";

import Button from "primevue/button";
import OverlayPanel from "primevue/overlaypanel";
import Fieldset from "primevue/fieldset";
import SaveWord from "./SaveWord.vue";

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

const targetLanguageTitle = computed(
  () => TranslateService.instance.targetLanguageTitle
);

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

watch(activeTab, (value, old) => {
  if (old.length) {
    analytic.track("Part of speech switched");
  }
});

function fetchWordDetail() {
  pending.value = true;
  let cleaned = cleanText(props.word as string);
  TranslateService.instance
    .translateByDictionaryapi(cleaned)
    .then((res) => (store.value = res))
    .finally(() => (pending.value = false));
}

const collectionToggle = ref<OverlayPanel>();
function toggleCollectionPanel(event) {
  collectionToggle.value?.toggle(event);
}
</script>

<style lang="scss" scoped>
.white-shadow {
  color: white;
  text-shadow: 2px 3px 0px #898999;
}
</style>
