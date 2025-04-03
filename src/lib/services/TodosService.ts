import { Todo } from '@/types';
import { LocalStorage } from '.';
import { TODO_STORAGE_KEY } from '@/shared/constants';

const TodosService = {
  getTodos: (): Todo[] => {
    const todosString = LocalStorage.getItem(TODO_STORAGE_KEY);
    return todosString ? JSON.parse(todosString) : [];
  },
  updateTodos: (todos: Todo[]): void => {
    LocalStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  },
};

export default TodosService;