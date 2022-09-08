<template>
  <div class="flex flex-col items-center mx-2">
    <!-- LOGO -->
    <div class="my-10 flex flex-col justify-center items-center">
      <logo></logo>
    </div>

    <!-- LANGUAGE FORM -->
    <form>
      <select-target />
    </form>

    <div class="text-gray-300 mt-12 w-64">
      <h3 class="text-lg">How it works?</h3>
      <p>Try to open a video on one of the suported websites, then activate subtitle and try to hover or click a word.</p>
    </div>

    <div class="mt-12 flex flex-col items-center">
      <h3 class="font-bold text-gray-400">Supported websites</h3>
      <div class="flex justify-center items-center -mt-3">
        <img class="w-32" :src="$getAsset('/svg/netflix_logo.svg')">
        <img class="w-32" :src="$getAsset('/svg/youtube_logo.svg')">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: "fa",
    };
  },
};
</script>

<style>
body {
  background-color: #001a35;
  width: 350px;
  min-height: 300px;
}
</style>