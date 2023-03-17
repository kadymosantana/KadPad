import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import NoteCard from '../NoteCard.vue'

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

describe('NoteCard', () => {
  it('The card displays the note information passed as a prop', async () => {
    expect(wrapper.text()).toContain('Fundamentos do Vue.js')
    expect(wrapper.text()).toContain('Entendendo o framework progressivo de JavaScript')
  })

  it('Card does not display tag list if it has no elements', async () => {
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
