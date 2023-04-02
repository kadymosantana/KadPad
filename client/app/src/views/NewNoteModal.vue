<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { vOnClickOutside } from "@vueuse/components";
import { useToast } from "vue-toastification";

import { api } from "@/services/api";

import NoteItem from "@/components/NoteItem.vue";
import ItemInput from "@/components/ItemInput.vue";

const router = useRouter();
const toast = useToast();

const title = ref("");
const description = ref("");

const newLink = ref("");
const links = ref<string[]>([]);

const newTag = ref("");
const tags = ref<string[]>([]);

const addLink = () => {
  if (newLink.value) {
    links.value.push(newLink.value);
    newLink.value = "";
  }
};

const removeLink = (link: string) => {
  const index = links.value.indexOf(link);
  links.value.splice(index, 1);
};

const addTag = () => {
  if (newTag.value) {
    tags.value.push(newTag.value);
    newTag.value = "";
  }
};

const removeTag = (tag: string) => {
  const index = tags.value.indexOf(tag);
  tags.value.splice(index, 1);
};

const createNote = async () => {
  if (!title.value) return toast.error("O campo de título é obrigatório.");
  if (!description.value) return toast.error("O campo de descrição é obrigatório.");
  if (newLink.value)
    return toast.warning(
      "Você deixou um link para adicionar. Clique no botão de adicionar ou deixe o campo vazio."
    );

  if (newTag.value)
    return toast.warning(
      "Você deixou uma tag para adicionar. Clique no botão de adicionar ou deixe o campo vazio."
    );

  const newNote = {
    title: title.value,
    description: description.value,
    links: links.value,
    tags: tags.value
  };
  await api.post("/notes", newNote);

  title.value = "";
  description.value = "";
  links.value = [];
  tags.value = [];

  toast.success("Nota criada com sucesso!");
  router.replace({ name: "Notes" });
};
</script>

<template>
  <Transition name="modal" appear>
    <div class="modal-wrapper">
      <div
        v-on-click-outside="() => router.replace({ name: 'Notes' })"
        class="modal max-w-screen gap-6 overflow-auto p-6"
      >
        <header
          class="flex items-center justify-between border-b border-solid border-dark-600 pb-4"
        >
          <h1 class="text-3xl font-light">Nova nota</h1>
          <button @click="router.replace({ name: 'Notes' })" class="rounded-xl bg-[#ff00001a] p-2">
            <img src="../assets/icons/close.svg" alt="Fechar" />
          </button>
        </header>

        <div>
          <input
            v-model="title"
            type="text"
            class="mb-3 w-full rounded-2xl border-2 border-transparent bg-dark-700 p-3 duration-500 placeholder:text-dark-500 focus:border-solid focus:border-cyan-500"
            placeholder="Título da nota"
          />

          <textarea
            v-model="description"
            class="w-full resize-none rounded-2xl border-2 border-transparent bg-dark-700 p-3 duration-500 placeholder:text-dark-500 focus:border-solid focus:border-cyan-500"
            rows="3"
            placeholder="Descrição"
          >
          </textarea>
        </div>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/link.svg" alt="Ícone" />
            Links
          </h3>

          <ul v-if="links.length" class="links mb-3 flex max-h-20 flex-col gap-2 overflow-auto">
            <NoteItem v-for="link in links" @remove="removeLink" :value="link" type="link" />
          </ul>

          <ItemInput @add="addLink" v-model="newLink" icon="add-link" placeholder="Novo link" />
        </div>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/tag.svg" alt="Ícone" />
            Tags
          </h3>

          <ul v-if="tags.length" class="tags mb-2 flex gap-2 overflow-auto">
            <NoteItem v-for="tag in tags" :value="tag" type="tag" @remove="removeTag" />
          </ul>

          <ItemInput @add="addTag" v-model="newTag" icon="add-tag" placeholder="Nova tag" />
        </div>

        <button @click="createNote" class="primary-button" data-test-id="create-note-button">
          Criar nota
        </button>
      </div>
    </div>
  </Transition>
</template>
