<template>
  <Inputgroup>
    <!-- <InputGroupAddon>
      <i class="i-ep-collection" />
    </InputGroupAddon> -->

    <MultiSelect />

    <Button label="Save" size="large">
      <template #icon>
        <i class="mr-4 i-ep-collection" />
      </template>
    </Button>
  </Inputgroup>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";
import Inputgroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
</script>
