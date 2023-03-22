<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import NotesContainer from "@/components/NotesContainer.vue";
</script>

<template>
  <div class="grid min-h-screen w-full overflow-hidden tracking-tight xl:w-screen">
    <Sidebar />
    <NotesContainer />
  </div>
</template>
