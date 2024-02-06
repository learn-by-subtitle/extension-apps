<template>
  <Inputgroup>
    <!-- <InputGroupAddon>
      <i class="i-ep-collection" />
    </InputGroupAddon> -->

    <SelectPhraseBundle v-model:selected-bundles="selectedBundles" />

    <Button
      label="Save"
      size="large"
      @click="savePhrase"
      :disabled="!selectedBundles.length || isExisting"
      :loading="isSaving"
    >
      <template #icon>
        <i class="mr-4 i-ep-collection" />
      </template>
    </Button>
  </Inputgroup>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Inputgroup from "primevue/inputgroup";
import SelectPhraseBundle from "./SelectPhraseBundle.vue";
import { ref, watch } from "vue";
import { authentication, dataProvider } from "@modular-rest/client";
import { COLLECTIONS, DATABASE } from "../../../../common/static/global";
import { TranslateService } from "../../../../common/services/translate.service";
import { PhraseType } from "../../../../common/types/phrase.type";

const props = defineProps<{
  phrase: string;
  translation: string;
}>();

const selectedBundles = ref<string[]>([]);

const isSaving = ref(false);
const isExisting = ref(true);

watch(
  () => selectedBundles,
  () => checkExisting(),
  { immediate: true, deep: true }
);

async function checkExisting() {
  if (!selectedBundles.value.length) {
    isExisting.value = false;
    return;
  }

  try {
    const phraseDoc = await dataProvider
      .findOne({
        database: DATABASE.USER_CONTENT,
        collection: COLLECTIONS.PHRASE,
        query: {
          refId: authentication.user?.id,
          phrase: props.phrase.trim(),
          translation: props.translation.trim(),
        },
      })
      .then((doc) => doc as PhraseType);

    const countQuery = {
      refId: authentication.user?.id,
      _id: selectedBundles.value[0],
      phrases: {
        $in: [phraseDoc?._id],
      },
    };

    isExisting.value = await dataProvider
      .count({
        database: DATABASE.USER_CONTENT,
        collection: COLLECTIONS.PHRASE_BUNDLE,
        query: countQuery,
      })
      .then((count) => count > 0)
      .catch(() => false);
  } catch (error) {
    console.error(error);
  }
}

function updateBundles(bundleIds: string[], phraseId: string) {
  const promiseList = [
    ...bundleIds.map((bundleId) => {
      return dataProvider.updateOne({
        database: DATABASE.USER_CONTENT,
        collection: COLLECTIONS.PHRASE_BUNDLE,
        query: {
          _id: bundleId,
          refId: authentication.user?.id,
        },
        update: {
          $push: {
            phrases: phraseId,
          },
        },
      });
    }),
  ];

  return Promise.all(promiseList);
}

async function savePhrase() {
  isSaving.value = true;

  const query = {
    refId: authentication.user?.id!,
    phrase: props.phrase.trim(),
    translation: props.translation.trim(),
    translation_language: TranslateService.instance.targetLanguage.trim(),
  };

  const dataBase = {
    database: DATABASE.USER_CONTENT,
    collection: COLLECTIONS.PHRASE,
  };

  try {
    const newPhrase = await dataProvider
      .insertOne({
        ...dataBase,
        doc: query,
      })
      .then((data) => data as PhraseType);

    await updateBundles(selectedBundles.value, newPhrase._id);

    isExisting.value = true;
  } catch (error) {
    console.error(error);
  } finally {
    isSaving.value = false;
  }
}
</script>
