<template>
  <div :style="wrapperStyle">
    <!-- 
    TRANSLATED WORD OR CONTENT
    -->
    <div
      class="translated-word flex justify-center"
      :style="translateStyle"
      :dir="dir"
    >
      <TranslatedPhrase
        v-if="activeTranslate.length"
        :value="activeTranslate"
        :textStyle="textStyle"
      />

      <!-- <span v-if="activeTranslate.length" class="p-2" :style="textStyle">{{
        cleanText(activeTranslate)
      }}</span> -->

      <SvgLoader v-else width="40px" asset="WORD_LOADING" />
    </div>

    <!-- SUBTITLE
    -->
    <transition name="fade">
      <div v-if="textList?.length" class="w-full">
        <div ref="subturtleSubtitle" :dir="sourceDir" class="text-left">
          <div v-for="(line, i) in textList" :key="i">
            <p class="pl-2 pr-2 pb-0" :style="textStyle">
              <word
                v-for="(word, i2) in line.split(' ')"
                :key="i2"
                :id="getWordId(i, i2)"
                :modelValue="word + ' '"
                @click="toggleConsoleCrane"
              />
            </p>
          </div>
        </div>
      </div>
    </transition>

    <!-- <teleport to="body">
      <modal v-model="showWordDetail" v-slot="{ height, width }">
        <word-detail
          :height="height"
          :width="width"
          :word="clickedWord"
          :translatedWord="translatedWords[clickedWord]"
        />
      </modal>
    </teleport> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, StyleValue } from "vue";
import { mapState, mapActions } from "pinia";
import { useMarkerStore } from "../../../stores/marker";
import { getDir, rtls, cleanText } from "../../../common/helper/text";
import { TranslateService } from "../../../common/services/translate.service";
import { Dictionary } from "../../../common/types/general.type";
import { analytic } from "../../../plugins/mixpanel";
import { log } from "../../../common/helper/log";
import TranslatedPhrase from "../../components/specific/TranslatedPhrase.vue";
import { useConsoleCraneStore } from "../../../console-crane/stores/console-crane";

interface DataModel {
  translatedWords: Dictionary;
  translatedLines: String[];
  sourceLanguage: string;
  showTranslatedSentence: boolean;
  showWordDetail: boolean;
  clickedWord: string;
}

export default defineComponent({
  props: {
    textList: { type: Object as PropType<string[]> },
    textStyle: Object,
    wrapperStyle: Object,
  },

  data(): DataModel {
    return {
      translatedWords: {},
      translatedLines: [],
      sourceLanguage: "en",
      showTranslatedSentence: false,
      showWordDetail: false,
      clickedWord: "",
    };
  },

  computed: {
    ...mapState(useMarkerStore, ["selectedPhrase", "isMarkingMode"]),

    translateStyle(): StyleValue {
      let bottom = 20;

      if (this.$refs.subturtleSubtitle) {
        // @ts-ignore
        bottom = this.$refs.subturtleSubtitle.clientHeight * 1.5;
      }

      return {
        position: "absolute",
        fontSize: this.textStyle?.fontSize || "22px",
        width: "100%",
        textAlign: "center",
        opacity: this.selectedPhrase.length ? 1 : 0,
        // transition: "all ease 200ms",
        bottom: bottom + "px",
      };
    },

    activeTranslate() {
      return this.translatedWords[this.selectedPhrase] || "";
    },

    iconContainerStyle() {
      return {
        height: "20px",
      };
    },

    dir() {
      return getDir();
    },

    sourceDir() {
      let dir = rtls.indexOf(this.sourceLanguage) != -1 ? "rtl" : "ltr";
      return dir;
    },
  },

  watch: {
    textList: {
      deep: true,
      handler(value: Array<string>, old: Array<string>) {
        if (JSON.stringify(value) == JSON.stringify(old)) return;

        this.clear();

        if (!value || !value.length) {
          this.translatedLines = [];
          return;
        }
      },
    },

    selectedPhrase(value) {
      if (value.length) {
        this.translateWord(value);
        analytic.track("Word hovered", { word: value });
      }
    },

    clickedWord(value) {
      if (value.length) {
        this.translateWord(value);

        // Tracking will be done on word modal
        // analytic.track("Word clicked", { word: value });
      }
    },
  },

  methods: {
    ...mapActions(useMarkerStore, ["clear", "getWordId"]),
    ...mapActions(useConsoleCraneStore, ["toggleConsoleCrane"]),

    onWordClicked(word) {
      if (this.isMarkingMode) return;

      this.clickedWord = word;
      this.showWordDetail = true;
    },

    getWordList() {
      let list: string[] = [];
      let lines = this.textList as unknown as Array<string>;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        list = [...list, ...line.split(" ")];
      }

      return list;
    },

    translateWholeCaption() {
      let words = this.getWordList();
      let translatingList = ["" /*lines.join("\n")*/, ...words];

      TranslateService.instance
        .translateByGoogle(translatingList)
        .then(({ list, lang }) => {
          this.sourceLanguage = lang;

          this.translatedLines = [];
          this.translatedWords = {};

          translatingList.forEach((result, i) => {
            // Translated line
            if (i == 0) {
              this.translatedLines.push(list[i]);
            }
            // Translated Word
            else {
              this.translatedWords[result] = list[i];
            }
          });
        });
    },

    translateWord(word) {
      let translatingList = [word];

      TranslateService.instance
        .translateByGoogle(translatingList)
        .then(({ list, lang }) => {
          this.sourceLanguage = lang;

          translatingList.forEach((result, i) => {
            this.translatedWords[result] = list[i];
          });
        });
    },

    cleanText(text: string) {
      return cleanText(text);
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  text-align: center;
}

.icon {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  left: -32px;
  opacity: 0.5;
  transition: all ease-in 200ms;

  &:hover {
    opacity: 1;
  }

  img {
    cursor: pointer;
    width: 24px;
  }
}

.translated-word {
  span {
    background: rgba(0, 0, 0, 0.635);
    border-radius: 4px;
  }
}
</style>
