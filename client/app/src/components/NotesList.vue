<script setup lang="ts">
import type { Note } from "@/types";

import { ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";

import { api } from "@/services/api";
import { authDataStore as authData } from "@/stores/authData";
import { searchFiltersStore as searchFilters } from "@/stores/searchFilters";

import NoteCard from "./NoteCard.vue";

const router = useRouter();
const route = useRoute();
const toast = useToast();

const notes = ref<Note[]>([]);

watchEffect(async () => {
  try {
    if (route.name === "Notes") {
      const fetchedNotes = await api.get(
        `/notes?title=${searchFilters.searchedTitle}&tags=${searchFilters.selectedTags}`
      );

      notes.value = fetchedNotes.data;
    }
  } catch (error: any) {
    if (error.response?.data?.message === "Token inválido") {
      authData.$reset();
      localStorage.removeItem("@KadPad:user");
      localStorage.removeItem("@KadPad:token");

      toast.error("Sessão expirada. Faça login novamente");
      router.replace({ name: "Login" });
    }
  }
});

const getIconURL = (iconName: string) => {
  return new URL(`../assets/icons/${iconName}.svg`, import.meta.url).href;
};
</script>

<template>
  <section :class="{ 'items-center gap-20': !notes.length }" class="flex flex-col items-start">
    <header
      class="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:border-b md:border-solid md:border-dark-600 md:pb-4"
    >
      <h2
        class="w-full self-start border-b border-solid border-dark-600 pb-4 text-3xl font-light md:w-auto md:self-auto md:border-b-0 md:pb-0"
      >
        Minhas notas
      </h2>
      <RouterLink
        :to="{ name: 'New Note' }"
        class="flex w-full items-center gap-3 rounded-xl bg-cyan-500 p-2 duration-500 hover:bg-cyan-600 md:w-auto"
        role="button"
        aria-haspopup="dialog"
        aria-controls="new-note-modal"
        data-test-id="new-note-link"
      >
        <img :src="getIconURL('add')" alt="Ícone" />
        <span class="text-lg text-dark-800">Nova nota</span>
      </RouterLink>
    </header>

    <TransitionGroup
      v-if="notes.length"
      tag="ul"
      name="list"
      class="notes w-full pt-8 lg:columns-2 xl:columns-3 2xl:columns-4"
    >
      <li class="note" v-for="note in notes" :key="note.id">
        <NoteCard :note="note" />
      </li>
    </TransitionGroup>

    <img
      v-else
      class="w-72 opacity-5 saturate-0 sm:block md:w-80"
      src="https://user-images.githubusercontent.com/98963793/221386784-f28b7347-a757-47bc-951a-8622354c3e07.png"
      alt="KadPad Logo"
    />
  </section>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

ul li:first-child a {
  margin-top: 0;
}
</style>
