import { describe, it, expect, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";

import NewNoteModal from "@/views/NewNoteModal.vue";
import NoteItem from "@/components/NoteItem.vue";
import ItemInput from "@/components/ItemInput.vue";

const wrapper = shallowMount<any>(NewNoteModal);

describe("NewNoteModal", () => {
  describe("Links list", () => {
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
