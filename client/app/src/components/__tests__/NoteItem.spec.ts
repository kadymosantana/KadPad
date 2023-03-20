import { describe, it, expect, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";

import NoteItem from "@/components/NoteItem.vue";

const wrapper = shallowMount(NoteItem, {
  props: {
    type: "link",
    value: "https://vuejs.org"
  }
});

beforeEach(async () => {
  await wrapper.setProps({
    type: "link",
    value: "https://vuejs.org"
  });
});

describe("NoteItem", () => {
  describe("Conditional rendering of tags according to 'type' prop", () => {
    it("The component renders an <a> tag if its type is 'link'", () => {
      expect(wrapper.find("a").exists()).toBe(true);
    });

    it("The component renders a <span> tag if its type is 'tag'", async () => {
      await wrapper.setProps({
        type: "tag",
        value: "vuejs"
      });

      expect(wrapper.find("span").exists()).toBe(true);
    });
  });

  describe("Conditional styling classes according to 'type' prop", () => {
    it("The component gets the 'underline' class if its type is 'link'", () => {
      expect(wrapper.classes().includes("underline")).toBe(true);
    });
  });

  describe("Remove item button", () => {
    it("Remove item button emits 'remove' event when clicked", async () => {
      const button = wrapper.find("button");
      await button.trigger("click");
      expect(wrapper.emitted()).toHaveProperty("remove");
    });

    it("The 'remove' event is emitted passing the 'value' prop as an argument", () => {
      expect(wrapper.emitted("remove")![0]).toEqual([wrapper.props("value")]);
    });
  });
});
