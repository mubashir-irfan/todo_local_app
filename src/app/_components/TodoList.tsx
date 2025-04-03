'use client'
import { Todo } from '@/types';
import { TodoItem } from '.';

import { useTodoStore } from '@/lib/store/useTodoStore';

import { Typography } from '@mui/material';

import React, { useEffect } from 'react';

const TodoList: React.FC = () => {
  const { todos, updateTodo, deleteTodo, setTodos } = useTodoStore();

  useEffect(() => {
    const storedTodos = todos;
    setTodos(storedTodos);
  }, [setTodos]);


  const handleUpdateTodo = (updatedTodo: Todo) => {
    updateTodo(updatedTodo);
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };



  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="p-4">


      <div className="md:flex md:space-x-4">
        <section aria-label="Incomplete Tasks" className="md:w-1/2">
          <Typography variant="h6" component="h2" gutterBottom>
            Incomplete Tasks
          </Typography>
          {incompleteTodos.length > 0 ? (
            <ul role="list">
              {incompleteTodos.map((todo) => (
                <li key={todo.name} role="listitem">
                  <TodoItem todo={todo} onUpdate={handleUpdateTodo} onDelete={handleDeleteTodo} />
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
              No incomplete tasks.
            </Typography>
          )}
        </section>

        <div className="my-4 h-[1px] bg-gray-300 dark:bg-gray-700 md:hidden" />

        <section aria-label="Completed Tasks" className="md:w-1/2">
          <Typography variant="h6" component="h2" gutterBottom>
            Completed Tasks
          </Typography>
          {completedTodos.length > 0 ? (
            <ul role="list">
              {completedTodos.map((todo) => (
                <li key={todo.name} role="listitem">
                  <TodoItem todo={todo} onUpdate={handleUpdateTodo} onDelete={handleDeleteTodo} />
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
              No completed tasks.
            </Typography>
          )}
        </section>
      </div>
    </div>
  );
};
export default TodoList;