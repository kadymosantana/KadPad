import { reactive } from 'vue'

const store = reactive({
  authData: null,
  noteModalState: false,
  addNoteModalState: false
})

export default store
