import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import NoteCard from '../NoteCard.vue'

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

  it('The card displays the note information passed as a prop', async () => {
    expect(wrapper.html()).toContain('Fundamentos do Vue.js')
    expect(wrapper.html()).toContain('Entendendo o framework progressivo de JavaScript')
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
