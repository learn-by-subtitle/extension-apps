<template>
  <div v-if="active">
    <teleport to="#ytp-caption-window-container">
      <SubtitleComponent
        id="subturtle-caption"
        class="
          caption-window
          ytp-caption-window-bottom ytp-caption-window-rollup
        "
        v-show="active"
        :wrapperStyle="wrapperStyle"
        :textList="text"
        :textStyle="style"
      />
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
  SUBTILE_CONTAINER_CLASS,
  SUBTITLE_CLASS,
  SUBTITLE_LINE_CLASS,
} from "./static";

import { Interval, waitUntil } from "../../../common/helper/promise";
import SubtitleComponent from "./components/Subtitle.vue";
import {
  getComputedStyles,
  mapStyleString,
} from "../../../common/helper/object";

export default defineComponent({
  components: { SubtitleComponent },

  data(): {
    active: boolean;
    text: string[];
    style: CSSStyleDeclaration | { [key: string]: string };
    wrapperStyle: {};
    observer: null | MutationObserver;
    subtitleContainer: null | HTMLElement;
    interval?: Interval;
  } {
    return {
      active: false,
      text: [],
      wrapperStyle: {},
      style: {},
      observer: null,
      subtitleContainer: null,
    };
  },

  mounted() {
    console.log("Activated for Youtube");

    this.interval = new Interval(200, this.onSeekForSubtitle);
    this.interval.start();
  },

  unmounted() {
    this.interval?.stop();

    if (this.observer) {
      this.observer?.disconnect();
    }
  },

  methods: {
    onSubtileChange() {
      // Get All lines
      //
      let linesElements = this.subtitleContainer?.querySelectorAll(
        SUBTITLE_LINE_CLASS
      ) as unknown as HTMLElement[];

      this.text = [];

      // Loop lines
      //
      linesElements?.forEach((wrapper) => {
        // Extract text
        //
        this.text.push(wrapper.textContent?.toString()!);

        // Extract styles
        //
        let styleStr = wrapper.getAttribute("style");
        this.style = mapStyleString(styleStr || "");
      });

      let linesWrapper = this.subtitleContainer?.querySelector(SUBTITLE_CLASS);
      let wrapperStyleString = linesWrapper?.getAttribute("style");

      let captionsTextElement = this.subtitleContainer
        ?.querySelector(SUBTITLE_CLASS)
        ?.querySelector(".captions-text");

      let innerWrapperStyle = mapStyleString(
        captionsTextElement?.getAttribute("style") || ""
      );

      this.wrapperStyle = {
        ...mapStyleString(wrapperStyleString || ""),
        ...getComputedStyles(["font-size"], captionsTextElement!),
        ...getComputedStyles(["margin-bottom"], linesWrapper!),
        transform: innerWrapperStyle["transform"],
        zIndex: "50",
        overflow: "unset",
      };
    },

    addWatcherForSubtitleContainer() {
      if (this.observer) {
        this.observer.disconnect();
      }

      this.observer = new MutationObserver(this.onSubtileChange);

      this.observer.observe(this.subtitleContainer as HTMLElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    },

    onSeekForSubtitle(interval: Interval) {
      let exists = !!document.querySelector(SUBTILE_CONTAINER_CLASS);

      // When subtitle dosent exist
      //
      if (!exists) {
        this.active = false;

        if (this.observer) {
          this.observer?.disconnect();
        }
      }

      // When subtitle exists but is off
      //
      else if (exists && !this.active) {
        this.active = true;

        this.subtitleContainer = document.querySelector(
          SUBTILE_CONTAINER_CLASS
        );

        this.addWatcherForSubtitleContainer();
      }

      interval.next();
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