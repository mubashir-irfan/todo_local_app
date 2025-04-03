"use client";
import React, { useEffect, useState } from "react";
import { Todo } from "@/types";
import { TodoItem } from ".";
import { useTodoStore } from "@/lib/store/useTodoStore";
import { Typography } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // Updated import

const TodoList: React.FC = () => {
  const { todos, updateTodo, deleteTodo, setTodos } = useTodoStore();
  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = todos;
    setTodos(storedTodos);
  }, [setTodos, todos]);

  useEffect(() => {
    setIncompleteTodos(todos.filter((todo) => !todo.completed));
    setCompletedTodos(todos.filter((todo) => todo.completed));
  }, [todos]);

  const handleUpdateTodo = (updatedTodo: Todo) => {
    updateTodo(updatedTodo);
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const items =
        source.droppableId === "incomplete"
          ? [...incompleteTodos]
          : [...completedTodos];
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      if (source.droppableId === "incomplete") {
        setIncompleteTodos(items);
      } else {
        setCompletedTodos(items);
      }

      const updatedTodos = [...incompleteTodos, ...completedTodos];
      setTodos(updatedTodos);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4">
        <div className="md:flex md:space-x-4">
          <section aria-label="Incomplete Tasks" className="md:w-1/2">
            <Typography variant="h6" component="h2" gutterBottom>
              Incomplete Tasks
            </Typography>
            <Droppable droppableId="incomplete">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  role="list"
                >
                  {incompleteTodos.map((todo, index) => (
                    <Draggable
                      key={todo.id.toString()}
                      draggableId={todo.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          role="listitem"
                          className={index > 0 ? "mt-4" : ""}
                        >
                          <TodoItem
                            todo={todo}
                            onUpdate={handleUpdateTodo}
                            onDelete={handleDeleteTodo}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            {incompleteTodos.length === 0 && (
              <Typography
                variant="body2"
                className="text-gray-500 dark:text-gray-400"
              >
                No incomplete tasks.
              </Typography>
            )}
          </section>

          <div className="my-4 h-[1px] bg-gray-300 dark:bg-gray-700 md:hidden" />

          <section aria-label="Completed Tasks" className="md:w-1/2">
            <Typography variant="h6" component="h2" gutterBottom>
              Completed Tasks
            </Typography>
            <Droppable droppableId="completed">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  role="list"
                >
                  {completedTodos.map((todo, index) => (
                    <Draggable
                      key={todo.id.toString()}
                      draggableId={todo.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          role="listitem"
                          className={index > 0 ? "mt-4" : ""}
                        >
                          <TodoItem
                            todo={todo}
                            onUpdate={handleUpdateTodo}
                            onDelete={handleDeleteTodo}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            {completedTodos.length === 0 && (
              <Typography
                variant="body2"
                className="text-gray-500 dark:text-gray-400"
              >
                No completed tasks.
              </Typography>
            )}
          </section>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TodoList;
