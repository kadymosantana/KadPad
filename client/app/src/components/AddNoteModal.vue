<script setup lang="ts">
import store from '../store'
</script>

<template>
  <Transition name="modal">
    <div v-if="store.addNoteModalState" class="modal-wrapper">
      <div class="modal-container">
        <header
          class="flex items-center justify-between border-b border-solid border-dark-600 pb-4"
        >
          <h1 class="text-3xl font-light">Nova nota</h1>
          <button @click="store.addNoteModalState = false" class="bg-[#ff00001a] p-2 rounded-xl">
            <img src="../assets/icons/close.svg" alt="Fechar" />
          </button>
        </header>
        <div>
          <input
            type="text"
            class="w-full border-2 border-transparent focus:border-solid focus:border-cyan-500 rounded-2xl mb-3 p-3 bg-dark-700 placeholder:text-dark-500 duration-500"
            placeholder="Título da nota"
          />
          <textarea
            class="w-full border-2 border-transparent focus:border-solid focus:border-cyan-500 rounded-2xl p-3 bg-dark-700 resize-none placeholder:text-dark-500 duration-500"
            rows="3"
            placeholder="Descrição"
          ></textarea>
        </div>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/link.svg" alt="" />
            Links
          </h3>
          <ul class="flex flex-col gap-2 max-h-24 overflow-auto mb-3">
            <li
              class="flex justify-between items-center bg-dark-900 p-3 rounded-xl border border-transparent"
            >
              <span>https://github.com/kadymosantana</span>
              <img class="cursor-pointer" src="../assets/icons/close.svg" alt="Remover link" />
            </li>
          </ul>
          <button
            class="flex justify-between items-center border border-dashed border-cyan-500 p-3 w-full rounded-xl"
          >
            <span>Novo link</span>
            <img src="../assets/icons/add-link.svg" />
          </button>
        </div>

        <div>
          <h3 class="subtitle">
            <img src="../assets/icons/tag.svg" />
            Tags
          </h3>
          <ul class="flex flex-wrap gap-2 overflow-auto">
            <li
              class="flex gap-2 items-center min-w-max bg-dark-900 px-3 py-2 rounded-xl border border-transparent"
            >
              <span>vuejs</span>
              <img src="../assets/icons/close.svg" alt="Remover link" />
            </li>
            <button
              class="flex gap-4 items-center border border-dashed border-cyan-500 px-3 rounded-xl"
            >
              <span>Nova tag</span>
              <img src="../assets/icons/add-tag.svg" />
            </button>
          </ul>
        </div>
        <button
          class="w-full bg-cyan-500 hover:bg-cyan-600 rounded-xl text-dark-800 p-3 duration-500"
        >
          Criar nota
        </button>
      </div>
    </div>
  </Transition>
</template>
