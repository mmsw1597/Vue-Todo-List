<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTodosStore } from '~/store/todos'
import type { Todo } from '~/store/todos'
import TheIcon from '~/components/TheIcon.vue'

const props = defineProps<{
  todo: Todo
}>()

const todosStore = useTodosStore()
const router = useRouter()

const done = computed({
  get() {
    return props.todo.done
  },
  set(value) {
    todosStore.updateTodo({
      ...props.todo,
      done: value
    })
  }
})

function toggleDone() {
  done.value = !done.value
}

function onTodoModal() {
  todosStore.currentTodo = { ...props.todo }
  router.push(`/${props.todo.id}`)
}
</script>

<template>
  <div class="todo-item">
    <TheIcon
      :active="todo.done"
      @click="toggleDone">
      check
    </TheIcon>
    <div
      class="title"
      @click="onTodoModal">
      {{ todo.title }}
    </div>
    <div
      v-if="todosStore.filterStatus === 'all'"
      class="drag-handle">
      <span class="material-symbols-outlined"> drag_indicator </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.todo-item {
  height: var(--item-height);
  border-bottom: 1px solid var(--border-color);
  padding-left: 80px;
  padding-right: 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  :deep(.the-icon) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 24px;
    margin: auto;
  }
  .title {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .drag-handle {
    color: #ddd;
    cursor: move;
  }
}
</style>
