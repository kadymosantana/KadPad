import { afterEach, describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import MockAdapter from "axios-mock-adapter";

import { api } from "@/services/api";
import { authDataStore as authData } from "@/stores/authData";

import Login from "@/views/Login.vue";

describe("Login", () => {
  const mockAxios = new MockAdapter(api);
  mockAxios.onPost("/sessions").reply(200, { user: {}, token: "" });
  mockAxios.onPost("/users").reply(201);

  vi.mock("vue-router");
  vi.mock("vue-toastification");
  vi.mock("@/stores/authData");

  useRouter.mockReturnValue({
    push: vi.fn()
  });

  useToast.mockReturnValue({
    success: vi.fn(),
    error: vi.fn()
  });

  describe("SignIn", () => {
    const authDataSpyon = vi.spyOn(authData, "setData");
    const setItemStorageSpyon = vi.spyOn(Storage.prototype, "setItem");

    afterEach(() => {
      setItemStorageSpyon.mockClear();
    });

    const wrapper = mount<any>(Login);

    it("A função 'push' do roteador é chamada ao fazer login com uma requisição de sucesso", async () => {
      wrapper.vm.activeLoginType = "signIn";

      wrapper.vm.email = "E-mail teste";
      wrapper.vm.password = "Senha teste";

      await wrapper.vm.signIn();

      expect(useRouter().push).toHaveBeenCalled();
      expect(useRouter().push).toHaveBeenCalledWith({ name: "Notes" });
    });

    it("A função 'setData' da store de autenticação é chamada ao fazer login com uma requisição de sucesso", async () => {
      await wrapper.vm.signIn();
      expect(authDataSpyon).toHaveBeenCalled();
    });

    it("A função 'setItem' do localStorage é chamada ao fazer login com uma requisição de sucesso", async () => {
      await wrapper.vm.signIn();
      expect(setItemStorageSpyon).toHaveBeenCalledTimes(2);
    });
  });

  describe("SignUp", () => {
    const wrapper = mount<any>(Login);

    it("Ao tentar se cadastrar sem preencher todos os campos, o toast de erro é chamado", async () => {
      wrapper.vm.activeLoginType = "signUp";

      wrapper.vm.name = "Nome teste";
      await wrapper.vm.signUp();
      expect(useToast().error).toHaveBeenCalledTimes(1);
      expect(useToast().error).toHaveBeenCalledWith("Preencha todos os campos.");

      wrapper.vm.email = "E-mail teste";
      await wrapper.vm.signUp();
      expect(useToast().error).toHaveBeenCalledTimes(2);
      expect(useToast().error).toHaveBeenCalledWith("Preencha todos os campos.");
    });

    it("Ao tentar se cadastrar com todos os campos preenchidos, o toast de sucesso é exibido", async () => {
      wrapper.vm.name = "Nome teste";
      wrapper.vm.email = "E-mail teste";
      wrapper.vm.password = "Senha teste";

      await wrapper.vm.signUp();

      expect(useToast().success).toHaveBeenCalled();
      expect(useToast().success).toHaveBeenCalledWith("Cadastro feito com sucesso.");
    });
  });
});
