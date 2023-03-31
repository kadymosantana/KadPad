import { reactive } from "vue";

interface searchFiltersStore {
  searchedTitle: string;
  selectedTags: string[];
  tagIsAlreadySelected: (tagName: string) => boolean;
  setSearchedTitle: (title: string) => void;
  addTag: (tagName: string) => void;
  removeTag: (tagName: string) => void;
  $reset: () => void;
}

export const searchFiltersStore = reactive<searchFiltersStore>({
  // State
  searchedTitle: "",
  selectedTags: [],

  // Getters

  tagIsAlreadySelected(tagName: string) {
    return this.selectedTags.includes(tagName);
  },

  // Actions

  setSearchedTitle(title: string) {
    this.searchedTitle = title;
  },

  addTag(tagName: string) {
    this.selectedTags.push(tagName);
  },

  removeTag(tagName: string) {
    const index = this.selectedTags.indexOf(tagName);
    this.selectedTags.splice(index, 1);
  },

  $reset() {
    this.selectedTags = [];
  }
});
