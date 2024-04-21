<template>
  <section class="h-screen pb-10 flex flex-col justify-between">
    <Carousel :value="slides">
      <template #item="{ data }">
        <img :src="data.image" class="w-full h-auto" />
        <!-- <div class="flex justify-center items-center h-80">
          {{ data.title }}
        </div> -->
      </template>
    </Carousel>

    <section class="px-14 text-lg text-center">
      <p class="text-gray-300 font-thin">
        This is a new way to improve your language skills over your daily
        activities. Login to get started.
      </p>
    </section>

    <section class="flex justify-center">
      <Button :disabled="isLogin" label="Login" @click="openLogin">
        <template #icon> <span class="i-solar-login-3-bold" /> </template>
      </Button>
    </section>

    <!-- <section class="flex flex-col items-center">
      <h3 class="font-bold text-gray-400">Supported websites</h3>
      <div class="flex justify-center items-center -mt-3">
        <img class="w-20" :src="getAsset('/svg/netflix_logo.svg')" />
        <img class="w-20" :src="getAsset('/svg/youtube_logo.svg')" />
      </div>
    </section> -->
  </section>
</template>

<script lang="ts" setup>
import Carousel from "primevue/carousel";
import Button from "primevue/button";
import { OpenLoginWindowMessage } from "../../common/types/messaging";
import { isLogin } from "../../plugins/modular-rest";
import { getAsset } from "../helper/assets";

function openLogin() {
  chrome.runtime.sendMessage(new OpenLoginWindowMessage());
}

const slides = [
  {
    title: "Welcome to Modular!",
    description: "Modular is a new way to manage your online accounts.",
    image: getAsset("/slides/slide02.png"),
  },
  {
    title: "Secure",
    description:
      "Modular uses the latest security standards to keep your data safe.",
    image: getAsset("/slides/slide01.png"),
  },
  // {
  //   title: "Open Source",
  //   description:
  //     "Modular is open source, so you can be sure that your data is safe.",
  //   image: getAsset("/slides/slide01.png"),
  // },
];
</script>
