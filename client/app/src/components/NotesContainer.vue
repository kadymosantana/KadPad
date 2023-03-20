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
  <main class="ml-[320px] flex flex-col gap-12 bg-dark-800 p-12">
    <InputContainer v-model="title" size="large" icon="search" placeholder="Pesquisar nota" />
    <NotesList />
  </main>
</template>
