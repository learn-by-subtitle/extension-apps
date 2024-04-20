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

const store = useConsoleCraneStore();
</script>

<template>
  <teleport to="body">
    <modal v-model="store.isActive" v-slot="{ height, width }">
      <section :style="{ width: width + 'px', height: height + 'px' }">
        <router-view class="w-full h-full" />
      </section>
    </modal>
  </teleport>
</template>
