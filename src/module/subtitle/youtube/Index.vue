<template>
  <teleport to="#ytp-caption-window-container">
    <!-- <div class="subturtle-container"> -->
    <SubtitleComponent
      id="subturtle-caption"
      class="caption-window ytp-caption-window-bottom ytp-caption-window-rollup"
      v-show="active"
      :wrapperStyle="wrapperStyle"
      :textList="text"
      :textStyle="style"
    />
    <!-- </div> -->
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
  SUBTILE_CONTAINER_CLASS,
  SUBTITLE_CLASS,
  SUBTITLE_LINE_CLASS,
} from "./static";

import { waitUntil } from "../../../common/helper/promise";
import { SubtitleBundingBox } from "../../../common/types/general.type";

import SubtitleComponent from "./components/Subtitle.vue";
import { mapStyleString } from "../../../common/helper/object";

export default defineComponent({
  components: { SubtitleComponent },

  data(): {
    active: boolean;
    key: number;
    text: string[];
    style: CSSStyleDeclaration | { [key: string]: string };
    wrapperStyle: {};
    observer: null | MutationObserver;
    subtitleContainer: null | HTMLElement;
  } {
    return {
      active: false,
      key: 1,
      text: [],
      wrapperStyle: {},
      style: {},
      observer: null,
      subtitleContainer: null,
    };
  },

  mounted() {
    console.log("Activated for Youtube");

    this.addWatcherForSubtitleContainer();
    window.addEventListener("resize", this.addWatcherForSubtitleContainer);
  },

  unmounted() {
    debugger;
    if (this.observer) {
      this.observer?.disconnect();
    }
  },

  methods: {
    onSubtileChange() {
      this.active = true;
      this.key = new Date().getTime();

      // Get All lines
      //
      let linesWraper = this.subtitleContainer?.querySelectorAll(
        SUBTITLE_LINE_CLASS
      ) as unknown as HTMLElement[];

      this.text = [];

      // Loop lines
      //
      linesWraper?.forEach((wrapper) => {
        // Extract text
        //
        this.text.push(wrapper.textContent?.toString()!);

        // Extract styles
        //
        let styleStr = wrapper.getAttribute("style");
        this.style = mapStyleString(styleStr || "");
      });

      let wrapperStyleString = this.subtitleContainer
        ?.querySelector(SUBTITLE_CLASS)
        ?.getAttribute("style");

      let captionsText = this.subtitleContainer
        ?.querySelector(SUBTITLE_CLASS)
        ?.querySelector(".captions-text");

      let innerWrapperStyle = mapStyleString(
        captionsText?.getAttribute("style") || ""
      );

      // @ts-ignore
      let fontSize = captionsText?.computedStyleMap().get("font-size");
      if (fontSize) {
        fontSize = fontSize.value + fontSize.unite;
      }

      this.wrapperStyle = {
        ...mapStyleString(wrapperStyleString || ""),
        transform: innerWrapperStyle["transform"],
        fontSize: fontSize,
        zIndex: "50",
        overflow: "unset",
      };
    },

    async addWatcherForSubtitleContainer() {
      await this.findSubtitleContainer();

      if (this.observer) {
        this.observer.disconnect();
      } else {
        this.observer = new MutationObserver(this.onSubtileChange);
      }

      this.observer.observe(this.subtitleContainer as HTMLElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    },

    async findSubtitleContainer() {
      await waitUntil(() => {
        return !!document.querySelector(SUBTILE_CONTAINER_CLASS);
      });

      this.subtitleContainer = document.querySelector(SUBTILE_CONTAINER_CLASS);
    },
  },
});
</script>

<style>
.subturtle-container {
  width: 100%;
  position: absolute;
  z-index: 40;
}
</style>