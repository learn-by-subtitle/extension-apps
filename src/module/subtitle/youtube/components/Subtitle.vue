<template>
  <div :style="wrapperStyle">
    <!-- 
    TRANSLATE CONTENT
    -->
    <div class="translated-word" :style="translateStyle" :dir="dir">
      <span class="p-2" :style="textStyle">{{
        $filters.cleanText(activeTranslate)
      }}</span>
    </div>

    <!-- SUBTITLE
    -->
    <transition name="fade">
      <div v-if="textList?.length" class="w-full">
        <!-- ICON 
        -->
        <!-- <translate-button
          :style="iconContainerStyle"
          v-model="showTranslatedSentence"
        /> -->

        <!-- TRANSLATED LINES 
        -->
        <!-- <template v-if="showTranslatedSentence">
          <div :dir="dir">
            <p class="pl-2 pr-2 pb-0" :style="textStyle" v-for="(line, i) in translatedLines" :key="i">
              {{ line }}
            </p>
          </div>
        </template> -->

        <!-- SUBTITLE
        -->
        <div ref="subturtleSubtitle" :dir="sourceDir" class="text-left">
          <div v-for="(line, i) in textList" :key="i">
            <p class="pl-2 pr-2 pb-0" :style="textStyle">
              <word
                v-for="(word, i2) in line.split(' ')"
                :key="i2"
                :modelValue="word + ' '"
                @mouseenter="hoveredWord = word"
                @mouseleave="hoveredWord = ''"
                @click="
                  showWordDetail = true;
                  activeWord = word;
                "
              />
            </p>
          </div>
        </div>
      </div>
    </transition>

    <teleport to="body">
      <modal v-model="showWordDetail">
        <word-detail
          :word="activeWord"
          :translatedWord="translatedWords[activeWord]"
        />
      </modal>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, StyleValue } from "vue";
import { getDir, rtls } from "../../../../common/helper/text";
import { TranslateService } from "../../../../common/services/translate.service";
import { Dictionary } from "../../../../common/types/general.type";
import { analytic } from "../../../../plugins/mixpanel";

interface DataModel {
  translatedWords: Dictionary;
  translatedLines: String[];
  hoveredWord: string;
  activeWord: string;
  sourceLanguage: string;
  showTranslatedSentence: boolean;
  showWordDetail: boolean;
}

export default defineComponent({
  props: {
    positionRect: Object,
    textList: { type: Object as PropType<string[]> },
    textStyle: Object,
    wrapperStyle: Object,
  },

  data(): DataModel {
    return {
      translatedWords: {},
      translatedLines: [],
      hoveredWord: "",
      activeWord: "",
      sourceLanguage: "en",
      showTranslatedSentence: false,
      showWordDetail: false,
    };
  },

  computed: {
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
        opacity: this.hoveredWord.length ? 1 : 0,
        transition: "all ease 200ms",
        bottom: bottom + "px",
      };
    },

    activeTranslate() {
      return this.translatedWords[this.hoveredWord] || "";
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

        this.hoveredWord = "";

        if (!value || !value.length) {
          this.translatedLines = [];
          return;
        }

        // this.translateWords();
      },
    },

    hoveredWord(value) {
      if (value.length) {
        this.translateWord(value);
        analytic.track("Word hovered", { word: value });
      }
    },
  },

  methods: {
    getWordList() {
      let list: string[] = [];
      let lines = this.textList as unknown as Array<string>;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        list = [...list, ...line.split(" ")];
      }

      return list;
    },

    translateWords() {
      let words = this.getWordList();
      let lines = this.textList as unknown as Array<string>;
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