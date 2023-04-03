import type { Note } from "@/types/index";

import { type Mock, describe, it, expect, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import MockAdapter from "axios-mock-adapter";

import { api } from "@/services/api";
import { authDataStore as authData } from "@/stores/authData";

import NoteModal from "@/views/NoteModal.vue";
import Tag from "@/components/Tag.vue";

const mockData: Note = {
  id: 1,
  user_id: 1,
  title: "Fundamentos do Vue.js",
  description: "Entendendo o framework progressivo de JavaScript",
  tags: [
    {
      id: 1,
      note_id: 1,
      user_id: 1,
      name: "vuejs"
    },
    {
      id: 2,
      note_id: 1,
      user_id: 1,
      name: "javascript"
    }
  ],
  links: [{ id: 1, note_id: 1, url: "https://vuejs.org", created_at: "2023-02-22 12:00" }],
  created_at: "2023-02-22 22:00",
  updated_at: "2023-02-22 22:00"
};

describe("NoteModal", async () => {
  const mockAxios: MockAdapter = new MockAdapter(api);
  mockAxios.onDelete("/notes/1").reply(200);
  mockAxios
    .onGet("/notes/1", {
      headers: { Authorization: `Bearer ${authData.token}` }
    })
    .reply(200, mockData);

  await flushPromises();

  describe("Request verification", async () => {
    const wrapper = mount<any>(NoteModal);

    const result = await api.get("/notes/1");
    wrapper.vm.note = result.data;

    it("The request was made for the path /notes/1", () => {
      expect(mockAxios.history.get[0].url).toEqual(`/notes/1`);
    });

    it("The result of the request is equal to the mock and the data received in the component match the result", async () => {
      expect(result.data).toEqual(mockData);
      expect(wrapper.vm.note).toEqual(result.data);
    });

    it("Title, description, tags and links information are displayed on the interface", () => {
      expect(wrapper.text()).toContain(mockData.description);

      expect(wrapper.text()).toContain(mockData.tags[0].name);
      expect(wrapper.text()).toContain(mockData.tags[1].name);

      expect(wrapper.text()).toContain(mockData.links[0].url);
    });

    it("Checking the 'name' prop value passed to the Tag component", () => {
      const tagComponents = wrapper.findAllComponents(Tag);
      const tagComponentsProps = tagComponents.map((tag) => tag.props("name"));

      expect(tagComponents.length).toEqual(2);
      expect(tagComponentsProps.includes(mockData.tags[0].name)).toEqual(true);
      expect(tagComponentsProps.includes(mockData.tags[1].name)).toEqual(true);
    });
  });

  describe("Note deletion", () => {
    vi.mock("vue-router");
    (useRouter as Mock).mockReturnValue({
      replace: vi.fn()
    });

    vi.mock("vue-toastification");
    (useToast as Mock).mockReturnValue({
      success: vi.fn()
    });

    const wrapper = mount<any>(NoteModal);
    wrapper.vm.note = mockData;

    it("When clicking on the red delete button, the value of 'activeDeleteButton' becomes 'confirm'", async () => {
      const deleteButton = wrapper.find("[data-test-id='delete-note-button']");

      await deleteButton.trigger("click");
      expect(wrapper.vm.activeDeleteButton).toEqual("confirm");

      const confirmButton = wrapper.find("[data-test-id='confirm-button']");

      expect(confirmButton.isVisible()).toBe(true);
    });

    it("When clicking the confirm button, the 'replace' method of the router is called", async () => {
      wrapper.vm.activeDeleteButton = "confirm";
      await wrapper.find("[data-test-id='confirm-button']").trigger("click");

      expect(useRouter().replace).toHaveBeenCalled();
    });

    it("When clicking the confirm button, the success toast is called", async () => {
      wrapper.vm.activeDeleteButton = "confirm";
      await wrapper.find("[data-test-id='confirm-button']").trigger("click");

      expect(useToast().success).toHaveBeenCalled();
    });
  });
});
