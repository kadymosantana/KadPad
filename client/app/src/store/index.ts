import type { Store } from '@/types'

import { reactive } from 'vue'

const store = reactive<Store>({
  authData: null,
  searchedNote: '',
  selectedTags: []
})

export default store
