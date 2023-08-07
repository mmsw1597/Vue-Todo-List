import axios from 'axios'
import { defineStore } from 'pinia'

interface CreateTodoPayload {
  title: string
}

export const useTodosStore = defineStore('todos', {
  state: () => ({}),
  getters: {},
  actions: {
    async createTodo({ title }: CreateTodoPayload) {
      await axios.post('/api/todos', {
        method: 'POST',
        data: {
          title
        }
      })
    }
  }
})
