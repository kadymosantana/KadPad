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
</style>
