<template>
  <subtitle
    v-show="active"
    :positionRect="position"
    :textList="textList"
    :fontSize="fontSize"
    :hoverable="true"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SUBTITLE_CLASS } from "../../config/static";
import { waitUntil } from "../../common/helper/promise";

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

  computed: {
    textList(): Array<string> {
      return this.text.split("<br>");
    },
  },

  mounted() {
    console.log("Activated for NETFLIX");
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
        let innerHTML = span.innerHTML;

        if (!innerHTML.startsWith("<span")) {
          this.text += innerHTML;
          this.fontSize = span.style.fontSize;
        }
      });      
    },

    async addWatcherForSubtitleContainer() {
      console.log("## Seeking for subtitle node");
      await this.findSubtitleContainer();

      this.observer = new MutationObserver(this.onSubtileChange);
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