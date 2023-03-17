import type { Note } from '@/types'

import { describe, it, expect } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import MockAdapter from 'axios-mock-adapter'

import { api } from '@/services/api'
import store from '@/store'

import NotesList from '@/components/NotesList.vue'

const wrapper = shallowMount(NotesList)

const mockData: Note[] = [
  {
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
    links: [
      {
        id: 1,
        note_id: 1,
        url: 'https://vuejs.org',
        created_at: '2023-02-22 12:00'
      }
    ],
    created_at: '2023-02-22 22:00',
    updated_at: '2023-02-22 22:00'
  },
  {
    id: 2,
    user_id: 1,
    title: 'Fundamentos do JavaScript',
    description: 'Entendendo a linguagem de programação mais utilizada do mundo',
    tags: [
      {
        id: 1,
        note_id: 1,
        user_id: 1,
        name: 'javascript'
      }
    ],
    links: [
      {
        id: 1,
        note_id: 1,
        url: 'https://javascript.com',
        created_at: '2023-02-22 12:00'
      }
    ],
    created_at: '2023-02-22 22:00',
    updated_at: '2023-02-22 22:00'
  }
]

describe('NotesList', async () => {
  const mockAxios: MockAdapter = new MockAdapter(api)

  mockAxios
    .onGet('/notes', {
      headers: { Authorization: `Bearer ${store.authData?.token}` }
    })
    .reply(200, mockData)

  const result = await api.get('/notes')
  wrapper.vm.notes = result.data

  await flushPromises()

  describe('Request verification', () => {
    it('The request was made for the path /notes', () => {
      expect(mockAxios.history.get[0].url).toEqual(`/notes`)
    })

    it('The result of the request is equal to the mock and the data received in the component match the result', async () => {
      expect(result.data).toEqual(mockData)
      expect(wrapper.vm.notes).toEqual(result.data)
    })
  })

  describe('Displaying notes in the interface', () => {
    const notesList = wrapper.find('.notes')
    const notes = wrapper.findAll('.note')

    it('Notes are displayed in the interface', () => {
      expect(notes.length).toBe(2)
      expect(notesList.exists()).toBe(true)
    })

    it('Notes list is not rendered if it has no notes', () => {
      wrapper.vm.notes = []
      expect(notesList.exists()).toBe(false)
    })
  })
})
