<template>
  <div class="h-screen w-screen bg-dark-800">
    <RouterView />
  </div>
</template>

<style>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transition: all 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  -webkit-transform: scale(0);
  transform: scale(0);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s;
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
