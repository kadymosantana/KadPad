import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import InputContainer from '@/components/InputContainer.vue'

const wrapper = mount(InputContainer, {
  props: {
    modelValue: 'initialText',
    'onUpdate:modelValue': (e: Event) => wrapper.setProps({ modelValue: e }),
    icon: 'password',
    placeholder: 'Senha'
  }
})

describe('InputContainer', () => {
  const input = wrapper.find('input')

  describe('v-model', () => {
    it("The input emits the 'update:modelValue' event when typing", async () => {
      await input.trigger('input')
      expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    })

    it("The 'modelValue' prop value is updated when the input emits its event", async () => {
      await input.setValue('newText')
      expect(wrapper.props('modelValue')).toBe('newText')
    })
  })

  describe('Rendering dependent on passed props', () => {
    it("The component renders the icon in the <img> tag according to the passed 'icon' prop", () => {
      const img = wrapper.find('img')
      expect(img.attributes('src')).toMatch(wrapper.props('icon'))
    })

    it("The component renders the placeholder text in the input according to the passed 'placeholder' prop", () => {
      expect(input.attributes('placeholder')).toMatch(wrapper.props('placeholder'))
    })

    it("The component adds the 'px-6 py-4' styling classes if the value of the 'size' prop passed is 'large'", async () => {
      await wrapper.setProps({ size: 'large' })
      expect(wrapper.classes().includes('px-6')).toBe(true)
      expect(wrapper.classes().includes('py-4')).toBe(true)
    })
  })
})
