<template>
  <div class="flex flex-col items-center mx-2">
    <!-- LOGO -->
    <div class="my-10 flex flex-col justify-center items-center">
      <logo></logo>
      <h2 class="-ml-2 -mt-2 text-green-200 font-bold">SUBTURTLE</h2>
    </div>

    <!-- LANGUAGE FORM -->
    <form class="">
      <select-target />
    </form>
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