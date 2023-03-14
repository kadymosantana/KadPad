import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import NoteCard from '../NoteCard.vue'
import NoteModal from '../NoteModal.vue'

describe('NoteCard', () => {
  const wrapper = mount(NoteCard, {
    props: {
      note: {
        id: 1,
        title: 'Fundamentos do Vue.js',
        description: 'Entendendo o framework progressivo de JavaScript',
        tags: ['vuejs', 'javascript']
      }
    }
  })

  it('O card exibe as informações da nota passada como prop', async () => {
    expect(wrapper.html()).toContain('Fundamentos do Vue.js')
    expect(wrapper.html()).toContain('Entendendo o framework progressivo de JavaScript')
  })

  it('O card não exibe a lista de tags caso ela não tenha nenhum elemento', async () => {
    await wrapper.setProps({
      note: {
        id: 1,
        title: 'Fundamentos do Vue.js',
        description: 'Entendendo o framework progressivo de JavaScript',
        tags: []
      }
    })
    expect(wrapper.find('ul').exists()).toBe(false)
  })
})
