<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String },
  type: { type: String, default: 'text', required: false },
  size: { type: String, required: false },
  icon: { type: String, required: true },
  placeholder: { type: String, required: true }
})
const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <div
    :class="{ 'px-6 py-4': size === 'large' }"
    class="input-container flex border-2 border-solid border-transparent focus-within:border-cyan-500 gap-5 p-3 bg-dark-700 shadow-md rounded-2xl duration-500"
  >
    <img :src="'src/assets/icons/' + icon + '.svg'" />
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="bg-transparent placeholder:text-dark-500 w-full"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>
