import { type Mock, beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import MockAdapter from "axios-mock-adapter";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import { api } from "@/services/api";
import { authDataStore as authData } from "@/stores/authData";

import Profile from "@/views/Profile.vue";

describe("Profile", () => {
  vi.mock("vue-toastification");
  (useToast as Mock).mockReturnValue({
    success: vi.fn()
  });

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

    const wrapper = mount(Profile);

    it("When updating the avatar by choosing a file, the store's function of updating the authentication data is called with the updated user data", async () => {
      await wrapper.find("input[type='file']").trigger("input");

      expect(setAuthDataSpyon).toHaveBeenCalledTimes(1);
      expect(setAuthDataSpyon).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it("When updating the avatar by choosing a file, the localStorage set item function is called with the updated user data", async () => {
      await wrapper.find("input[type='file']").trigger("input");

      expect(setItemStorageSpyon).toHaveBeenCalledTimes(1);
      expect(setItemStorageSpyon).toHaveBeenCalledWith(
        "@KadPad:user",
        JSON.stringify(mockUpdatedUser)
      );
    });

    it("When updating the avatar by choosing a file, the success toast is displayed", async () => {
      await wrapper.find("input[type='file']").trigger("input");

      expect(useToast().success).toHaveBeenCalledTimes(1);
      expect(useToast().success).toHaveBeenCalledWith("Avatar atualizado com sucesso!");
    });
  });

  describe("Update user data", () => {
    mockAxios.onPut("/users").reply(200, mockUpdatedUser);

    const wrapper = mount(Profile);

    it("When updating the data by submitting the form, the function of the store to update the authentication data is called with the updated user data", async () => {
      await wrapper.find("form").trigger("submit");

      expect(setAuthDataSpyon).toHaveBeenCalledTimes(1);
      expect(setAuthDataSpyon).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it("When updating the data by submitting the form, the localStorage set item function is called with the updated user data", async () => {
      await wrapper.find("form").trigger("submit");

      expect(setItemStorageSpyon).toHaveBeenCalledTimes(1);
      expect(setItemStorageSpyon).toHaveBeenCalledWith(
        "@KadPad:user",
        JSON.stringify(mockUpdatedUser)
      );
    });

    it("When updating the data by submitting the form, the success toast is displayed", async () => {
      await wrapper.find("form").trigger("submit");

      expect(useToast().success).toHaveBeenCalledTimes(1);
      expect(useToast().success).toHaveBeenCalledWith("Perfil atualizado com sucesso!");
    });
  });

  describe("SignOut", () => {
    vi.mock("vue-router");
    (useRouter as Mock).mockReturnValue({
      replace: vi.fn()
    });

    const resetAuthDataSpyon = vi.spyOn(authData, "$reset");
    const removeItemStorageSpyon = vi.spyOn(Storage.prototype, "removeItem");

    const wrapper = mount(Profile);

    it("When clicking on the exit button, the function to reset the authentication data in the store is called", async () => {
      await wrapper.find("[data-test-id='logout-button']").trigger("click");

      expect(resetAuthDataSpyon).toHaveBeenCalled();
    });

    it("When clicking the exit button, the remove item from localStorage function is called twice", async () => {
      await wrapper.find("[data-test-id='logout-button']").trigger("click");

      expect(removeItemStorageSpyon).toHaveBeenCalledTimes(2);
      expect(removeItemStorageSpyon).toHaveBeenCalledWith("@KadPad:user");
      expect(removeItemStorageSpyon).toHaveBeenCalledWith("@KadPad:token");
    });

    it("When clicking on the exit button, the 'replace' function of the router is called", async () => {
      await wrapper.find("[data-test-id='logout-button']").trigger("click");

      expect(useRouter().replace).toHaveBeenCalled();
      expect(useRouter().replace).toHaveBeenCalledWith({ name: "Login" });
    });
  });
});
