<script setup lang="ts">
import Tag from './Tag.vue'
</script>

<template>
  <li
    class="flex flex-col gap-3 bg-dark-700 rounded-3xl p-5 my-4 w-72 max-h-content shadow-md break-inside-avoid-column cursor-pointer duration-300 hover:-translate-y-3"
  >
    <h1 class="text-2xl font-semibold">Fundamentos do Vue.js</h1>
    <p class="text-ellipsis">
      <slot></slot>
    </p>
    <ul class="flex gap-2">
      <Tag />
      <Tag />
      <Tag />
    </ul>
  </li>
</template>
