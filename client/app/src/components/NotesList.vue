<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import AddNoteModal from './AddNoteModal.vue'
import NoteCard from './NoteCard.vue'

const router = useRouter()
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
    <ul class="pt-8 columns-3">
      <NoteCard> Uma linha. </NoteCard>
    </ul>

    <Teleport to="body">
      <RouterView v-slot="{ Component }">
        <transition name="modal">
          <component :is="Component" />
        </transition>
      </RouterView>
    </Teleport>
  </section>
</template>
