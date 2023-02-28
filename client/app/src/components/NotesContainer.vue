<script setup lang="ts">
import NotesList from './NotesList.vue'
</script>

<template>
  <main class="bg-dark-800 p-12 flex flex-col gap-12 ml-[320px]">
    <div class="flex gap-5 bg-dark-700 rounded-2xl shadow-sm px-6 py-4">
      <img src="../assets/icons/search.svg" />
      <input
        class="text-lg tracking-tight w-full bg-transparent placeholder:text-[#454851]"
        type="text"
        placeholder="Pesquisar nota"
      />
    </div>
    <NotesList />
  </main>
</template>
