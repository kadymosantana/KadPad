<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { api } from '@/services/api'
import store from '@/store'

import InputContainer from '@/components/InputContainer.vue'
import LoginTypeButton from '@/components/LoginTypeButton.vue'

const router = useRouter()

const activeLoginType = ref('signIn')

const toast = useToast()

const name = ref('')
const email = ref('')
const password = ref('')

onMounted(() => {
  const user = localStorage['@KadPad:user']
  const token = localStorage['@KadPad:token']

  if (user && token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    store.authData = { user: JSON.parse(user), token }
    router.push('/home')
  }
})

const handleSubmit = () => {
  if (activeLoginType.value === 'signIn') signIn()
  else if (activeLoginType.value === 'signUp') signUp()
}

const signIn = async () => {
  if (!email.value || !password.value) return toast.error('Preencha todos os campos.')

  try {
    const data = await api.post('/sessions', {
      email: email.value,
      password: password.value
    })
    const { user, token } = data.data

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    store.authData = { user, token }

    localStorage.setItem('@KadPad:user', JSON.stringify(user))
    localStorage.setItem('@KadPad:token', token)

    router.push('/home')
  } catch (error: any) {
    if (error.response) return toast.error(error.response.data.message)
    else return toast.error('Não foi possível fazer o login.')
  }
}

const signUp = async () => {
  if (!name.value || !email.value || !password.value)
    return toast.error('Preencha todos os campos.')

  try {
    await api.post('/users', { name: name.value, email: email.value, password: password.value })
    toast.success('Cadastro feito com sucesso.')
    activeLoginType.value = 'signIn'
  } catch (error: any) {
    if (error.response) return toast.error(error.response.data.message)
    else return toast.error('Não foi possível fazer o cadastro.')
  }
}
</script>

<template>
  <div class="w-screen h-screen flex justify-around items-center">
    <img
      width="400"
      src="https://user-images.githubusercontent.com/98963793/222261379-74753371-f40c-4eb9-8ff1-30af3ed8a7de.png"
      alt="Ilustração"
    />
    <div class="flex flex-col gap-12">
      <div class="flex flex-col items-center gap-5">
        <img
          class="drop-shadow-2xl"
          width="75"
          src="https://user-images.githubusercontent.com/98963793/221386784-f28b7347-a757-47bc-951a-8622354c3e07.png"
          alt="KadPad Logo"
        />
        <span class="text-cyan-500 text-4xl font-light mt-1">KadPad</span>
      </div>

      <div class="w-full grid grid-cols-2 border-dark-600 mb-[-1rem] border-b">
        <LoginTypeButton
          :activeLoginType="activeLoginType"
          type="signIn"
          @change-login-type="activeLoginType = 'signIn'"
          >Entrar</LoginTypeButton
        >

        <LoginTypeButton
          :activeLoginType="activeLoginType"
          type="signUp"
          @change-login-type="activeLoginType = 'signUp'"
          >Cadastrar</LoginTypeButton
        >
      </div>

      <TransitionGroup
        @submit.prevent="handleSubmit"
        name="list"
        tag="form"
        class="flex flex-col gap-3"
      >
        <InputContainer
          v-model="name"
          v-if="activeLoginType === 'signUp'"
          icon="user"
          placeholder="Nome"
        />

        <InputContainer v-model="email" type="email" icon="email" placeholder="E-mail" />

        <InputContainer v-model="password" type="password" icon="password" placeholder="Senha" />

        <button type="submit" class="primary-button mt-3">
          {{ activeLoginType === 'signIn' ? 'Entrar' : 'Cadastrar' }}
        </button>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
