"use client";
import { Button } from "@/shared/components";
import { Todo } from "@/types";
import React, { useState } from "react";

interface TodoFormProps {
  onAddTodo: (todo: Pick<Todo, "name" | "description">) => string | null;
  onClose: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo, onClose }) => {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [textError, setTextError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTextError(null);
    setDescriptionError(null);

    const textContent = text.trim();
    const descriptionContent = description.trim();

    if (!textContent) {
      setTextError("Todo name is required");
    }

    if (!descriptionContent) {
      setDescriptionError("Todo description is required");
    }

    if (!textContent || !descriptionContent) return;

    const errorMessage = onAddTodo({
      name: text.trim(),
      description: description.trim(),
    });

    if (errorMessage) {
      setTextError(errorMessage);
    } else {
      setText("");
      setDescription("");
      onClose();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 min-w-[500px] flex flex-col gap-2"
    >
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Todo Name"
          className={`border ${textError ? "border-red-500" : "border-gray-300"} rounded-md w-full p-2`}
        />
        {textError && <p className="text-red-500 text-sm my-1">{textError}</p>}
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Todo Description"
          className={`border ${descriptionError ? "border-red-500" : "border-gray-300"} rounded-md w-full p-2`}
        />
        {descriptionError && (
          <p className="text-red-500 text-sm my-1">{descriptionError}</p>
        )}
      </div>
      <div className="flex justify-center items-center">
        <Button
          label="Add Todo"
          type="submit"
          onClick={() => { }}
          className="mx-auto"
        />
      </div>
    </form>
  );
};

export default TodoForm;
