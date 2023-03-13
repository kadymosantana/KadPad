<template>
  <div class="w-screen h-screen bg-dark-800">
    <RouterView />
  </div>
</template>

<style>
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(0);
  transform: scale(0);
}

*::-webkit-scrollbar {
  width: 5px;
  height: 3px;
}

*::-webkit-scrollbar-thumb {
  background-color: #06b6d4;
  border-radius: 50px;
}
</style>
