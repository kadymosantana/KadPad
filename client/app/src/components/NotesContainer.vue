<script setup lang="ts">
import { ref, watch } from 'vue'

import store from '@/store'

import NotesList from './NotesList.vue'
import InputContainer from './InputContainer.vue'

const title = ref('')
watch(title, (value) => {
  store.searchedNote = value
})
</script>

<template>
  <main class="bg-dark-800 p-12 flex flex-col gap-12 ml-[320px]">
    <InputContainer v-model="title" size="large" icon="search" placeholder="Pesquisar nota" />
    <NotesList />
  </main>
</template>
