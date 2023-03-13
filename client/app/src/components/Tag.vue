<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true }
})
</script>

<template>
  <li class="bg-[#06b6d424] px-2 py-1 text-cyan-500 rounded-xl">{{ name }}</li>
</template>
