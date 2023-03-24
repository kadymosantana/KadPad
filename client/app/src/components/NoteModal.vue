<script setup lang="ts">
import type { Note } from "@/types";

import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { vOnClickOutside } from "@vueuse/components";
import { useToast } from "vue-toastification";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";

import { api } from "@/services/api";
import store from "@/store";

import Tag from "./Tag.vue";

const router = useRouter();
const route = useRoute();
const toast = useToast();

onMounted(() => {
  fetchNoteDetails();
});

const note = ref<Note | null>(null);
const fetchNoteDetails = async () => {
  try {
    const noteDetails = await api.get(`/notes/${route.params.id}`);
    note.value = noteDetails.data;
  } catch (error: any) {
    if (error.response.data.message === "Token inválido") {
      store.authData = null;
      localStorage.removeItem("@KadPad:user");
      localStorage.removeItem("@KadPad:token");
      toast.error("Sessão expirada. Faça login novamente.");
    }
  }
};

const activeDeleteButton = ref("delete");
const deleteNote = async () => {
  await api.delete(`/notes/${route.params.id}`);
  toast.success("Nota excluída com sucesso!");
  router.back();
};
</script>

<template>
  <div class="modal-wrapper p-5">
    <div
      v-on-click-outside="() => router.back()"
      :class="{ 'items-center justify-center bg-transparent': !note, 'bg-dark-800': note }"
      class="flex w-full flex-col overflow-hidden rounded-3xl sm:w-[700px] md:h-[550px] md:flex-row md:bg-dark-800"
    >
      <template v-if="note">
        <div class="w-full border-r border-solid border-dark-600 p-4 md:w-96 md:p-7">
          <h3 class="subtitle">
            <img src="../assets/icons/description.svg" />
            Descrição
          </h3>
          <p class="h-36 overflow-auto md:h-[480px]">{{ note?.description }}</p>
        </div>

        <div class="grid max-h-full w-full flex-col gap-6 p-4 md:w-96 md:p-7">
          <div>
            <h3 class="subtitle">
              <img src="../assets/icons/link.svg" alt="" />
              Links
            </h3>

            <ul
              v-if="note?.links.length"
              class="mb-3 flex max-h-24 w-full flex-col gap-2 overflow-auto md:max-h-48"
            >
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

            <ul v-if="note?.tags.length" class="max-h-30 mb-3 flex flex-wrap gap-2">
              <Tag v-for="tag in note?.tags" :key="tag.id" :name="tag.name" />
            </ul>
            <p v-else class="text-gray-600">Nenhum link adicionado.</p>
          </div>

          <div class="self-end overflow-hidden rounded-xl">
            <button
              v-if="activeDeleteButton === 'delete'"
              @click="activeDeleteButton = 'confirm'"
              class="delete w-full bg-[#ff00001a] p-3 text-red-700"
            >
              Excluir nota
            </button>
            <button
              @click="deleteNote"
              v-else
              class="confirm w-full bg-[#fff7001a] p-3 text-yellow-600"
            >
              Confirmar exclusão
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <div>
          <BeatLoader :loading="true" height="80px" color="#06b6d4" />
        </div>
      </template>
    </div>
  </div>
</template>
