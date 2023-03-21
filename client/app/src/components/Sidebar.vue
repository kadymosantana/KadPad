<script setup lang="ts">
import type { Tag } from "@/types";

import { ref, onMounted } from "vue";
import { vOnClickOutside } from "@vueuse/components";

import { api } from "@/services/api";
import store from "@/store";

import ProfileCard from "./ProfileCard.vue";

onMounted(() => {
  fetchTags();
});

const modal = ref(false);
// onClickOutside(modal, (event) => {});

const tags = ref<Tag[]>([]);
const fetchTags = async () => {
  const tagsData = await api.get("/tags");
  tags.value = tagsData.data;
};

const tagAlreadySelected = (tagName: string) => store.selectedTags.includes(tagName);

const selectTag = (tagName: string) => {
  if (tagAlreadySelected(tagName)) {
    const index = store.selectedTags.indexOf(tagName);
    store.selectedTags.splice(index, 1);
  } else {
    store.selectedTags.push(tagName);
  }
};
</script>

<template>
  <button @click="modal = true" class="min-w-max rounded-xl bg-dark-800 p-3 sm:hidden">
    <img src="../assets/icons/menu.svg" alt="Menu" />
  </button>

  <aside
    v-if="modal"
    v-on-click-outside="(modal = false)"
    :class="{ flex: modal }"
    class="fixed h-screen w-80 grid-rows-[auto_1fr_auto] rounded-tr-3xl rounded-br-3xl bg-dark-700 p-4 shadow-lg sm:grid"
  >
    <div class="mt-3 hidden items-center justify-center gap-4 sm:flex">
      <img
        width="34"
        src="https://user-images.githubusercontent.com/98963793/221386784-f28b7347-a757-47bc-951a-8622354c3e07.png"
        alt="KadPad Logo"
      />
      <span class="mt-1 text-2xl font-light text-cyan-500">KadPad</span>
    </div>

    <div class="hidden self-center sm:block">
      <h3 class="mb-4 border-b border-solid border-dark-600 pb-2 text-xl">Minhas tags</h3>
      <ul
        class="flex max-h-60 flex-col gap-2 overflow-auto border-b border-solid border-dark-600 pb-4"
      >
        <li
          @click="store.selectedTags = []"
          :class="{ 'rounded-xl  bg-dark-800 ': !store.selectedTags.length }"
          class="flex cursor-pointer items-center gap-4 p-2"
        >
          <img src="../assets/icons/hash.svg" />
          <span class="text-lg">Todas</span>
        </li>

        <li
          @click="selectTag(tag.name)"
          v-for="tag in tags"
          :key="tag.id"
          :class="{ 'rounded-xl bg-dark-800 ': tagAlreadySelected(tag.name) }"
          class="flex cursor-pointer items-center gap-4 p-2"
        >
          <img src="../assets/icons/hash.svg" />
          <span class="text-lg">{{ tag.name }}</span>
        </li>
      </ul>
    </div>

    <ProfileCard />
  </aside>
</template>
