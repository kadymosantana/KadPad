<script setup lang="ts">
import { ref } from 'vue'
import AddNoteModal from './AddNoteModal.vue'
import NoteCard from './NoteCard.vue'
import store from '../store'
</script>

<template>
  <section>
    <header class="flex items-center justify-between border-b border-solid border-dark-600 pb-4">
      <h2 class="text-3xl font-light">Minhas notas</h2>
      <button
        @click="store.addNoteModalState = true"
        class="flex gap-3 items-center bg-cyan-500 hover:bg-cyan-600 p-2 rounded-xl duration-500"
      >
        <img src="../assets/icons/add.svg" />
        <span class="text-dark-800 text-lg">Nova nota</span>
      </button>
    </header>
    <ul class="pt-8 columns-3">
      <NoteCard> Uma linha. </NoteCard>
      <NoteCard>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente natus distinctio libero...
      </NoteCard>
      <NoteCard>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio expedita, doloremque...
      </NoteCard>
      <NoteCard>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam ratione aperiam, voluptatum
        ut temporibus...
      </NoteCard>
      <NoteCard>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam ratione aperiam,
        voluptatum...
      </NoteCard>
    </ul>

    <Teleport to="body">
      <AddNoteModal />
    </Teleport>
  </section>
</template>
