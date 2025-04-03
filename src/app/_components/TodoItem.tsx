import React, { useState } from "react";
import { Todo } from "@/types";
import {
  FaEdit,
  FaCheckSquare,
  FaSquare,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.name);
  const [editedDescription, setEditedDescription] = useState(
    todo.description || "",
  ); // Handle optional description

  const handleCompleteToggle = () => {
    onUpdate({ ...todo, completed: !todo.completed });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate({ ...todo, name: editedText, description: editedDescription });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedText(todo.name);
    setEditedDescription(todo.description || "");
  };

  return (
    <div
      className={`p-4 border border-gray-300 rounded-md shadow-md mb-2 ${
        todo.completed ? "bg-gray-100" : "bg-white"
      }`}
      data-testid={`todo-item-${todo.id}`}
    >
      <div className="flex flex-col">
        <div>
          {isEditing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full mb-1"
              aria-label={`Edit todo item ${todo.name}`}
              placeholder="Title"
            />
          ) : (
            <span
              className={`text-lg ${
                todo.completed ? "line-through text-gray-500" : "text-black"
              }`}
            >
              {todo.name}
            </span>
          )}
        </div>
        <div>
          {isEditing ? (
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
              aria-label={`Edit todo description ${todo.description}`}
              placeholder="Description"
            />
          ) : (
            <span className="text-sm text-gray-600">{todo.description}</span>
          )}
        </div>
        <div className="flex items-center space-x-2 self-end">
          <button
            onClick={handleCompleteToggle}
            aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
            data-testid={`complete-toggle-${todo.id}`}
          >
            {todo.completed ? (
              <FaCheckSquare size={20} />
            ) : (
              <FaSquare size={20} />
            )}
          </button>
          {isEditing ? (
            <>
              <button
                onClick={handleSaveClick}
                className="text-black"
                aria-label="Save changes"
                data-testid={`save-edit-${todo.id}`}
              >
                <FaCheck size={20} />
              </button>
              <button
                onClick={handleCancelClick}
                className="text-black"
                aria-label="Cancel changes"
                data-testid={`cancel-edit-${todo.id}`}
              >
                <FaTimes size={20} />
              </button>
            </>
          ) : (
            <button
              onClick={handleEditClick}
              className="text-black"
              aria-label="Edit todo"
              data-testid={`edit-button-${todo.id}`}
            >
              <FaEdit size={20} />
            </button>
          )}

          <button
            onClick={() => onDelete(todo.id)}
            className="text-black"
            aria-label="Delete todo"
            data-testid={`delete-button-${todo.id}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
