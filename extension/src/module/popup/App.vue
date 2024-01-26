<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { loginWithLastSession } from "../../plugins/modular-rest";

onMounted(() => {
  loginWithLastSession();
});
</script>

<style>
body {
  background-color: #001a35;
  width: 600px;
  height: 600px;
}
</style>
