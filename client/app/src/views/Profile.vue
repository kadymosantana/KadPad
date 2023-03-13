<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import store from '@/store'
import { api } from '@/services/api'

import InputContainer from '@/components/InputContainer.vue'

const router = useRouter()
const toast = useToast()

const userData = computed(() => store.authData!.user)
const avatarURL = computed(() => {
  if (userData.value.avatar) {
    return `${api.defaults.baseURL}/files/${userData.value.avatar}`
  } else {
    return 'src/assets/icons/user.svg'
  }
})

const avatar = computed(() => userData!.value.avatar)

const name = ref(userData.value.name)
const email = ref(userData.value.email)
const oldPassword = ref('')
const newPassword = ref('')

const updateUserAvatar = async (e) => {
  if (!e.target.files) return
  try {
    const file = e.target.files[0]
    const fileUploadForm = new FormData()
    fileUploadForm.append('avatar', file)

    const updatedUser = await api.patch('/users/avatar', fileUploadForm)

    store.authData!.user = updatedUser.data
    localStorage.setItem('@KadPad:user', JSON.stringify(updatedUser.data))

    toast.success('Avatar atualizado com sucesso!')
  } catch (error: any) {
    if (error.response) return toast.error(error.response.data.message)
    else return toast.error('Não foi possível atualizar o avatar.')
  }
}

const updateUserData = async () => {
  try {
    const updatedUser = await api.put('/users', {
      name: name.value,
      email: email.value,
      password: newPassword.value,
      old_password: oldPassword.value
    })

    store.authData!.user = updatedUser.data
    localStorage.setItem('@KadPad:user', JSON.stringify(updatedUser.data))

    toast.success('Perfil atualizado com sucesso!')

    oldPassword.value = ''
    newPassword.value = ''
  } catch (error: any) {
    if (error.response) return toast.error(error.response.data.message)
    else return toast.error('Não foi possível fazer o login.')
  }
}

const signOut = () => {
  store.authData = null
  localStorage.removeItem('@KadPad:user')
  localStorage.removeItem('@KadPad:token')

  router.push('/')
}
</script>

<template>
  <div class="content w-screen h-screen flex flex-col gap-10 items-center justify-center">
    <div class="relative">
      <img
        :class="{ 'bg-dark-900 p-8': !avatar }"
        class="rounded-full drop-shadow-xl w-44 h-44 object-cover"
        width="176"
        height="176"
        :src="avatarURL"
        alt="Foto de perfil"
      />
      <span
        class="grid grid-cols-[1fr] grid-rows-[1fr] absolute bg-cyan-500 hover:bg-cyan-600 p-3 rounded-full bottom-0 right-0 cursor-pointer duration-500"
        ><img class="col-[1] row-[1]" src="../assets/icons/add-photo.svg" alt="Adicionar foto" />

        <input
          @input="updateUserAvatar"
          type="file"
          class="col-[1] row-[1] w-[30px] opacity-0 cursor-pointer"
      /></span>
    </div>
    <form @submit.prevent="updateUserData" class="flex flex-col gap-3">
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
    <button @click="signOut" class="flex items-center gap-2 bg-[#ff00001a] p-3 rounded-xl">
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
