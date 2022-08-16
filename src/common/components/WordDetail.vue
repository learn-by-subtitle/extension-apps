<template>
  <div class="word-detail">
    <template v-if="store">
      <!-- WORD -->
      <h1 class="word white-shadow">{{ store.word }}</h1>
      <h3 class="phonetic white-shadow">{{ store.phonetic }}</h3>

      <div>
        <span v-for="(part, i) of store.partsOfSpeech" :key="i">
          {{ part + "  " }}
        </span>
      </div>
      <!-- <div class="card" v-for="(detail, i) of store" :key="i">
        <h1>{{ detail.word }}</h1>
        <h2>{{ detail.phonetic }}</h2>

        <div class="meaning" v-for="(meaning, im) of detail.meanings" :key="im">
          <h4>{{ meaning.partOfSpeech }}</h4>
          <div v-for="(def, id) of meaning.definitions" :key="id">
            <p>
              definition:<br />
              {{ def.definition }}
            </p>
            <p>
              Example:<br />
              {{ def.example }}
            </p>
          </div>
        </div>
      </div> -->
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
import { cleanText } from "../helper/text";
import { TranslateService } from "../services/translate.service";
import { DefinitionStore } from "../types/dictionaryapi.type";

export default defineComponent({
  props: {
    word: String,
    language: String,
  },

  data(): {
    store: DefinitionStore | null;
    pending: Boolean;
  } {
    return {
      store: null,
      pending: false,
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
});
</script>

<style lang="scss" scoped>
.word-detail {
  // background-color: white;
  height: 50vh;
  width: 50vw;
  color: black;
  font-size: 16px;
  overflow-y: auto;

  min-width: 400px;
  max-width: 940px;
  min-height: 400px;
  max-height: 760px;
}

.white-shadow {
  color: white;
  text-shadow: 2px 3px 0px #898999;
}
.word {
  font-weight: bold;
  line-height: 1.2;
  text-align: center;
  margin-bottom: 5px;
}

.phonetic {
  text-align: center;
  margin: 0;
}
</style>