<script setup lang="ts">
import { ref, onMounted } from 'vue'
import store from '@/store'
import { api } from '@/services/api'

import type { Tag } from '@/types'

import ProfileCard from './ProfileCard.vue'

onMounted(() => {
  fetchTags()
})

const tags = ref<Tag[]>([])
const fetchTags = async () => {
  const tagsData = await api.get('/tags')
  tags.value = tagsData.data
}

const tagAlreadySelected = (tagName: string) => store.selectedTags.includes(tagName)

const selectTag = (tagName: string) => {
  if (tagAlreadySelected(tagName)) {
    const index = store.selectedTags.indexOf(tagName)
    store.selectedTags.splice(index, 1)
  } else {
    store.selectedTags.push(tagName)
  }
}
</script>

<template>
  <aside
    class="bg-dark-700 fixed w-80 h-screen grid grid-rows-[auto_1fr_auto] p-4 rounded-tr-3xl rounded-br-3xl shadow-lg"
  >
    <div class="flex gap-4 items-center justify-center mt-3">
      <img
        width="34"
        src="https://user-images.githubusercontent.com/98963793/221386784-f28b7347-a757-47bc-951a-8622354c3e07.png"
        alt="KadPad Logo"
      />
      <span class="text-cyan-500 text-2xl font-light mt-1">KadPad</span>
    </div>

    <div class="self-center">
      <h3 class="text-xl mb-4 pb-2 border-b border-solid border-dark-600">Minhas tags</h3>
      <ul
        class="flex flex-col gap-2 border-b border-solid border-dark-600 max-h-96 overflow-auto pb-4"
      >
        <li
          @click="store.selectedTags = []"
          :class="{ 'bg-dark-800  rounded-xl ': !store.selectedTags.length }"
          class="flex items-center gap-4 p-2 cursor-pointer"
        >
          <img src="../assets/icons/hash.svg" />
          <span class="text-lg">Todas</span>
        </li>

        <li
          @click="selectTag(tag.name)"
          v-for="tag in tags"
          :key="tag.id"
          :class="{ 'bg-dark-800 rounded-xl ': tagAlreadySelected(tag.name) }"
          class="flex items-center gap-4 p-2 cursor-pointer"
        >
          <img src="../assets/icons/hash.svg" />
          <span class="text-lg">{{ tag.name }}</span>
        </li>
      </ul>
    </div>

    <ProfileCard />
  </aside>
</template>
