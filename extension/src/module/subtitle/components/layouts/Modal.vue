<template>
  <transition>
    <div
      class="fixed bg-[#000000cc] z-[9999] w-screen h-screen"
      @click="close"
      v-show="modelValue"
    >
      <section
        class="absolute rounded-md mx-60 my-32 top-0 left-0 right-0 bottom-0 gradient-background"
        ref="modalContentContainer"
      >
        <!-- Close button -->
        <Button
          rounded
          severity="secondary"
          @click="close"
          size="small"
          class="absolute right-[32px] left-[calc(100%-16px)] top-[-16px]"
        >
          <template #icon>
            <span class="i-mdi-close text-white scale-[2]" />
          </template>
        </Button>

        <!-- Content -->
        <div
          class="overflow-hidden"
          v-if="contentSize.width"
          :style="{
            width: `${contentSize.width}px`,
            height: `${contentSize.height}px`,
          }"
        >
          <slot :width="contentSize.width" :height="contentSize.height" />
        </div>
      </section>
    </div>
  </transition>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { ref, watch, onMounted, computed, nextTick } from "vue";
import { wait } from "../../../../common/helper/promise";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Boolean,
});

const modalContentContainer = ref<HTMLElement | null>(null);
const contentSize = ref({ width: 0, height: 0 });

function getContentSize() {
  if (!modalContentContainer.value) return;

  contentSize.value = {
    width: modalContentContainer.value.clientWidth,
    height: modalContentContainer.value.clientHeight,
  };
}

const defaultBodyOverflowY = ref("");

onMounted(() => {
  defaultBodyOverflowY.value = document.body.style.overflowY;
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      document.body.style.overflowY = "hidden";
    } else {
      wait(0.1).then(() => {
        document.body.style.overflowY = defaultBodyOverflowY.value;
      });
    }

    nextTick(getContentSize);
  }
);

const close = (event: MouseEvent) => {
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
.gradient-background {
  background-image: linear-gradient(
    to right top,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );
}
</style>
