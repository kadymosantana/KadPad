import { reactive } from "vue";

interface searchFiltersStore {
  searchedTitle: string;
  selectedTags: string[];
  setSearchedTitle: (title: string) => void;
  tagIsAlreadySelected: (tagName: string) => boolean;
  addTag: (tagName: string) => void;
  removeTag: (tagName: string) => void;
  $reset: () => void;
}

export const searchFiltersStore = reactive<searchFiltersStore>({
  // State
  searchedTitle: "",
  selectedTags: [],

  // Actions

  setSearchedTitle(title: string) {
    this.searchedTitle = title;
  },

  tagIsAlreadySelected(tagName: string) {
    return this.selectedTags.includes(tagName);
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
