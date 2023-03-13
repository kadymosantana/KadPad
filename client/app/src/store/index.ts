import { reactive } from 'vue'

const store = reactive({
  authData: null,
  searchedNote: '',
  selectedTags: [],

  noteModalState: false,
  addNoteModalState: false
})

export default store
