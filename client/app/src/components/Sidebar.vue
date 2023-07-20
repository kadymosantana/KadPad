<script setup lang="ts">
import type { Tag } from "@/types";

import { ref, provide, watch } from "vue";
import { useRoute } from "vue-router";
import { vOnClickOutside } from "@vueuse/components";
import { useToast } from "vue-toastification";

import { api } from "@/services/api";
import { authDataStore as authData } from "@/stores/authData";
import { searchFiltersStore as searchFilters } from "@/stores/searchFilters";

import ProfileCard from "./ProfileCard.vue";
import router from "@/router";

const route = useRoute();
const toast = useToast();

const menu = ref(false);

const tags = ref<Tag[]>([]);

const fetchTags = async () => {
  try {
    const tagsData = await api.get("/tags");
    tags.value = tagsData.data;
  } catch (error: any) {
    if (error.response?.data?.message === "Token inválido") {
      authData.$reset();
      localStorage.removeItem("@KadPad:user");
      localStorage.removeItem("@KadPad:token");

      toast.error("Sessão expirada. Faça login novamente");
      router.replace({ name: "Login" });
    }
  }
};

watch(
  () => route?.name,
  () => {
    fetchTags();
  },
  { immediate: true }
);

const selectTag = (tagName: string) => {
  setTimeout(() => (menu.value = false), 200);

  if (searchFilters.tagIsAlreadySelected(tagName)) {
    searchFilters.removeTag(tagName);
  } else {
    searchFilters.addTag(tagName);
  }
};

const getIconURL = (iconName: string) => {
  return new URL(`../assets/icons/${iconName}.svg`, import.meta.url).href;
};

provide("menu", menu);
</script>

<template>
  <aside
    v-on-click-outside="() => (menu = false)"
    :class="{ 'z-10 grid w-80 grid-rows-[auto_1fr_auto]': menu, 'w-8': !menu }"
    class="fixed h-screen rounded-br-3xl rounded-tr-3xl bg-dark-700 p-4 shadow-lg duration-500 sm:grid sm:w-80 sm:grid-rows-[auto_1fr_auto]"
  >
    <button
      @click="menu = !menu"
      class="absolute bottom-[50%] right-[-1.5rem] top-[50%] z-10 flex max-h-max min-w-max items-center rounded-full bg-dark-600 p-2 shadow-xl sm:hidden"
    >
      <img :src="getIconURL(menu ? 'arrow-left' : 'arrow-right')" alt="Menu" />
    </button>

    <div
      :class="{ flex: menu, hidden: !menu }"
      class="mt-3 items-center justify-center gap-4 sm:flex"
    >
      <img
        width="140"
        src="https://user-images.githubusercontent.com/98963793/229954020-f8e0095c-2fbf-4fad-82ce-a32dd8708669.png"
        alt="KadPad Logo"
      />
    </div>

    <div :class="{ hidden: !menu }" class="self-center sm:block">
      <h3 class="mb-4 border-b border-solid border-dark-600 pb-2 text-xl">Minhas tags</h3>
      <ul
        class="flex max-h-60 flex-col gap-2 overflow-auto border-b border-solid border-dark-600 pb-4"
        role="listbox"
        aria-multiselectable="true"
      >
        <li
          @click="searchFilters.$reset()"
          :class="{
            'rounded-xl  bg-dark-800 ': !searchFilters.selectedTags.length
          }"
          :aria-selected="!searchFilters.selectedTags.length"
          role="option"
          class="flex cursor-pointer items-center gap-4 p-2"
        >
          <img :src="getIconURL('hash')" alt="Tag icon" />
          <span class="text-lg">Todas</span>
        </li>

        <li
          @click="selectTag(tag.name)"
          v-for="tag in tags"
          :key="tag.id"
          :class="{
            'rounded-xl bg-dark-800 ': searchFilters.tagIsAlreadySelected(tag.name)
          }"
          :aria-selected="searchFilters.tagIsAlreadySelected(tag.name)"
          role="option"
          class="flex cursor-pointer items-center gap-4 p-2"
        >
          <img :src="getIconURL('hash')" alt="Ícone" />
          <span class="text-lg">{{ tag.name }}</span>
        </li>
      </ul>
    </div>

    <ProfileCard />
  </aside>
</template>
