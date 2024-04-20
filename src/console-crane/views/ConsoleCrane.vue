<script setup lang="ts">
/**
 * This is a modal that represents an small app for the user to interact with the subtitles
 * inside websites like Youtube, Netflix, etc. except extension popup app.
 *
 * Use Case to present
 * - Word details
 * - Settings
 */

import { ref, computed, watch } from "vue";
import { useConsoleCraneStore } from "../stores/console-crane";
import { RouterView } from "vue-router";
import Modal from "../components/Modal.vue";
import { SUBTURTLE_DASHBOARD_URL } from "../../common/static/global";
import Button from "primevue/button";

const store = useConsoleCraneStore();

function goToDashboard() {
  window.open(SUBTURTLE_DASHBOARD_URL, "_blank");
}
</script>

<template>
  <teleport to="body">
    <modal v-model="store.isActive" v-slot="{ height, width }">
      <div
        class="flex flex-col py-6"
        :style="{ width: width + 'px', height: height + 'px' }"
      >
        <section class="flex flex-row-reverse justify-between mx-12 mt-6">
          <Button
            severity="info"
            rounded
            label="Go to Dashboard"
            @click="goToDashboard"
          />
        </section>

        <router-view class="w-full flex-1" />
      </div>
    </modal>
  </teleport>
</template>
