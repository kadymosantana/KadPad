<script setup lang="ts">
import type { Note } from "@/types";

import { ref, watchEffect } from "vue";

import { api } from "@/services/api";
import store from "@/store";

import NoteCard from "./NoteCard.vue";

const notes = ref<Note[]>([]);

watchEffect(async () => {
  const fetchedNotes = await api.get(
    `/notes?title=${store.searchedNote}&tags=${store.selectedTags}`
  );
  notes.value = fetchedNotes.data;
});
</script>

<template>
  <section>
    <header class="flex items-center justify-between border-b border-solid border-dark-600 pb-4">
      <h2 class="text-3xl font-light">Minhas notas</h2>
      <RouterLink
        :to="{ name: 'New Note' }"
        tag="button"
        class="flex items-center gap-3 rounded-xl bg-cyan-500 p-2 duration-500 hover:bg-cyan-600"
      >
        <img src="../assets/icons/add.svg" />
        <span class="text-lg text-dark-800">Nova nota</span>
      </RouterLink>
    </header>

    <TransitionGroup tag="ul" name="list" class="notes columns-3 pt-8">
      <li class="note" v-for="note in notes" :key="note.id">
        <NoteCard :note="note"></NoteCard>
      </li>
    </TransitionGroup>

    <Teleport to="body">
      <RouterView />
    </Teleport>
  </section>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

ul li:first-child a {
  margin-top: 0;
}
</style>
