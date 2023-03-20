<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String },
  type: { type: String, default: "text", required: false },
  size: { type: String, required: false },
  icon: { type: String, required: true },
  placeholder: { type: String, required: true }
});
const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <div
    :class="{ 'px-6 py-4': size === 'large' }"
    class="input-container flex gap-5 rounded-2xl border-2 border-solid border-transparent bg-dark-700 p-3 shadow-md duration-500 focus-within:border-cyan-500"
  >
    <img :src="'src/assets/icons/' + icon + '.svg'" />
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="w-full bg-transparent placeholder:text-dark-500"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>
