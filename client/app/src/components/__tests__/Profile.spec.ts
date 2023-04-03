import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import MockAdapter from "axios-mock-adapter";

import { useToast } from "vue-toastification";

import { api } from "@/services/api";
import { authDataStore as authData } from "@/stores/authData";

import Profile from "@/views/Profile.vue";

describe("Profile", () => {
  const setAuthDataSpyon = vi.spyOn(authData, "setData");
  const setItemStorageSpyon = vi.spyOn(Storage.prototype, "setItem");

  const mockAxios: MockAdapter = new MockAdapter(api);
  const mockUpdatedUser = {
    id: "1",
    name: "Nome teste",
    email: "E-mail teste",
    password: "Senha teste",
    avatar: "Teste.jpg",
    created_at: "Datetime teste",
    updated_at: "Datetime teste"
  };

  describe("Update user avatar", () => {
    mockAxios.onPatch("/users/avatar").reply(200, mockUpdatedUser);

    const wrapper = shallowMount(Profile);

    it("Ao atualizar o avatar escolhendo um arquivo, a função da store de atualizar os dados de autenticação é chamada com os dados atualizados do usuário", async () => {
      await wrapper.find("input[type='file']").trigger("input");

      expect(setAuthDataSpyon).toHaveBeenCalledTimes(1);
      expect(setAuthDataSpyon).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it("Ao atualizar o avatar escolhendo um arquivo, a função de setar item do localStorage é chamada com os dados atualizados do usuário", async () => {
      await wrapper.find("input[type='file']").trigger("input");

      expect(setItemStorageSpyon).toHaveBeenCalledTimes(1);
      expect(setItemStorageSpyon).toHaveBeenCalledWith(
        "@KadPad:user",
        JSON.stringify(mockUpdatedUser)
      );
    });

    it("Ao atualizar o avatar escolhendo um arquivo, o toast de sucesso é exibido", async () => {
      vi.mock("vue-toastification", () => ({
        useToast: vi.fn(() => ({
          success: vi.fn()
        }))
      }));

      await wrapper.find("input[type='file']").trigger("input");

      expect(useToast().success).toHaveBeenCalledTimes(1);
      expect(useToast().success).toHaveBeenCalledWith("Avatar atualizado com sucesso!");
    });
  });

  describe("Update user data", () => {
    mockAxios.onPut("/users").reply(200, mockUpdatedUser);

    const wrapper = shallowMount(Profile);

    it("Ao atualizar os dados dando submit no form, a função da store de atualizar os dados de autenticação é chamada com os dados atualizados do usuário", async () => {
      await wrapper.find("form").trigger("submit");

      expect(setAuthDataSpyon).toHaveBeenCalledTimes(1);
      expect(setAuthDataSpyon).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it("Ao atualizar os dados dando submit no form, a função de setar item do localStorage é chamada com os dados atualizados do usuário", async () => {
      await wrapper.find("form").trigger("submit");

      expect(setItemStorageSpyon).toHaveBeenCalledTimes(1);
      expect(setItemStorageSpyon).toHaveBeenCalledWith(
        "@KadPad:user",
        JSON.stringify(mockUpdatedUser)
      );
    });

    it("Ao atualizar os dados dando submit no form, o toast de sucesso é exibido", async () => {
      vi.mock("vue-toastification", () => ({
        useToast: vi.fn(() => ({
          success: vi.fn()
        }))
      }));

      await wrapper.find("form").trigger("submit");

      expect(useToast().success).toHaveBeenCalledTimes(1);
      expect(useToast().success).toHaveBeenCalledWith("Perfil atualizado com sucesso!");
    });
  });

  describe("SignOut", () => {
    const resetAuthDataSpyon = vi.spyOn(authData, "$reset");
    const removeItemStorageSpyon = vi.spyOn(Storage.prototype, "removeItem");

    const wrapper = shallowMount(Profile);

    it("Ao clicar no botão de sair, a função de resetar os dados de autenticação na store é chamada", async () => {
      await wrapper.find("[data-test-id='logout-button']").trigger("click");

      expect(resetAuthDataSpyon).toHaveBeenCalled();
    });

    it("Ao clicar no botão de sair, a função de remover item do localStorage é chamada duas vezes", async () => {
      await wrapper.find("[data-test-id='logout-button']").trigger("click");

      expect(removeItemStorageSpyon).toHaveBeenCalledTimes(2);
      expect(removeItemStorageSpyon).toHaveBeenCalledWith("@KadPad:user");
      expect(removeItemStorageSpyon).toHaveBeenCalledWith("@KadPad:token");
    });
  });
});
