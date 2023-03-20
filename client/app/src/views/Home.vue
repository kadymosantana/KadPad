<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import NotesContainer from "@/components/NotesContainer.vue";
</script>

<template>
  <div class="grid min-h-screen w-screen grid-cols-[auto_1fr] tracking-tight">
    <Sidebar />
    <NotesContainer />
  </div>
</template>
