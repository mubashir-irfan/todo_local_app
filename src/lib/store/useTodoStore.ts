// useTodoStore.ts
import { create } from 'zustand';
import { Todo } from '@/types';
import { TodosService } from '@/lib/services';

interface TodoState {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: string) => void;
  setTodos: (todos: Todo[]) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: TodosService.getTodos(),

  addTodo: (todo) =>
    set((state) => {
      const newTodos = [...state.todos, todo];
      TodosService.updateTodos(newTodos);
      console.group('add todo group')
      console.log('add todo', todo)
      console.log('new todos', newTodos)
      console.groupEnd()
      return { todos: newTodos };
    }),

  updateTodo: (updatedTodo) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.name === updatedTodo.name ? updatedTodo : todo
      );
      TodosService.updateTodos(newTodos);
      return { todos: newTodos };
    }),

  deleteTodo: (name) =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.name !== name)
      TodosService.updateTodos(newTodos);
      return { todos: newTodos };
    }),
  setTodos: (todos: Todo[]) => set({ todos }),
}));