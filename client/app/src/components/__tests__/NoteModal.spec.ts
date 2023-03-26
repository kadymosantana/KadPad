import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import NoteModal from "@/components/NoteModal.vue";
import Tag from "@/components/Tag.vue";

const wrapper = mount<any>(NoteModal, {
  props: {
    note: {
      id: 1,
      user_id: 1,
      title: "Fundamentos do Vue.js",
      description: "Entendendo o framework progressivo de JavaScript",
      tags: [
        { id: 1, note_id: 1, user_id: 1, name: "vuejs" },
        { id: 2, note_id: 1, user_id: 1, name: "javascript" }
      ]
    }
  }
});

describe("NoteModal", async () => {
  describe("Props", () => {
    it("The modal displays the note information passed as a prop", () => {
      expect(wrapper.text()).toContain(wrapper.props("note").description);

      const tags = wrapper.findAllComponents(Tag);
      const tagsNames = tags.map((tag) => tag.props("name"));

      expect(tagsNames.includes("vuejs")).toBe(true);
      expect(tagsNames.includes("javascript")).toBe(true);
    });
  });

  describe("Note deletion", () => {
    it("When clicking on the red delete button, the value of 'activeDeleteButton' becomes 'confirm'", async () => {
      const deleteButton = wrapper.find(".delete");
      await deleteButton.trigger("click");
      expect(wrapper.vm.activeDeleteButton).toEqual("confirm");
    });

    it("When deleting the note, the component exits the interface", async () => {
      const confirmButton = wrapper.find(".confirm");
      wrapper.vm.activeDeleteButton = "confirm";
      await confirmButton.trigger("click");
    });
  });
});
