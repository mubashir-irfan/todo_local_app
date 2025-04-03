import { create } from "zustand";
import { Todo } from "@/types";
import { TodosService } from "@/lib/services";

interface TodoState {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: number) => void;
  setTodos: (todos: Todo[]) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: TodosService.getTodos(),

  addTodo: (todo) =>
    set((state) => {
      const newTodos = [...state.todos, todo];
      TodosService.updateTodos(newTodos);
      return { todos: newTodos };
    }),

  updateTodo: (updatedTodo) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      );
      TodosService.updateTodos(newTodos);
      return { todos: newTodos };
    }),

  deleteTodo: (id: number) =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id);
      TodosService.updateTodos(newTodos);
      return { todos: newTodos };
    }),
  setTodos: (todos: Todo[]) => set({ todos }),
}));