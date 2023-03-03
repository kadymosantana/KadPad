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
      <InputContainer type="email" icon="email" placeholder="E-mail" />
      <InputContainer type="password" icon="password" placeholder="Senha atual" />
      <InputContainer type="password" icon="password" placeholder="Nova senha" />
      <button class="primary-button mt-3">Salvar</button>
    </form>
    <button class="flex items-center gap-2 bg-[#ff00001a] p-3 rounded-xl">
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
