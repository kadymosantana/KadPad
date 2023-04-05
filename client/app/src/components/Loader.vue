<script setup lang="ts">
const props = defineProps({
  type: { type: String, required: true }
});
</script>

<template>
  <span
    :class="{
      'note-loader': type === 'note',
      'button-loader': type === 'button'
    }"
  >
  </span>
</template>

<style scoped>
.note-loader {
  animation: rotate 1s infinite;
  height: 50px;
  width: 50px;
}

.note-loader:before,
.note-loader:after {
  border-radius: 50%;
  content: "";
  display: block;
  height: 20px;
  width: 20px;
}
.note-loader:before {
  animation: ball1 1s infinite;
  background-color: #fff;
  box-shadow: 30px 0 0 #06b6d4;
  margin-bottom: 10px;
}
.note-loader:after {
  animation: ball2 1s infinite;
  background-color: #06b6d4;
  box-shadow: 30px 0 0 #fff;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) scale(0.8);
  }
  50% {
    transform: rotate(360deg) scale(1.2);
  }
  100% {
    transform: rotate(720deg) scale(0.8);
  }
}

@keyframes ball1 {
  0% {
    box-shadow: 30px 0 0 #06b6d4;
  }
  50% {
    box-shadow: 0 0 0 #06b6d4;
    margin-bottom: 0;
    transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #06b6d4;
    margin-bottom: 10px;
  }
}

@keyframes ball2 {
  0% {
    box-shadow: 30px 0 0 #fff;
  }
  50% {
    box-shadow: 0 0 0 #fff;
    margin-top: -20px;
    transform: translate(15px, 15px);
  }
  100% {
    box-shadow: 30px 0 0 #fff;
    margin-top: 0;
  }
}

.button-loader {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background: linear-gradient(0deg, #06b6d4 33%, #27292e 100%);
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.button-loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #06b6d4;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
