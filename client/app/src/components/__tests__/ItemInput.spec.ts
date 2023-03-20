import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import ItemInput from '@/components/ItemInput.vue'

const wrapper = shallowMount(ItemInput, {
  props: {
    modelValue: 'initial text',
    'onUpdate:modelValue': (e: Event) => wrapper.setProps({ modelValue: e }),
    icon: 'add-link',
    placeholder: 'Novo link'
  }
})

describe('ItemInput', () => {
  const input = wrapper.find('input')

  describe('v-model', () => {
    it("The input emits the 'update:modelValue' event when typing", async () => {
      await input.trigger('input')
      expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    })

    it("The 'modelValue' prop value is updated when the input emits its event", async () => {
      await input.setValue('new text')
      expect(wrapper.props('modelValue')).toBe('new text')
    })
  })

  describe('Rendering dependent on passed props', () => {
    it("The component renders the icon in the <img> tag according to the passed 'icon' prop", () => {
      const img = wrapper.find('img')
      expect(img.attributes('src')).toContain(wrapper.props('icon'))
    })

    it("The component renders the placeholder text in the input according to the passed 'placeholder' prop", () => {
      expect(input.attributes('placeholder')).toEqual(wrapper.props('placeholder'))
    })
  })

  describe('Add button', () => {
    const ItemInput = wrapper.find('button')

    it("The component emits the 'add' event when the add item button is clicked", async () => {
      await ItemInput.trigger('click')
      expect(wrapper.emitted()).toHaveProperty('add')
    })
  })
})
