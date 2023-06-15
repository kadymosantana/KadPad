<template>
  <div class="h-screen w-screen bg-dark-800">
    <RouterView />
  </div>
</template>

<style>
.Vue-Toastification__toast.toast {
  font-family: "Inter", sans-serif;
}

.modal-enter-active,
.modal-leave-active {
  transition: 0.3s linear;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.3s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.3s linear;
}
</style>
