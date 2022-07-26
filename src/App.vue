<template>
  <NetflixApp v-if="getWebsiteType() == 'NETFLIX'" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NetflixApp from "./module/netflix/NetflixApp.vue";

export default defineComponent({
  components: { NetflixApp },

  methods: {
    getWebsiteType() {
      if (location.hostname.includes("netflix")) {
        return "NETFLIX";
      } else if (location.hostname.includes("youtube")) {
        return "YOUTUBE";
      } else {
        return "UNKNOWN";
      }
    },
  },
});
</script>

<style>
</style>