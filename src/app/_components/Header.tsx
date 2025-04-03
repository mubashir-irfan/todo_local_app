import { useTodoStore } from "@/lib/store/useTodoStore";
import { Todo } from "@/types";
import { Typography } from "@mui/material";
import { useState } from "react";
import { TodoForm } from "./";
import { Button, Modal } from "@/shared/components";

const Header = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { todos, addTodo } = useTodoStore();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTodo = (
    newTodo: Omit<Todo, "id" | "completed">,
  ): string | null => {
    if (todos.some((todo) => todo.name === newTodo.name)) {
      return "Todo name must be unique. This name already exists.";
    }

    const todo: Todo = {
      ...newTodo,
      id: Date.now(),
      completed: false,
    };
    addTodo(todo);
    return null;
  };

  return (
    <>
      <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 py-2">
        <Typography variant="h4" component="h1" gutterBottom>
          Todo List
        </Typography>

        <Button label="Add Todo" onClick={openModal} />
      </div>

      <Modal open={isModalOpen} onClose={closeModal} title="Add New Todo">
        <TodoForm onAddTodo={handleAddTodo} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Header;
