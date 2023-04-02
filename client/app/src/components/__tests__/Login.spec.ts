import { type Mock, afterEach, describe, it, expect, vi } from "vitest";
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
  (useRouter as Mock).mockReturnValue({
    push: vi.fn()
  });

  vi.mock("vue-toastification", () => ({
    useToast: vi.fn(() => ({
      success: vi.fn()
    }))
  }));

  describe("SignIn", () => {
    const authDataSpyon = vi.spyOn(authData, "setData");
    const setItemStorageSpyon = vi.spyOn(Storage.prototype, "setItem");

    afterEach(() => {
      setItemStorageSpyon.mockClear();
    });

    const wrapper = mount<any>(Login);

    it("Router 'push' function is called upon login with a success request", async () => {
      wrapper.vm.activeLoginType = "signIn";

      wrapper.vm.email = "E-mail teste";
      wrapper.vm.password = "Senha teste";

      await wrapper.vm.signIn();

      expect(useRouter().push).toHaveBeenCalled();
      expect(useRouter().push).toHaveBeenCalledWith({ name: "Notes" });
    });

    it("AuthStore function 'setData' is called upon login with a success request", async () => {
      await wrapper.vm.signIn();
      expect(authDataSpyon).toHaveBeenCalled();
    });

    it("LocalStorage's 'setItem' function is called upon login with a success request", async () => {
      await wrapper.vm.signIn();
      expect(setItemStorageSpyon).toHaveBeenCalledTimes(2);
    });
  });

  describe("SignUp", () => {
    const wrapper = mount<any>(Login);

    it("When trying to register without filling all the fields, the error toast is called", async () => {
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

    it("When trying to register with all fields filled in, the success toast is called", async () => {
      wrapper.vm.name = "Nome teste";
      wrapper.vm.email = "E-mail teste";
      wrapper.vm.password = "Senha teste";

      await wrapper.vm.signUp();

      expect(useToast().success).toHaveBeenCalled();
      expect(useToast().success).toHaveBeenCalledWith("Cadastro feito com sucesso.");
    });
  });
});
