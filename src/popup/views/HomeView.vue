<template>
  <transition name="fade">
    <div class="flex items-center justify-center mx-2 h-screen space-x-16">
      <section>
        <!-- LOGO -->
        <div class="my-10 flex flex-col justify-center items-center">
          <logo></logo>
        </div>

        <!-- LANGUAGE FORM -->
        <form>
          <select-target />
        </form>

        <div class="mt-12 flex flex-col items-center">
          <h3 class="font-bold text-gray-400">Supported websites</h3>
          <div class="flex justify-center items-center -mt-3">
            <img class="w-32" :src="getAsset('/svg/netflix_logo.svg')" />
            <img class="w-32" :src="getAsset('/svg/youtube_logo.svg')" />
          </div>
        </div>
      </section>

      <div class="text-gray-200 mt-12 w-64 self-start">
        <h3 class="text-lg">How does it work?</h3>
        <p class="text-gray-400">
          Try to open a video on one of the supported websites, then activate
          subtitle on a video and try to hover or click a word.
        </p>

        <h3 class="text-lg mt-10 animate-pulse">
          How to translate multiple words?
        </h3>

        <ul class="list-decimal text-gray-400">
          <li>
            Try to press <span class="font-bold">Ctrl</span> key on Windows or
            <span class="font-bold">Command</span> key on Mac.
          </li>
          <li>Then press and drag your mouse to select multiple words.</li>
          <li>Then The translation will be shown.</li>
        </ul>

        <div class="mt-12">
          <button v-if="!isLogin" @click="openLogin">Login/Register</button>
          <button v-else @click="logout()">Logout</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { OpenLoginWindowMessage } from "../../common/types/messaging";
import { getAsset } from "../helper/assets";
import { isLogin, logout } from "../../plugins/modular-rest";

function openLogin() {
  chrome.runtime.sendMessage(new OpenLoginWindowMessage());
}
</script>
