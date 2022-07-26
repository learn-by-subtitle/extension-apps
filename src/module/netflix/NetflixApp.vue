<template>
  <subtitle
    v-show="active"
    :positionRect="position"
    :text="text"
    :fontSize="fontSize"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SUBTITLE_CLASS } from "../../config/static";
import { wait, waitUntil } from "../../common/helper/promise";

export default defineComponent({
  data(): {
    active: boolean;
    position: null | DOMRect;
    text: string;
    fontSize: string;
    observer: null | MutationObserver;
    subtitleContainer: null | HTMLElement;
  } {
    return {
      active: false,
      position: null,
      text: "",
      fontSize: "",
      observer: null,
      subtitleContainer: null,
    };
  },

  mounted() {
    console.log("from Netflix app");
    this.addWatcherForSubtitleContainer();
  },

  deactivated() {
    this.observer?.disconnect();
  },

  methods: {
    onSubtileChange() {
      console.log("Subtitle changed");

      this.active = true;
      this.position = this.subtitleContainer
        ?.querySelector(SUBTITLE_CLASS)
        ?.getBoundingClientRect() as DOMRect;

      let spans = this.subtitleContainer?.querySelectorAll("span");

      this.text = "";
      spans?.forEach((span) => {
        if (!this.text.includes(span.textContent || ""))
          this.text += span.textContent;

        this.fontSize = span.style.fontSize;
      });

      console.log(this.position);
    },

    async addWatcherForSubtitleContainer() {
      await this.findSubtitleContainer();

      this.observer = new MutationObserver(this.onSubtileChange);
      this.observer.observe(this.subtitleContainer as HTMLElement, {
        childList: true,
      });
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