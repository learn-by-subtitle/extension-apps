<template>
  <!-- 
    TRANSLATE CONTENT
  -->
  <div :style="translateStyle">
    {{normalizePhrase(activeTranslate)}}
  </div>

  <!-- 
      SIMPLE TEXT
  -->
  <div v-if="!hoverable" class="container" :style="subtitleStyle">
    <template v-for="(line, i) in textList" :key="i">
      <br v-if="i > 0" />
      <span>
        {{ str(line) }}
      </span>
    </template>
  </div>

  <!-- 
      HOVERABLE TEXT
  -->
  <div v-else class="container" :style="subtitleStyle">
    <template v-for="(line, i) in textList" :key="i">
      <br v-if="i > 0" />
      <word
        v-for="(word, i2) in line.split(' ')"
        :key="i2"
        :modelValue="str(word) + ' '"
        @mouseenter="activeWord = word"
        @mouseleave="activeWord = ''"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, StyleValue } from "vue";
import { TranslateService } from "../services/translate.service";
import { Dictionary, SubtitleBundingBox } from "../types/general.type";

interface DataModel {
  translatedWords: Dictionary;
  activeWord: string;
}

export default defineComponent({
  props: {
    positionRect: Object,
    textList: [String],
    textStyle: CSSStyleDeclaration,
    hoverable: Boolean,
  },

  data(): DataModel {
    return {
      translatedWords: {},
      activeWord: "",
    };
  },

  computed: {
    subtitleStyle(): StyleValue {
      if (!this.positionRect) return {};

      return {
        position: "absolute",
        background: "black",
        left: this.positionRect.left - 10 + "px",
        top: this.positionRect.top - 10 + "px",
        width: this.positionRect.width + "px",
        height: this.positionRect.height + "px",
        ...this.textStyle as any,
      };
    },

    translateStyle(): StyleValue {
      if (!this.positionRect) return {};

      return {
        position: "absolute",
        "font-size": this.textStyle?.fontSize || "22px",
        // background: "black",
        left: this.positionRect.left - 8 + "px",
        top: this.positionRect.top - 100 + "px",
        width: this.positionRect.width + "px",
        // height: this.positionRect.height + "px",
        textAlign:"center",
        opacity: this.activeWord.length ? 1 : 0,
        transition: 'all ease 200ms'
      };
    },



    activeTranslate() {
      return this.translatedWords[this.activeWord] || ''
    }
  },

  watch: {
    textList: {
      deep: true,
      handler(value: Array<string>, old: Array<string>) {
        if (!value || !value.length) return;
        if (JSON.stringify(value) == JSON.stringify(old)) return;

        this.translateWords();
      },
    },
  },

  methods: {
    str(line: string) {
      return line.replaceAll("<br>", "");
    },

    normalizePhrase(word: string) {
      ["[", "]", "."].forEach((remove) => {
        word = word.replaceAll(remove, "");
      });

      return word;
    },

    getWordList() {
      let list = <string[]>[];
      let lines = this.textList as unknown as Array<string>;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        list = [...list, ...line.split(" ")];
      }

      return list;
    },

    translateWords() {
      let words = this.getWordList();

      TranslateService.instance.translate(words).then((resultList) => {
        words.forEach((word, i) => {
          this.translatedWords[word] = resultList[i];
        });
      });

      console.log("## translateWords", this.translateWords);
    },
  },
});
</script>

<style scoped>
.container {
  padding: 8px 10px;
  text-align: center;
}
</style>