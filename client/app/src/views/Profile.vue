<script setup lang="ts">
import InputContainer from '@/components/InputContainer.vue'
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
    <form class="flex flex-col gap-3">
      <InputContainer icon="user" placeholder="Nome" />
      <InputContainer icon="email" placeholder="E-mail" />
      <InputContainer icon="password" placeholder="Senha atual" />
      <InputContainer icon="password" placeholder="Nova senha" />
      <button
        class="w-full mt-3 bg-cyan-500 p-3 text-dark-800 rounded-xl hover:bg-cyan-600 duration-500"
      >
        Salvar
      </button>
    </form>
  </div>
</template>

<style scoped>
.content {
  background-image: linear-gradient(to top, #1f2125 73%, #27292e 0%);
}
</style>
