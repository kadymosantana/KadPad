<script setup lang="ts">
const props = defineProps({
  type: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, required: true }
})
</script>

<template>
  <li
    class="flex justify-between items-center bg-dark-900 px-3 py-2 rounded-xl border border-transparent"
    :class="{ underline: type === 'link', 'gap-2 min-w-max': type === 'tag' }"
  >
    <a v-if="type === 'link'" class="bg-transparent">{{ value }}</a>
    <span v-else class="bg-transparent">{{ value }}</span>

    <img class="cursor-pointer" :src="'src/assets/icons/' + icon + '.svg'" alt="" />
  </li>
</template>
