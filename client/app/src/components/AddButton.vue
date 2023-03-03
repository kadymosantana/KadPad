<script setup lang="ts">
const props = defineProps({
  icon: { type: String, required: true },
  placeholder: { type: String, required: true }
})
</script>

<template>
  <span
    class="flex justify-between items-center px-3 py-2 rounded-xl border border-dashed border-dark-500"
  >
    <input class="bg-transparent" :placeholder="placeholder" />
    <button>
      <img :src="'/src/assets/icons/' + icon + '.svg'" />
    </button>
  </span>
</template>
