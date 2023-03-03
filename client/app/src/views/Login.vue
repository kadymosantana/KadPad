<script setup lang="ts">
import { ref } from 'vue'
import InputContainer from '@/components/InputContainer.vue'
import LoginTypeButton from '@/components/LoginTypeButton.vue'

const activeLoginType = ref('signin')
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
          type="signin"
          @change-login-type="activeLoginType = 'signin'"
          >Entrar</LoginTypeButton
        >

        <LoginTypeButton
          :activeLoginType="activeLoginType"
          type="signup"
          @change-login-type="activeLoginType = 'signup'"
          >Cadastrar</LoginTypeButton
        >
      </div>

      <TransitionGroup name="list" tag="form" class="flex flex-col gap-3">
        <InputContainer v-if="activeLoginType === 'signup'" icon="user" placeholder="Nome" />
        <InputContainer type="email" icon="email" placeholder="E-mail" />
        <InputContainer type="password" icon="password" placeholder="Senha" />
        <button class="primary-button mt-3">
          {{ activeLoginType === 'signin' ? 'Entrar' : 'Cadastrar' }}
        </button>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
