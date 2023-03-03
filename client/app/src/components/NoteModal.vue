<script setup lang="ts">
import store from '../store'
import Tag from './Tag.vue'
</script>

<template>
  <Transition name="modal">
    <div v-if="store.noteModalState" class="modal-wrapper">
      <div class="modal-container">
        <header class="flex justify-between pb-4">
          <h1 class="text-4xl font-bold">Fundamentos do Vue.js</h1>
          <button
            @click="store.noteModalState = false"
            class="bg-[#ff00001a] p-2 rounded-xl self-start"
          >
            <img src="../assets/icons/close.svg" alt="Fechar" />
          </button>
        </header>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/description.svg" />
            Descrição
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nemo quaerat
            necessitatibus a delectus excepturi cupiditate quae magni quidem impedit earum qui,
            neque corrupti odio tenetur quod commodi voluptatem vero. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Placeat odit beatae in nisi rem ipsa quisquam. Quaerat
            officiis optio incidunt odio. Quas mollitia autem officiis pariatur maxime deleniti
            consequuntur repellat?
          </p>
        </div>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/link.svg" alt="" />
            Links
          </h3>
          <ul class="flex flex-col gap-2 max-h-20 overflow-auto mb-3">
            <li class="bg-[#06b6d424] p-2 underline text-cyan-500 rounded-xl">
              <a href="https://github.com/kadymosantana">https://github.com/kadymosantana</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/tag.svg" />
            Tags
          </h3>
          <ul class="flex flex-wrap gap-2 mb-3">
            <Tag />
            <Tag />
            <Tag />
          </ul>
        </div>
      </div>
    </div>
  </Transition>
</template>
