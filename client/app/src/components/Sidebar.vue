<script setup lang="ts">
import { ref, onMounted } from 'vue'

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

const selectedTag = ref<Tag | null>(null)
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
      <ul class="flex flex-col border-b border-solid border-dark-600 max-h-96 overflow-auto pb-4">
        <li
          @click="selectedTag = null"
          :class="{ 'bg-dark-800  rounded-xl ': !selectedTag }"
          class="flex items-center gap-4 p-2 cursor-pointer"
        >
          <img src="../assets/icons/hash.svg" />
          <span class="text-lg">Todas</span>
        </li>

        <li
          @click="selectedTag = tag"
          v-for="tag in tags"
          :key="tag.id"
          :class="{ 'bg-dark-800 rounded-xl ': selectedTag?.id === tag.id }"
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
