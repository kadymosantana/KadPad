<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import NotesContainer from '@/components/NotesContainer.vue'

import store from '../store'
</script>

<template>
  <div class="text-gray-300 tracking-tight grid grid-cols-[auto_1fr] w-screen min-h-screen">
    <Sidebar />
    <NotesContainer />
  </div>
</template>
