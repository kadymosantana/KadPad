<script setup lang="ts">
import { ref } from 'vue'

import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import store from '@/store'

import { api } from '@/services/api'

import InputContainer from '@/components/InputContainer.vue'

const router = useRouter()
const toast = useToast()

const name = ref(store.userAuthData!.user.name)
const email = ref(store.userAuthData!.user.email)
const oldPassword = ref('')
const newPassword = ref('')

const handleUpdate = async () => {
  const updatedUser = {
    name: name.value,
    email: email.value,
    password: newPassword.value,
    old_password: oldPassword.value
  }
  try {
    await api.put('/users', updatedUser)

    store.userAuthData!.user = { name: name.value, email: email.value }
    localStorage.setItem('@KadPad:user', JSON.stringify(updatedUser))

    toast.success('Perfil atualizado com sucesso!')
    oldPassword.value = ''
    newPassword.value = ''
  } catch (error: any) {
    if (error.response) return toast.error(error.response.data.message)
    else return toast.error('Não foi possível fazer o login.')
  }
}

const handleSignOut = () => {
  localStorage.removeItem('@KadPad:user')
  localStorage.removeItem('@KadPad:token')
  store.userAuthData = null
  router.push('/')
}
</script>

<template>
  <div class="content w-screen h-screen flex flex-col gap-10 items-center justify-center">
    <div class="relative">
      <img
        class="rounded-full drop-shadow-xl"
        width="180"
        height="180"
        src="https://avatars.githubusercontent.com/u/98963793?v=4"
        alt="Foto de perfil"
      />
      <span
        class="absolute bg-cyan-500 hover:bg-cyan-600 p-3 rounded-full bottom-0 right-0 cursor-pointer duration-500"
        ><img src="../assets/icons/add-photo.svg" alt="Adicionar foto"
      /></span>
    </div>
    <form @submit.prevent="handleUpdate" class="flex flex-col gap-3">
      <InputContainer v-model="name" icon="user" placeholder="Nome" />
      <InputContainer v-model="email" type="email" icon="email" placeholder="E-mail" />
      <InputContainer
        v-model="oldPassword"
        type="password"
        icon="password"
        placeholder="Senha atual"
      />
      <InputContainer
        v-model="newPassword"
        type="password"
        icon="password"
        placeholder="Nova senha"
      />
      <button class="primary-button mt-3">Salvar</button>
    </form>
    <button @click="handleSignOut" class="flex items-center gap-2 bg-[#ff00001a] p-3 rounded-xl">
      <img src="../assets/icons/logout.svg" />
      <span class="text-red-700">Sair</span>
    </button>
  </div>
</template>

<style scoped>
.content {
  background-image: linear-gradient(to top, #1f2125 73%, #27292e 0%);
}
</style>
