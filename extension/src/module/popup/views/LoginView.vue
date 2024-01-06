<template>
  <section class="flex flex-col items-center w-screen">
    <logo class="my-10" only-logo />

    <template v-if="!isLoggedIn">
      <div class="text-center w-80">
        <p class="text-white text-3xl">Welcome to Subturtle!</p>
        <p class="text-gray-200 text-xs mt-2">
          Select one of the following way to login/register.
        </p>
      </div>

      <div class="mt-10 flex flex-col space-y-2">
        <!-- Login with Chrome -->
        <button
          :disabled="pending"
          class="flex items-center justify-center text-white bg-gray-800 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="loginWithChrome"
        >
          <div
            class="p-2 py-3 flex justify-center items-center border-r-[1px] border-gray-900"
          >
            <span class="i-logos-chrome" />
          </div>
          <div class="flex-1 text-left px-4">With Current Chrome User</div>
        </button>

        <!-- Login with Google -->
        <button
          disabled
          class="flex items-center justify-center text-white bg-gray-800 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div
            class="p-2 py-3 flex justify-center items-center border-r-[1px] border-gray-900"
          >
            <span class="i-flat-color-icons-google" />
          </div>
          <div class="flex-1 text-left px-4">With Google Account</div>
        </button>

        <!-- Login with Phone -->
        <button
          disabled
          class="flex items-center justify-center text-white bg-gray-800 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div
            class="p-2 py-3 flex justify-center items-center border-r-[1px] border-gray-900"
          >
            <span class="i-flat-color-icons-phone" />
          </div>
          <div class="flex-1 text-left px-4">With Phone Number</div>
        </button>
      </div>
    </template>

    <template v-else>
      <div class="text-center w-80">
        <p class="text-white text-3xl">Congrats! you are in.</p>
        <p class="text-gray-200 text-base mt-4">
          now you can close this window.
        </p>
      </div>

      <button class="text-gray-200 mt-10 text-lg" @click="closeWindow">
        Close
      </button>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  GetCurrentChromeUserToken,
  StoreUserTokenMessage,
} from "../../../common/types/messaging";
import { sendMessage } from "../helper/massage";
import { get } from "../helper/http";

const pending = ref(false);
const isLoggedIn = ref(false);

async function loginWithChrome() {
  pending.value = true;

  const chromeUserRes = await sendMessage(
    new GetCurrentChromeUserToken()
  ).catch((err) => null);

  if (chromeUserRes && GetCurrentChromeUserToken.checkResponse(chromeUserRes)) {
    const url = `${process.env.SUBTURTLE_WEBSITE}/auth/google/token-login?token=${chromeUserRes.token}`;

    const { status, token } = await get(url, {
      token: chromeUserRes.token,
    }).catch((err) => {
      console.log("err", err);
      return { status: "error", token: null };
    });

    if (status == "success") {
      await sendMessage(new StoreUserTokenMessage(token)).then((res) => {
        isLoggedIn.value = true;
      });
    }
  }

  pending.value = false;
}

// async function loginWithGoogle() {}

function closeWindow() {
  window.close();
}
</script>
