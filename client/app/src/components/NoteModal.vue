<script setup lang="ts">
import type { Note } from "@/types";

import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";

import { api } from "@/services/api";

import Tag from "./Tag.vue";

const router = useRouter();
const route = useRoute();
const toast = useToast();

onMounted(() => {
  fetchNoteDetails();
});

const note = ref<Note | null>(null);
const fetchNoteDetails = async () => {
  const noteDetails = await api.get(`/notes/${route.params.id}`);
  note.value = noteDetails.data;
};

const activeDeleteButton = ref("delete");
const deleteNote = async () => {
  await api.delete(`/notes/${route.params.id}`);
  toast.success("Nota excluída com sucesso!");
  router.back();
};
</script>

<template>
  <Transition name="modal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <header class="flex justify-between pb-4">
          <h1 class="text-4xl font-bold">{{ note?.title }}</h1>
          <button @click="router.back()" class="min-w-max self-start rounded-xl bg-[#ff00001a] p-2">
            <img src="../assets/icons/close.svg" alt="Fechar" />
          </button>
        </header>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/description.svg" />
            Descrição
          </h3>
          <p class="max-h-48 overflow-auto">{{ note?.description }}</p>
        </div>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/link.svg" alt="" />
            Links
          </h3>
          <ul v-if="note?.links.length" class="mb-3 flex max-h-20 flex-col gap-2 overflow-auto">
            <li
              v-for="link in note?.links"
              :key="link.id"
              class="rounded-xl bg-[#06b6d424] p-2 text-cyan-500 underline"
            >
              <a :href="link.url">{{ link.url }}</a>
            </li>
          </ul>
          <p v-else class="text-gray-600">Nenhum link adicionado.</p>
        </div>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/tag.svg" />
            Tags
          </h3>
          <ul v-if="note?.tags.length" class="mb-3 flex flex-wrap gap-2">
            <Tag v-for="tag in note?.tags" :key="tag.id" :name="tag.name" />
          </ul>
          <p v-else class="text-gray-600">Nenhum link adicionado.</p>
        </div>
        <button
          v-if="activeDeleteButton === 'delete'"
          @click="activeDeleteButton = 'confirm'"
          class="delete rounded-xl bg-[#ff00001a] p-3 text-red-700"
        >
          Excluir nota
        </button>
        <button
          @click="deleteNote"
          v-else
          class="confirm rounded-xl bg-[#fff7001a] p-3 text-yellow-600"
        >
          Confirmar exclusão
        </button>
      </div>
    </div>
  </Transition>
</template>
