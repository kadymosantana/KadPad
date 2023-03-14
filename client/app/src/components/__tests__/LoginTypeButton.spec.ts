import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import LoginTypeButton from '../LoginTypeButton.vue'

const wrapper = mount(LoginTypeButton, {
  props: {
    type: 'signIn',
    activeLoginType: 'signUp'
  }
})

describe('Login Type Button', () => {
  describe('Conditional classes', () => {
    it("The button does not receive the 'active' class if its 'type' is not equal to 'activeLoginType'", () => {
      expect(wrapper.classes().includes('active')).toBe(false)
    })

    it("The button receives the 'active' class if its 'type' is equal to 'activeLoginType'", async () => {
      await wrapper.setProps({
        type: 'signUp',
        activeLoginType: 'signUp'
      })
      expect(wrapper.classes().includes('active')).toBe(true)
    })

    it("When clicked, the button emits the 'change-login-type' event and receives the 'active' class", async () => {
      await wrapper.trigger('click')
      expect(wrapper.emitted()).toHaveProperty('change-login-type')
      expect(wrapper.classes().includes('active')).toBe(true)
    })
  })
})
