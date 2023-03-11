import { reactive } from 'vue'
import type { Store } from '../types'

const store = reactive<Store>({
  authData: null,
  noteModalState: false,
  addNoteModalState: false
})

export default store
