<template>
  <div>
    <!-- 
    TRANSLATE CONTENT
  -->
    <div :style="translateStyle">
      {{ normalizePhrase(activeTranslate) }}
    </div>

    <!-- 
    SUBTITLE
  -->
    <div v-if="textList?.length" class="container" :style="subtitleStyle">
      <!-- 
      TRANSLATE ICON
    -->
      <div class="icon" :style="iconContainerStyle">
        <img
          v-if="!translateAll"
          :src="translateIcon"
          @click="translateAll = true"
        />
        <img
          v-if="translateAll"
          :src="closeIcon"
          @click="translateAll = false"
        />
      </div>

      <!-- 
      TRANSLATED LINES
    -->
      <div v-if="translateAll">
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
      <div v-else>
        <template v-for="(line, i) in textList" :key="i">
          <br v-if="needBreak(i)" />
          <word
            v-for="(word, i2) in line.split(' ')"
            :key="i2"
            :modelValue="word + ' '"
            @mouseenter="activeWord = word"
            @mouseleave="activeWord = ''"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, StyleValue } from "vue";
import { clamp } from "../helper/math";
import { TRANSLATE_ICON, CLOSE_ICON } from "../icons/icons";
import { TranslateService } from "../services/translate.service";
import { Dictionary } from "../types/general.type";

interface DataModel {
  translatedWords: Dictionary;
  translatedLines: String[];
  activeWord: string;
  translateAll: boolean;
}

export default defineComponent({
  props: {
    positionRect: Object,
    textList: [String],
    textStyle: Object,
  },

  data(): DataModel {
    return {
      translatedWords: {},
      translatedLines: [],
      activeWord: "",
      translateAll: false,
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
        // background: "black",
        left: this.positionRect.left - 10 + "px",
        top: this.positionRect.top - 10 + "px",
        width: this.positionRect.width + "px",
        // height: this.positionRect.height + "px",
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
        // background: "black",
        left: this.positionRect.left - 8 + "px",
        top: top + "px",
        width: this.positionRect.width + "px",
        // height: this.positionRect.height + "px",
        textAlign: "center",
        opacity: this.activeWord.length ? 1 : 0,
        transition: "all ease 200ms",
      };
    },

    activeTranslate() {
      return this.translatedWords[this.activeWord] || "";
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
  },

  watch: {
    textList: {
      deep: true,
      handler(value: Array<string>, old: Array<string>) {
        if (JSON.stringify(value) == JSON.stringify(old)) return;

        this.activeWord = "";

        if (!value || !value.length) return;

        this.translateWords();
      },
    },
  },

  methods: {
    needBreak(i: number) {
      return !!(i > 0);
    },
    normalizePhrase(word: string) {
      ["[", "]", "."].forEach((remove) => {
        word = word.replaceAll(remove, "");
      });

      return word;
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
        .translate(translatingList)
        .then((resultList) => {
          translatingList.forEach((result, i) => {
            // Translated line
            if (i == 0) {
              this.translatedLines.push(resultList[i]);
            }
            // Translated Word
            else {
              this.translatedWords[result] = resultList[i];
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
  opacity: 0.3;
  transition: all ease-in 200ms;

  &:hover {
    opacity: 1;
  }

  img {
    cursor: pointer;
    width: 24px;
  }
}
</style>