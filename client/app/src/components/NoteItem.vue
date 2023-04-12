<script setup lang="ts">
const props = defineProps({
  type: { type: String, required: true },
  value: { type: String, required: true }
});
const emits = defineEmits(["remove"]);

const getIconURL = (iconName: string) => {
  return new URL(`../assets/icons/${iconName}.svg`, import.meta.url).href;
};
</script>

<template>
  <li
    class="flex items-center justify-between rounded-xl border border-transparent bg-dark-900 px-3 py-2"
    :class="{ underline: type === 'link', 'min-w-max gap-2': type === 'tag' }"
  >
    <a v-if="type === 'link'" class="bg-transparent">{{ value }}</a>
    <span v-else class="bg-transparent">{{ value }}</span>

    <button @click="$emit('remove', value)" class="cursor-pointer">
      <img :src="getIconURL('close')" alt="" />
    </button>
  </li>
</template>
