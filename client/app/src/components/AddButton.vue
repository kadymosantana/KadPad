<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String },
  icon: { type: String, required: true },
  placeholder: { type: String, required: true }
})
const emits = defineEmits(['add', 'update:modelValue'])
</script>

<template>
  <span
    class="flex justify-between items-center px-3 py-2 rounded-xl border border-dashed border-dark-500"
  >
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="bg-transparent"
      :placeholder="placeholder"
    />
    <button @click="$emit('add')">
      <img :src="'/src/assets/icons/' + icon + '.svg'" />
    </button>
  </span>
</template>
