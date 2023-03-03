<script setup lang="ts">
const props = defineProps({
  activeLoginType: { type: String, required: true },
  type: { type: String, required: true }
})

const emits = defineEmits(['change-login-type'])
</script>

<template>
  <button
    @click="$emit('change-login-type')"
    :class="{ active: activeLoginType === type }"
    class="relative flex flex-col items-center gap-2 text-2xl font-light"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.active::after {
  content: '';
  width: 100%;
  height: 5px;
  background-color: #06b6d4;
  border-radius: 25px;
  margin-bottom: -3px;
}
</style>
