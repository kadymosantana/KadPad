<script setup lang="ts">
import ProfileCard from './ProfileCard.vue'
</script>

<template>
  <div
    class="bg-dark-700 w-80 h-screen grid grid-rows-[auto_1fr_auto] tracking-tight text-gray-300 p-4"
  >
    <div class="flex gap-4 items-center justify-center mt-2">
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
        <li class="flex items-center gap-4 bg-dark-800 p-2 rounded-xl cursor-pointer">
          <img src="../assets/icons/hash.svg" />
          <span class="text-lg">Todas</span>
        </li>
        <li class="flex items-center gap-4 p-2">
          <img src="../assets/icons/hash.svg" />
          <span class="text-lg">nodejs</span>
        </li>
        <li class="flex items-center gap-4 p-2">
          <img src="../assets/icons/hash.svg" />
          <span class="text-lg">javascript</span>
        </li>
      </ul>
    </div>

    <ProfileCard />
  </div>
</template>
