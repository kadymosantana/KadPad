<script setup lang="ts">
import { ref, watch } from "vue";

import { searchFiltersStore as searchFilters } from "@/stores/searchFilters";

import NotesList from "./NotesList.vue";
import InputContainer from "./InputContainer.vue";

const title = ref("");
watch(title, (value) => {
  searchFilters.setSearchedTitle(value);
});
</script>

<template>
  <main class="flex max-w-full flex-col gap-12 bg-dark-800 py-8 pr-4 pl-12 sm:ml-[320px] sm:pr-12">
    <InputContainer v-model="title" size="large" icon="search" placeholder="Pesquisar nota" />
    <NotesList />
  </main>
</template>
