import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import Login from '@/views/Login.vue'
import LoginTypeButton from '@/components/LoginTypeButton.vue'

const wrapper = shallowMount(Login)

describe('Login', () => {
  describe('Conditional rendering', () => {
    it("The text of the submit button must be changed according to the value of 'activeLoginType'", async () => {
      const loginTypeButtons = wrapper.findAllComponents(LoginTypeButton)
      const submitButton = wrapper.find("button[type='submit']")

      await loginTypeButtons[0].trigger('click')
      expect(submitButton.text()).toEqual('Entrar')

      await loginTypeButtons[1].trigger('click')
      expect(submitButton.text()).toEqual('Cadastrar')
    })
  })
})
