<script setup lang="ts">
import { computed, inject } from "vue";

import { api } from "@/services/api";
import { authDataStore as authData } from "@/stores/authData";

const avatarURL = computed(() => {
  return authData.user?.avatar ?? "src/assets/icons/user.svg";
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
      :class="{ 'bg-dark-900 p-4': !authData.user?.avatar }"
      class="h-16 w-16 items-center self-start rounded-full bg-dark-800 object-cover shadow-md"
      width="64"
      height="64"
      alt="Avatar"
    />
    <div class="flex flex-col gap-2 truncate">
      <span class="block truncate text-sm"
        >Seja bem vindo,
        <br />
        <span class="text-ellipsis text-lg font-semibold">{{ authData.user?.name }}</span>
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
