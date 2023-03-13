<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'
import { api } from '@/services/api'
import store from '@/store'

import NoteCard from './NoteCard.vue'
import type { User } from '@/types'

const notes = ref<User[]>([])

watchEffect(async () => {
  const fetchedNotes = await api.get(
    `/notes?title=${store.searchedNote}&tags=${store.selectedTags}`
  )
  notes.value = fetchedNotes.data
})
</script>

<template>
  <section>
    <header class="flex items-center justify-between border-b border-solid border-dark-600 pb-4">
      <h2 class="text-3xl font-light">Minhas notas</h2>
      <RouterLink
        :to="{ name: 'New Note' }"
        tag="button"
        class="flex gap-3 items-center bg-cyan-500 hover:bg-cyan-600 p-2 rounded-xl duration-500"
      >
        <img src="../assets/icons/add.svg" />
        <span class="text-dark-800 text-lg">Nova nota</span>
      </RouterLink>
    </header>

    <TransitionGroup tag="ul" name="list" class="pt-8 columns-3">
      <NoteCard v-for="note in notes" :key="note.id" :note="note"></NoteCard>
    </TransitionGroup>

    <Teleport to="body">
      <RouterView v-slot="{ Component }">
        <transition name="modal">
          <component :is="Component" />
        </transition>
      </RouterView>
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
</style>
