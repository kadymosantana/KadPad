<script setup lang="ts">
import type { Note } from '@/types'

import Tag from './Tag.vue'

const props = defineProps<{
  note: Note
}>()
</script>

<template>
  <RouterLink
    :to="{ name: 'Note', params: { id: note.id } }"
    tag="li"
    class="flex flex-col gap-3 bg-dark-700 rounded-3xl p-5 my-4 w-72 max-h-content shadow-md break-inside-avoid-column cursor-pointer duration-300 hover:-translate-y-3"
  >
    <h1 class="text-2xl font-semibold">{{ note.title }}</h1>
    <p class="text-ellipsis">{{ note.description }}</p>
    <ul v-if="note.tags.length" class="flex flex-wrap gap-2">
      <Tag v-for="tag in note.tags" :key="tag.id" :name="tag.name" />
    </ul>

    <Teleport to="body">
      <RouterView v-slot="{ Component }">
        <transition name="modal">
          <component :is="Component" />
        </transition>
      </RouterView>
    </Teleport>
  </RouterLink>
</template>

<style scoped>
p {
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
