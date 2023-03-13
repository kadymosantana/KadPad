<script setup lang="ts">
import { computed } from 'vue'

import { api } from '@/services/api'
import store from '@/store'

const userData = store.authData!.user

const avatarURL = computed(() => {
  if (userData.avatar) return `${api.defaults.baseURL}/files/${userData.avatar}`
  else return 'src/assets/icons/user.svg'
})
</script>

<template>
  <div class="flex items-center gap-4 bg-dark-800 p-4 rounded-2xl shadow">
    <img
      :class="{ 'bg-dark-900 p-4': !userData.avatar }"
      class="rounded-full self-start w-16 h-16 object-cover shadow-md"
      width="64"
      height="64"
      :src="avatarURL"
      alt="Avatar"
    />
    <div class="flex flex-col gap-2 truncate">
      <span class="block text-sm truncate"
        >Seja bem vindo,
        <br />
        <span class="text-lg font-semibold text-ellipsis">Kádymo Santana</span>
      </span>
      <RouterLink
        to="/profile"
        tag="button"
        class="flex gap-2 p-2 rounded-xl bg-dark-700 hover:bg-dark-700"
      >
        <img src="../assets/icons/edit.svg" />
        <span>Editar conta</span>
      </RouterLink>
    </div>
  </div>
</template>
