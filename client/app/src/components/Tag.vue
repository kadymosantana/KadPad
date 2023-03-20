<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true }
});
</script>

<template>
  <li class="rounded-xl bg-[#06b6d424] px-2 py-1 text-cyan-500">{{ name }}</li>
</template>
