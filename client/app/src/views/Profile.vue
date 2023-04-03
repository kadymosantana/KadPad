<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import { api } from "@/services/api";
import { authDataStore as authData } from "@/stores/authData";

import InputContainer from "@/components/InputContainer.vue";

const router = useRouter();
const toast = useToast();

const avatarURL = computed(() => {
  if (authData.user?.avatar) {
    return `${api.defaults.baseURL}/files/${authData.user?.avatar}`;
  } else {
    return "src/assets/icons/user.svg";
  }
});

const avatar = computed(() => authData.user?.avatar);

const name = ref(authData.user?.name);
const email = ref(authData.user?.email);
const oldPassword = ref("");
const newPassword = ref("");

const updateUserAvatar = async (e: Event) => {
  if (!(e.target as HTMLInputElement).files) return;
  try {
    const file = (e.target as HTMLInputElement).files![0];
    const fileUploadForm = new FormData();
    fileUploadForm.append("avatar", file);

    const updatedUser = await api.patch("/users/avatar", fileUploadForm);

    authData.setData(updatedUser.data);
    localStorage.setItem("@KadPad:user", JSON.stringify(updatedUser.data));

    toast.success("Avatar atualizado com sucesso!");
  } catch (error: any) {
    if (error.response) return toast.error(error.response.data.message);
    else return toast.error("Não foi possível atualizar o avatar.");
  }
};

const updateUserData = async () => {
  try {
    const updatedUser = await api.put("/users", {
      name: name.value,
      email: email.value,
      password: newPassword.value,
      old_password: oldPassword.value
    });

    authData.setData(updatedUser.data);
    localStorage.setItem("@KadPad:user", JSON.stringify(updatedUser.data));

    toast.success("Perfil atualizado com sucesso!");

    oldPassword.value = "";
    newPassword.value = "";
  } catch (error: any) {
    if (error.response) return toast.error(error.response.data.message);
    else return toast.error("Não foi possível atualizar os dados.");
  }
};

const signOut = () => {
  authData.$reset();
  localStorage.removeItem("@KadPad:user");
  localStorage.removeItem("@KadPad:token");

  router.replace({ name: "Login" });
};
</script>

<template>
  <div class="content flex h-screen w-screen flex-col items-center justify-center gap-10">
    <div class="relative">
      <img
        :class="{ 'bg-dark-900 p-8': !avatar }"
        class="h-44 w-44 rounded-full object-cover drop-shadow-xl"
        width="176"
        height="176"
        :src="avatarURL"
        alt="Foto de perfil"
      />
      <span
        class="absolute bottom-0 right-0 grid cursor-pointer grid-cols-[1fr] grid-rows-[1fr] rounded-full bg-cyan-500 p-3 duration-500 hover:bg-cyan-600"
        ><img class="col-[1] row-[1]" src="../assets/icons/add-photo.svg" alt="Adicionar foto" />

        <input
          @input="updateUserAvatar"
          type="file"
          class="col-[1] row-[1] w-[30px] cursor-pointer opacity-0"
      /></span>
    </div>
    <form @submit.prevent="updateUserData" class="flex flex-col gap-3">
      <InputContainer v-model="name" icon="user" placeholder="Nome" />
      <InputContainer v-model="email" type="email" icon="email" placeholder="E-mail" />
      <InputContainer
        v-model="oldPassword"
        type="password"
        icon="password"
        placeholder="Senha atual"
      />
      <InputContainer
        v-model="newPassword"
        type="password"
        icon="password"
        placeholder="Nova senha"
      />
      <button class="primary-button mt-3" data-test-id="submit-button">Salvar</button>
    </form>
    <button
      @click="signOut"
      class="flex items-center gap-2 rounded-xl bg-[#ff00001a] p-3"
      data-test-id="logout-button"
    >
      <img src="../assets/icons/logout.svg" />
      <span class="text-red-700">Sair</span>
    </button>
  </div>
</template>

<style scoped>
.content {
  background-image: linear-gradient(to top, #1f2125 73%, #27292e 0%);
}
</style>
