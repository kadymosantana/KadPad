import { describe, it, expect, vi, beforeAll, afterEach } from "vitest";
import { flushPromises, shallowMount } from "@vue/test-utils";

import MockAdapter from "axios-mock-adapter";

import { api } from "@/services/api";
import store from "@/store";

import Sidebar from "@/components/Sidebar.vue";

const wrapper = shallowMount(Sidebar);

const mockData = [
  { id: 1, note_id: 1, user_id: 1, name: "vuejs" },
  { id: 1, note_id: 1, user_id: 1, name: "javascript" }
];

describe("Sidebar", async () => {
  const mockAxios: MockAdapter = new MockAdapter(api);

  mockAxios
    .onGet("/tags", {
      headers: { Authorization: `Bearer ${store.authData?.token}` }
    })
    .reply(200, mockData);

  const result = await api.get("/tags");
  wrapper.vm.tags = result.data;

  await flushPromises();

  describe("Request verification", () => {
    it("The request was made for the path /tags", () => {
      expect(mockAxios.history.get[0].url).toEqual(`/tags`);
    });

    it("The result of the request is equal to the mock and the data received in the component match the result", async () => {
      expect(result.data).toEqual(mockData);
      expect(wrapper.vm.tags).toEqual(result.data);
    });

    it("Tags are displayed in the interface", () => {
      expect(wrapper.text()).toContain("vuejs");
      expect(wrapper.text()).toContain("javascript");
    });
  });

  describe("Status of selected tags", () => {
    const vuejsTag = wrapper.findAll("li")[1];

    it("When clicked, the tag is added or removed to the list of selected tags", async () => {
      await vuejsTag.trigger("click");
      expect(store.selectedTags.includes("vuejs")).toBe(true);

      await vuejsTag.trigger("click");
      expect(store.selectedTags.includes("vuejs")).toBe(false);
    });

    it("When clicked, the tag receives styling classes", async () => {
      await vuejsTag.trigger("click");
      expect(vuejsTag.classes().includes("bg-dark-800")).toBe(true);
    });
  });
});
