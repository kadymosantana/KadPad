import { beforeEach, describe, it, expect, vi, type Mock } from "vitest";
import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import MockAdapter from "axios-mock-adapter";

import { api } from "@/services/api";

import NewNoteModal from "@/views/NewNoteModal.vue";
import NoteItem from "@/components/NoteItem.vue";
import ItemInput from "@/components/ItemInput.vue";

describe("NewNoteModal", () => {
  const mockAxios: MockAdapter = new MockAdapter(api);
  mockAxios.onPost("/notes").reply(200);

  describe("Vue Router", async () => {
    vi.mock("vue-router");

    (useRouter as Mock).mockReturnValue({
      replace: vi.fn()
    });

    const wrapper = mount<any>(NewNoteModal);

    it("When clicking on the close button of the modal, the 'replace' method is called on the router", async () => {
      await wrapper.find("header button").trigger("click");
      expect(useRouter().replace).toHaveBeenCalled();
      expect(useRouter().replace).toHaveBeenCalledWith({ name: "Notes" });
    });
  });

  describe("Feedback messages of vue-toastification", () => {
    vi.mock("vue-toastification", () => ({
      useToast: vi.fn(() => ({
        success: vi.fn(),
        warning: vi.fn(),
        error: vi.fn()
      }))
    }));

    const wrapper = mount<any>(NewNoteModal);
    it("When pressing the create note button with the title and description fields filled in, a success toast is issued", async () => {
      wrapper.vm.title = "Título teste";
      wrapper.vm.description = "Descrição teste";

      await wrapper.find("[data-test-id='create-note-button']").trigger("click");
      expect(useToast().success).toHaveBeenCalledTimes(1);
      expect(useToast().success).toHaveBeenCalledWith("Nota criada com sucesso!");
    });

    it("When pressing the create note button with the title or description fields empty, an error toast is issued", async () => {
      const button = wrapper.find("[data-test-id='create-note-button']");

      wrapper.vm.title = "Título teste";
      wrapper.vm.description = "";

      await button.trigger("click");
      expect(useToast().error).toHaveBeenCalledTimes(1);
      expect(useToast().error).toHaveBeenCalledWith("O campo de descrição é obrigatório.");

      wrapper.vm.title = "";
      wrapper.vm.description = "Descrição teste";

      await button.trigger("click");
      expect(useToast().error).toHaveBeenCalledTimes(2);
      expect(useToast().error).toHaveBeenCalledWith("O campo de título é obrigatório.");
    });
  });

  describe("Links list", () => {
    const wrapper = mount<any>(NewNoteModal);

    const addLinkButton = wrapper.findAllComponents(ItemInput)[0];

    it("Link list is not rendered if there are no links", () => {
      wrapper.vm.links = [];
      expect(wrapper.find(".links").exists()).toBe(false);
    });

    it("The value of 'newLink' is added to the list of links when the 'add' event is emitted", async () => {
      wrapper.vm.newLink = "https://vuejs.org";
      addLinkButton.vm.$emit("add");
      expect(wrapper.vm.links.includes("https://vuejs.org")).toBe(true);
    });

    it("The value passed as an argument when issuing the 'remove' event is removed from the list of links", () => {
      const linkItem = wrapper.findAllComponents(NoteItem)[0];
      linkItem.vm.$emit("remove", linkItem.props("value")); // prop value: https://vuejs.org

      expect(wrapper.vm.links.includes("https://vuejs.org")).toBe(false);
    });
  });

  describe("Tags list", () => {
    const wrapper = mount<any>(NewNoteModal);

    const addTagButton = wrapper.findAllComponents(ItemInput)[1];

    it("Tag list is not rendered if there are no tags", () => {
      wrapper.vm.tags = [];
      expect(wrapper.find(".tags").exists()).toBe(false);
    });

    it("The value of 'newTag' is added to the list of tags when the 'add' event is emitted", () => {
      wrapper.vm.newTag = "vuejs";
      addTagButton.vm.$emit("add");
      expect(wrapper.vm.tags.includes("vuejs")).toBe(true);
    });

    it("The value passed as an argument when issuing the 'remove' event is removed from the tag list", () => {
      const tagItem = wrapper.findAllComponents(NoteItem)[0];
      tagItem.vm.$emit("remove", tagItem.props("value")); // prop value: vuejs

      expect(wrapper.vm.tags.includes("vuejs")).toBe(false);
    });
  });
});
