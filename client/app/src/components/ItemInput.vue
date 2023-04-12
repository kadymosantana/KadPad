<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String, required: true },
  icon: { type: String, required: true },
  placeholder: { type: String, required: true }
});
const emits = defineEmits(["add", "update:modelValue"]);

const getIconURL = (iconName: string) => {
  return new URL(`../assets/icons/${iconName}.svg`, import.meta.url).href;
};
</script>

<template>
  <span
    class="flex items-center justify-between rounded-xl border border-dashed border-dark-500 px-3 py-2"
  >
    <input
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full bg-transparent"
    />
    <button @click="$emit('add')">
      <img :src="getIconURL(icon)" alt="Ícone" />
    </button>
  </span>
</template>
