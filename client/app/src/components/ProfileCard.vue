<script setup lang="ts">
import { computed, inject } from "vue";

import { api } from "@/services/api";
import store from "@/store";

const userData = store.authData!.user;

const avatarURL = computed(() => {
  if (userData.avatar) return `${api.defaults.baseURL}/files/${userData.avatar}`;
  else return "src/assets/icons/user.svg";
});

const menu = inject<boolean>("menu");
</script>

<template>
  <div
    :class="{ flex: menu, hidden: !menu }"
    class="items-center gap-4 rounded-2xl bg-dark-800 p-4 shadow sm:flex"
  >
    <img
      :src="avatarURL"
      :class="{ 'bg-dark-900 p-4': !userData.avatar }"
      class="items-center self-start rounded-full bg-dark-800 shadow-md"
      width="64"
      height="64"
      alt="Avatar"
    />
    <div class="flex flex-col gap-2 truncate">
      <span class="block truncate text-sm"
        >Seja bem vindo,
        <br />
        <span class="text-ellipsis text-lg font-semibold">Kádymo Santana</span>
      </span>
      <RouterLink
        to="/profile"
        tag="button"
        class="flex gap-2 rounded-xl bg-dark-700 p-2 hover:bg-dark-700"
      >
        <img src="../assets/icons/edit.svg" />
        <span>Editar conta</span>
      </RouterLink>
    </div>
  </div>
</template>
