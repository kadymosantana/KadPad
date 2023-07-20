<script setup lang="ts">
import type { Note } from "@/types";

import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { vOnClickOutside } from "@vueuse/components";
import { useToast } from "vue-toastification";

import { api } from "@/services/api";
import { authDataStore as authData } from "@/stores/authData";

import Loader from "@/components/Loader.vue";
import Tag from "@/components/Tag.vue";

const router = useRouter();
const route = useRoute();
const toast = useToast();

const note = ref<Note | null>(null);

const fetchNoteDetails = async () => {
  try {
    const noteDetails = await api.get(`/notes/${route.params.id}`);
    note.value = noteDetails.data;
  } catch (error: any) {
    if (error.response?.data?.message === "Token inválido") {
      authData.$reset();
      localStorage.removeItem("@KadPad:user");
      localStorage.removeItem("@KadPad:token");

      toast.error("Sessão expirada. Faça login novamente.");
      router.replace({ name: "Login" });
    }
  }
};

const activeDeleteButton = ref("delete");
const deleteNote = async () => {
  await api.delete(`/notes/${note.value?.id}`);

  toast.success("Nota excluída com sucesso!");
  router.replace({ name: "Notes" });
};

const closeModal = (e: KeyboardEvent) => {
  if (e.key === "Escape") router.replace({ name: "Notes" });
};

onMounted(() => {
  fetchNoteDetails();
  addEventListener("keyup", closeModal);
});

onBeforeUnmount(() => {
  removeEventListener("keyup", closeModal);
});
</script>

<template>
  <Transition name="modal" appear>
    <div class="modal-wrapper">
      <div
        v-on-click-outside="() => router.replace({ name: 'Notes' })"
        :class="{ 'items-center justify-center': !note }"
        class="modal flex flex-col duration-300 sm:w-[700px] sm:p-0 md:h-[550px] md:flex-row md:gap-0"
        role="dialog"
      >
        <template v-if="note">
          <header
            class="flex items-center justify-between border-b border-solid border-dark-600 pb-4 sm:hidden"
          >
            <h1 class="flex-1 text-3xl font-bold">{{ note.title }}</h1>
            <button
              @click="router.replace({ name: 'Notes' })"
              class="rounded-xl bg-[#ff00001a] p-2"
            >
              <img src="../assets/icons/close.svg" alt="Fechar" />
            </button>
          </header>

          <div class="w-full border-solid border-dark-600 sm:border-r md:w-96 md:p-7">
            <h3 class="subtitle">
              <img src="../assets/icons/description.svg" alt="Ícone" />
              Descrição
            </h3>
            <p class="overflow-auto md:h-[450px]">{{ note?.description }}</p>
          </div>

          <div class="grid max-h-full w-full flex-col gap-6 md:w-96 md:p-7">
            <div>
              <h3 class="subtitle">
                <img src="../assets/icons/link.svg" alt="Ícone" />
                Links
              </h3>

              <ul
                v-if="note?.links?.length"
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
                <img src="../assets/icons/tag.svg" alt="Ícone" />
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
                class="w-full bg-[#ff00001a] p-3 text-red-700"
                data-test-id="delete-note-button"
              >
                Excluir nota
              </button>
              <button
                v-else
                @click="deleteNote"
                class="w-full bg-[#fff7001a] p-3 text-yellow-600"
                data-test-id="confirm-button"
              >
                Confirmar exclusão
              </button>
            </div>
          </div>
        </template>
        <Loader v-else type="note" />
      </div>
    </div>
  </Transition>
</template>
