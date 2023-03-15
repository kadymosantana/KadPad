import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Tag from '@/components/Tag.vue'

describe('Tag', () => {
  const wrapper = mount(Tag)

  it('A tag exibe corretamente o nome passado como prop', async () => {
    await wrapper.setProps({ name: 'vuejs' })
    expect(wrapper.text()).toEqual('vuejs')
  })
})
