<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String },
  type: { type: String, default: "text", required: false },
  size: { type: String, required: false },
  icon: { type: String, required: true },
  placeholder: { type: String, required: true }
});
const emits = defineEmits(["update:modelValue"]);

const getIconURL = (iconName: string) => {
  return new URL(`../assets/icons/${iconName}.svg`, import.meta.url).href;
};
</script>

<template>
  <div
    :class="{ 'px-6 py-4': size === 'large' }"
    class="input-container flex gap-5 rounded-2xl border-2 border-solid border-transparent bg-dark-700 p-3 shadow-md duration-500 focus-within:border-cyan-500"
  >
    <img :src="getIconURL(icon)" alt="Ícone" />
    <input
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="w-full bg-transparent placeholder:text-dark-500"
    />
  </div>
</template>
