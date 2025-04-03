import React, { useState } from "react";
import { Todo } from "@/types";
import { Checkbox, IconButton, TextField } from "@mui/material";
import { MdOutlineEdit, MdCheck, MdClose } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => string | null;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.name);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [updateError, setUpdateErrorText] = useState<string>();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCompleted = event.target.checked;
    setIsCompleted(newCompleted);
    const updatedTodo = {
      ...todo,
      completed: newCompleted,
    };
    onUpdate(updatedTodo);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editedText) return setUpdateErrorText("Name can not be empty");
    if (!editedDescription)
      return setUpdateErrorText("Description can not be empty");

    const status = onUpdate({
      ...todo,
      name: editedText,
      description: editedDescription,
    });

    if (status) {
      return setUpdateErrorText(status);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(todo.name);
    setEditedDescription(todo.description);
    setIsEditing(false);
    setUpdateErrorText("");
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toLocaleString();
  };

  return (
    <div className="flex items-start space-x-2 p-2 border rounded-lg shadow-sm border-gray-200 dark:border-gray-700">
      <Checkbox
        checked={isCompleted}
        onChange={handleCheckboxChange}
        inputProps={{ "aria-label": "completed" }}
        sx={{
          color: "black",
          "& .MuiSvgIcon-root": {
            color: "black",
          },
        }}
      />
      <div className="flex-grow flex flex-col">
        {isEditing ? (
          <div className="flex flex-col gap-3">
            <TextField
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              variant="outlined"
              size="small"
            />
            <TextField
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              label="Description"
              variant="outlined"
              size="small"
              multiline
              className="mt-2"
            />
          </div>
        ) : (
          <>
            <span
              className={`flex-grow ${isCompleted ? "line-through text-gray-500 dark:text-gray-400" : ""}`}
            >
              {todo.name}
            </span>
            {todo.description && (
              <p
                className={`text-sm text-gray-600 dark:text-gray-400 ${isCompleted ? "line-through text-gray-600 dark:text-gray-400" : ""}`}
              >
                {todo.description}
              </p>
            )}
          </>
        )}
        <div className="text-right text-xs text-gray-500 dark:text-gray-400">
          Created at: {formatDate(new Date(todo.id))}
        </div>
        <div>
          {updateError && (
            <p className="text-center text-sm text-red-700">{updateError}</p>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="flex flex-col justify-between gap-2">
          <div className="flex justify-center my-auto">
            <IconButton
              aria-label="save"
              onClick={handleSave}
              sx={{ color: "black" }}
            >
              <MdCheck size={20} />
            </IconButton>
            <IconButton
              aria-label="cancel"
              onClick={handleCancel}
              sx={{ color: "black" }}
            >
              <MdClose size={20} />
            </IconButton>
          </div>
        </div>
      ) : (
        <>
          <IconButton
            aria-label="edit"
            onClick={handleEdit}
            sx={{ color: "black" }}
          >
            <MdOutlineEdit size={20} />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={handleDelete}
            sx={{ color: "black" }}
          >
            <RiDeleteBin5Fill size={20} />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default TodoItem;
