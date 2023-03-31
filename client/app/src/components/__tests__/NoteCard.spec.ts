import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";

import NoteCard from "@/components/NoteCard.vue";
import NoteModal from "@/views/NoteModal.vue";
import Tag from "@/components/Tag.vue";

const wrapper = shallowMount<any>(NoteCard, {
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

describe("NoteCard", () => {
  it("The card displays the note information passed as a prop", async () => {
    expect(wrapper.text()).toContain("Fundamentos do Vue.js");
    expect(wrapper.text()).toContain("Entendendo o framework progressivo de JavaScript");

    const tags = wrapper.findAllComponents(Tag);
    const tagsNames = tags.map((tag) => tag.props("name"));

    expect(tagsNames.includes("vuejs")).toBe(true);
    expect(tagsNames.includes("javascript")).toBe(true);
  });

  it("Card does not display tag list if it has no elements", async () => {
    await wrapper.setProps({
      note: {
        id: 1,
        title: "Fundamentos do Vue.js",
        description: "Entendendo o framework progressivo de JavaScript",
        tags: []
      }
    });
    expect(wrapper.find("ul").exists()).toBe(false);
  });
});
