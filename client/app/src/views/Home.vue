<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import NotesContainer from "@/components/NotesContainer.vue";
</script>

<template>
  <div
    class="sm:max-w-screen grid min-h-screen grid-cols-[auto_1fr] overflow-hidden tracking-tight"
  >
    <Sidebar />
    <NotesContainer />
  </div>
</template>
