<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

import store from '../store'
import { api } from '@/services/api'

import NoteItem from './NoteItem.vue'
import AddButton from './AddButton.vue'

const toast = useToast()

const title = ref('')
const description = ref('')

const newLink = ref('')
const links = ref<string[]>([])

const newTag = ref('')
const tags = ref<string[]>([])

const addLink = () => {
  links.value.push(newLink.value)
  newLink.value = ''
}

const removeLink = (link: string) => {
  const index = links.value.indexOf(link)
  links.value.splice(index, 1)
}

const addTag = () => {
  tags.value.push(newTag.value)
  newTag.value = ''
}

const removeTag = (tag: string) => {
  const index = tags.value.indexOf(tag)
  tags.value.splice(index, 1)
}

const createNote = async () => {
  if (!title.value) return toast.error('O campo de título é obrigatório.')
  await api.post('/notes', {
    title: title.value,
    description: description.value,
    links: links.value,
    tags: tags.value
  })
  toast.success('Nota criada com sucesso!')
}
</script>

<template>
  <Transition name="modal">
    <div v-if="store.addNoteModalState" class="modal-wrapper">
      <div class="modal-container overflow-auto max-w-screen">
        <header
          class="flex items-center justify-between border-b border-solid border-dark-600 pb-4"
        >
          <h1 class="text-3xl font-light">Nova nota</h1>
          <button @click="store.addNoteModalState = false" class="bg-[#ff00001a] p-2 rounded-xl">
            <img src="../assets/icons/close.svg" alt="Fechar" />
          </button>
        </header>

        <div>
          <input
            v-model="title"
            type="text"
            class="w-full border-2 border-transparent focus:border-solid focus:border-cyan-500 rounded-2xl mb-3 p-3 bg-dark-700 placeholder:text-dark-500 duration-500"
            placeholder="Título da nota"
          />

          <textarea
            v-model="description"
            class="w-full border-2 border-transparent focus:border-solid focus:border-cyan-500 rounded-2xl p-3 bg-dark-700 resize-none placeholder:text-dark-500 duration-500"
            rows="3"
            placeholder="Descrição"
          ></textarea>
        </div>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/link.svg" alt="" />
            Links
          </h3>

          <ul v-if="links.length" class="flex flex-col gap-2 max-h-20 overflow-auto mb-3">
            <NoteItem v-for="link in links" :value="link" type="link" @remove="removeLink" />
          </ul>

          <AddButton @add="addLink" v-model="newLink" icon="add-link" placeholder="Novo link" />
        </div>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/tag.svg" />
            Tags
          </h3>

          <ul v-if="tags.length" class="flex gap-2 overflow-auto mb-2">
            <NoteItem v-for="tag in tags" :value="tag" type="tag" @remove="removeTag" />
          </ul>

          <AddButton @add="addTag" v-model="newTag" icon="add-tag" placeholder="Nova tag" />
        </div>

        <button @click="createNote" class="primary-button">Criar nota</button>
      </div>
    </div>
  </Transition>
</template>
