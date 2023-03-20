import type { Note } from '@/types/index'

import { describe, it, expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import MockAdapter from 'axios-mock-adapter'

import { api } from '@/services/api'
import store from '@/store'

import NoteModal from '@/components/NoteModal.vue'
import Tag from '@/components/Tag.vue'

const wrapper = mount(NoteModal)

const mockData: Note = {
  id: 1,
  user_id: 1,
  title: 'Fundamentos do Vue.js',
  description: 'Entendendo o framework progressivo de JavaScript',
  tags: [
    {
      id: 1,
      note_id: 1,
      user_id: 1,
      name: 'vuejs'
    },
    {
      id: 2,
      note_id: 1,
      user_id: 1,
      name: 'javascript'
    }
  ],
  links: [{ id: 1, note_id: 1, url: 'https://vuejs.org', created_at: '2023-02-22 12:00' }],
  created_at: '2023-02-22 22:00',
  updated_at: '2023-02-22 22:00'
}

describe('NoteModal', async () => {
  const mockAxios: MockAdapter = new MockAdapter(api)

  mockAxios
    .onGet('/notes/1', {
      headers: { Authorization: `Bearer ${store.authData?.token}` }
    })
    .reply(200, mockData)

  const result = await api.get('/notes/1')
  wrapper.vm.note = result.data

  await flushPromises()

  describe('Request verification', () => {
    it('The request was made for the path /notes/1', () => {
      expect(mockAxios.history.get[0].url).toEqual(`/notes/1`)
    })

    it('The result of the request is equal to the mock and the data received in the component match the result', async () => {
      expect(result.data).toEqual(mockData)
      expect(wrapper.vm.note).toEqual(result.data)
    })

    it('Title, description, tags and links information are displayed on the interface', () => {
      expect(wrapper.text()).toContain(mockData.title)
      expect(wrapper.text()).toContain(mockData.description)

      expect(wrapper.text()).toContain(mockData.tags[0].name)
      expect(wrapper.text()).toContain(mockData.tags[1].name)

      expect(wrapper.text()).toContain(mockData.links[0].url)
    })

    it("Checking the 'name' prop value passed to the Tag component", () => {
      const tagComponents = wrapper.findAllComponents(Tag)
      const tagComponentsProps = tagComponents.map((tag) => tag.props('name'))

      expect(tagComponents.length).toEqual(2)
      expect(tagComponentsProps.includes(mockData.tags[0].name)).toEqual(true)
      expect(tagComponentsProps.includes(mockData.tags[1].name)).toEqual(true)
    })
  })
  describe('Deleção da nota', () => {
    it("Ao clicar no botão vermelho de deleção, o valor de 'activeDeleteButton' passa a ser 'confirm'", async () => {
      const deleteButton = wrapper.find('.delete')
      await deleteButton.trigger('click')
      expect(wrapper.vm.activeDeleteButton).toEqual('confirm')
    })

    it('Ao excluir a nota, o componente sai da interface', async () => {
      const confirmButton = wrapper.find('.confirm')
      wrapper.vm.activeDeleteButton = 'confirm'
      await confirmButton.trigger('click')
    })
  })
})
