<template>
  <div>
    <!-- 
    TRANSLATE CONTENT
  -->
    <div class="translated-word" :style="translateStyle" :dir="dir">
      <span>{{ $filters.cleanText(activeTranslate) }}</span>
    </div>

    <!-- 
    SUBTITLE
  -->
    <div v-if="textList?.length" class="container" :style="subtitleStyle">
      <!-- ICON -->
      <div class="icon" :style="iconContainerStyle">
        <img
          v-if="!showTranslatedSentence"
          :src="translateIcon"
          @click="showTranslatedSentence = true"
        />
        <img
          v-if="showTranslatedSentence"
          :src="closeIcon"
          @click="showTranslatedSentence = false"
        />
      </div>

      <!-- TRANSLATED LINES -->
      <div v-if="showTranslatedSentence" :dir="dir">
        <template v-for="(line, i) in lines" :key="i">
          <br v-if="needBreak(i)" />
          <span>
            {{ line }}
          </span>
        </template>
      </div>

      <!-- 
      TRANSLATE WORDS
    -->
      <div v-else :dir="sourceDir">
        <template v-for="(line, i) in textList" :key="i">
          <br v-if="needBreak(i)" />
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
        </template>
      </div>
    </div>

    <modal v-model="showWordDetail">
      <word-detail
        :word="activeWord"
        :translatedWord="translatedWords[activeWord]"
      />
    </modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, StyleValue } from "vue";
import { clamp } from "../../helper/math";
import { getDir, rtls } from "../../helper/text";
import { TRANSLATE_ICON, CLOSE_ICON } from "../../icons/icons";
import { TranslateService } from "../../services/translate.service";
import { Dictionary } from "../../types/general.type";

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
    lines() {
      let lines = this.translatedLines.length
        ? this.translatedLines
        : this.textList;

      return lines as string[];
    },

    subtitleStyle(): StyleValue {
      if (!this.positionRect) return {};

      return {
        position: "absolute",
        left: this.positionRect.left - 10 + "px",
        top: this.positionRect.top - 10 + "px",
        width: this.positionRect.width + "px",
        ...(this.textStyle as any),
      };
    },

    translateStyle(): StyleValue {
      if (!this.positionRect) return {};

      let top =
        this.positionRect.top - clamp(this.positionRect.height, 50, 100);

      return {
        position: "absolute",
        "font-size": this.textStyle?.fontSize || "22px",
        left: this.positionRect.left - 8 + "px",
        top: top + "px",
        width: this.positionRect.width + "px",
        textAlign: "center",
        opacity: this.hoveredWord.length ? 1 : 0,
        transition: "all ease 200ms",
      };
    },

    activeTranslate() {
      return this.translatedWords[this.hoveredWord] || "";
    },

    iconContainerStyle() {
      return {
        height: this.positionRect?.height + "px",
      };
    },

    translateIcon() {
      return TRANSLATE_ICON;
    },

    closeIcon() {
      return CLOSE_ICON;
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

        if (!value || !value.length) return;

        this.translateWords();
      },
    },
  },

  methods: {
    needBreak(i: number) {
      return !!(i > 0);
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

    translateWords() {
      let words = this.getWordList();
      let lines = this.textList as unknown as Array<string>;
      let translatingList = [lines.join("\n"), ...words];

      this.translatedLines = [];
      this.translatedWords = {};

      TranslateService.instance
        .translateByGoogle(translatingList)
        .then(({ list, lang }) => {
          this.sourceLanguage = lang;

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
  },
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  padding: 8px 10px;
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
    padding: 4px 10px;
    border-radius: 4px;
  }
}
</style>