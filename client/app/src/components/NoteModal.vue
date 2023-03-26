<script setup lang="ts">
import type { Note, ModalProvider } from "@/types";

import { ref, onMounted, inject } from "vue";
import { vOnClickOutside } from "@vueuse/components";
import { useToast } from "vue-toastification";

import { api } from "@/services/api";

import Tag from "@/components/Tag.vue";
import Loader from "@/components/Loader.vue";

const props = defineProps<{
  note: Note;
}>();

const toast = useToast();

const { modal, closeModal } = inject("modalProvider") as ModalProvider;

const activeDeleteButton = ref("delete");
const deleteNote = async () => {
  await api.delete(`/notes/${props.note.id}`);
  toast.success("Nota excluída com sucesso!");
  closeModal();
};
</script>

<template>
  <div class="modal-wrapper p-5">
    <Transition name="modal" appear>
      <div
        v-on-click-outside="() => closeModal()"
        :class="{ 'items-center justify-center bg-transparent': !note, 'bg-dark-800': note }"
        class="flex w-full flex-col overflow-hidden rounded-3xl sm:w-[700px] md:h-[550px] md:flex-row md:bg-dark-800"
      >
        <template v-if="note">
          <div class="w-full border-r border-solid border-dark-600 p-4 md:w-96 md:p-7">
            <h3 class="subtitle">
              <img src="../assets/icons/description.svg" alt="Ícone" />
              Descrição
            </h3>
            <p class="h-36 overflow-auto md:h-[480px]">{{ note?.description }}</p>
          </div>

          <div class="grid max-h-full w-full flex-col gap-6 p-4 md:w-96 md:p-7">
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
            <Loader />
          </div>
        </template>
      </div>
    </Transition>
  </div>
</template>
