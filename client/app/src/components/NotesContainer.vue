<script setup lang="ts">
import { ref, watch } from "vue";

import store from "@/store";

import NotesList from "./NotesList.vue";
import InputContainer from "./InputContainer.vue";

const title = ref("");
watch(title, (value) => {
  store.searchedNote = value;
});
</script>

<template>
  <main class="flex max-w-full flex-col gap-12 bg-dark-800 py-8 pr-4 pl-12 sm:ml-[320px]">
    <InputContainer v-model="title" size="large" icon="search" placeholder="Pesquisar nota" />
    <NotesList />
  </main>
</template>
