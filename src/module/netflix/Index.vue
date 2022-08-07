<template>
  <subtitle
    v-show="active"
    :positionRect="position"
    :textList="text"
    :textStyle="style"
    :hoverable="true"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SUBTITLE_CLASS } from "../../config/static";
import { waitUntil } from "../../common/helper/promise";
import { SubtitleBundingBox } from "../../common/types/general.type";

export default defineComponent({
  data(): {
    active: boolean;
    position: SubtitleBundingBox;
    text: string[];
    style: CSSStyleDeclaration | {};
    observer: null | MutationObserver;
    subtitleContainer: null | HTMLElement;
  } {
    return {
      active: false,
      position: { width: 0, top: 0, left: 0, height: 0 },
      text: [],
      style: {},
      observer: null,
      subtitleContainer: null,
    };
  },

  mounted() {
    console.log("Activated for NETFLIX");

    this.addWatcherForSubtitleContainer();
    window.addEventListener("resize", this.addWatcherForSubtitleContainer);
  },

  deactivated() {
    this.observer?.disconnect();
  },

  methods: {
    onSubtileChange() {
      // Hide original Subtitle
      //
      let originalSubtitle = document.querySelector(
        SUBTITLE_CLASS
      ) as HTMLElement;
      originalSubtitle.style.opacity = "0";

      this.active = true;

      // Get first line Rect
      //
      let firstRect = this.subtitleContainer
        ?.querySelector(SUBTITLE_CLASS)
        ?.getBoundingClientRect();

      this.position = {
        width: firstRect?.width || 0,
        top: firstRect?.top || 0,
        left: firstRect?.left || 0,
        height: firstRect?.height || 0,
      };

      let minLeft = this.position.left;
      let minRight = firstRect?.right || 0;
      let minBottom = firstRect?.bottom || 0;

      // Get All lines
      //
      let spans = this.subtitleContainer?.querySelectorAll("span");

      this.text = [];
      spans?.forEach((span) => {
        let innerHTML = span.innerHTML;

        if (!innerHTML.startsWith("<span")) {
          this.text.push(span.textContent as string);

          this.style = {
            fontSize: span.style.fontSize,
            textAlign: span.style.textAlign,
          };

          // Check if this span has bigger width
          // Then replace it width default Rect width
          let spanRect = span.getBoundingClientRect();

          if (spanRect.left < minLeft) {
            minLeft = spanRect.left;
          }

          if (spanRect.right > minRight) {
            minRight = spanRect.right;
          }

          if (spanRect.bottom > minBottom) {
            minBottom = spanRect.bottom;
          }
        }
      });

      // Caculate subtitle bunding box
      this.position.width = minRight - minLeft;
      this.position.height = minBottom - this.position.top;
      this.position.left = minLeft;

      console.log("## Subtitle changed", this.text);
    },

    async addWatcherForSubtitleContainer() {
      console.log("## Seeking for subtitle node");
      await this.findSubtitleContainer();

      if (this.observer) {
        this.observer.disconnect();
      } else {
        this.observer = new MutationObserver(this.onSubtileChange);
      }

      this.observer.observe(this.subtitleContainer as HTMLElement, {
        childList: true,
      });

      console.log("## Watcher added for subtitle node");
    },

    async findSubtitleContainer() {
      await waitUntil(() => !!document.querySelector(SUBTITLE_CLASS));
      this.subtitleContainer = document.querySelector(SUBTITLE_CLASS)
        ?.parentNode as HTMLElement;
    },
  },
});
</script>

<style scoped>
</style>