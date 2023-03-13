<script setup lang="ts">
import type { Note } from '@/types'

import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

import { api } from '@/services/api'

import Tag from './Tag.vue'

const router = useRouter()
const route = useRoute()
const toast = useToast()

onMounted(() => {
  fetchNoteDetails()
})

const note = ref<Note | null>(null)
const fetchNoteDetails = async () => {
  const noteDetails = await api.get(`/notes/${route.params.id}`)
  note.value = noteDetails.data
}

const activeDeleteButton = ref('delete')
const deleteNote = async () => {
  await api.delete(`/notes/${route.params.id}`)
  toast.success('Nota excluída com sucesso!')
  router.back()
}
</script>

<template>
  <Transition name="modal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <header class="flex justify-between pb-4">
          <h1 class="text-4xl font-bold">{{ note?.title }}</h1>
          <button @click="router.back()" class="bg-[#ff00001a] min-w-max p-2 rounded-xl self-start">
            <img src="../assets/icons/close.svg" alt="Fechar" />
          </button>
        </header>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/description.svg" />
            Descrição
          </h3>
          <p class="max-h-48 overflow-auto">{{ note?.description }}</p>
        </div>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/link.svg" alt="" />
            Links
          </h3>
          <ul v-if="note?.links.length" class="flex flex-col gap-2 max-h-20 overflow-auto mb-3">
            <li
              v-for="link in note?.links"
              :key="link.id"
              class="bg-[#06b6d424] p-2 underline text-cyan-500 rounded-xl"
            >
              <a :href="link.url">{{ link.url }}</a>
            </li>
          </ul>
          <p v-else class="text-gray-600">Nenhum link adicionado.</p>
        </div>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/tag.svg" />
            Tags
          </h3>
          <ul v-if="note?.tags.length" class="flex flex-wrap gap-2 mb-3">
            <Tag v-for="tag in note?.tags" :key="tag.id" :name="tag.name" />
          </ul>
          <p v-else class="text-gray-600">Nenhum link adicionado.</p>
        </div>
        <button
          v-if="activeDeleteButton === 'delete'"
          @click="activeDeleteButton = 'confirm'"
          class="bg-[#ff00001a] text-red-700 rounded-xl p-3"
        >
          Excluir nota
        </button>
        <button @click="deleteNote" v-else class="bg-[#fff7001a] text-yellow-600 rounded-xl p-3">
          Confirmar exclusão
        </button>
      </div>
    </div>
  </Transition>
</template>
