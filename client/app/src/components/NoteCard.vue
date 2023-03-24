<script setup lang="ts">
import type { Note } from "@/types";

import Tag from "./Tag.vue";

const props = defineProps<{
  note: Note;
}>();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
};
</script>

<template>
  <RouterLink
    :to="{ name: 'Note', params: { id: note.id } }"
    tag="li"
    class="max-h-content max-w-content relative my-4 flex w-full cursor-pointer break-inside-avoid-column flex-col gap-3 overflow-hidden rounded-3xl bg-dark-700 p-5 shadow-md duration-300 hover:-translate-y-3 xl:w-auto"
  >
    <h1 class="text-2xl font-semibold">{{ note.title }}</h1>
    <p class="text-ellipsis">{{ note.description }}</p>
    <ul v-if="note.tags.length" class="mb-7 flex flex-wrap gap-2 sm:mb-7">
      <Tag v-for="tag in note.tags" :key="tag.id" :name="tag.name" />
    </ul>

    <span class="absolute bottom-0 right-0 rounded-tl-3xl bg-dark-800 px-3 py-2 text-[14px]">{{
      formatDate(note.updated_at)
    }}</span>

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
