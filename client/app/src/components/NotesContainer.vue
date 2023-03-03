<script setup lang="ts">
import NotesList from './NotesList.vue'
import InputContainer from './InputContainer.vue'
</script>

<template>
  <main class="bg-dark-800 p-12 flex flex-col gap-12 ml-[320px]">
    <InputContainer size="large" icon="search" placeholder="Pesquisar nota" />
    <NotesList />
  </main>
</template>
