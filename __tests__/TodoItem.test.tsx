import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "@/app/_components/TodoItem";
import { Todo } from "@/types";
import "@testing-library/jest-dom";

describe("TodoItem Component", () => {
  const mockTodo: Todo = {
    id: 1,
    name: "Sample Todo",
    description: "This is a test todo item",
    completed: false,
  };

  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the todo item correctly", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />,
    );

    expect(screen.getByText("Sample Todo")).toBeInTheDocument();
    expect(screen.getByText("This is a test todo item")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("calls onUpdate when checkbox is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ completed: true }),
    );
  });

  it("enters edit mode when edit button is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText("edit"));

    // Expect multiple textboxes (for name and description)
    const textBoxes = screen.getAllByRole("textbox");
    expect(textBoxes.length).toBe(2); // Name and Description fields should appear
    expect(textBoxes[0]).toHaveValue("Sample Todo"); // Name input
    expect(textBoxes[1]).toHaveValue("This is a test todo item"); // Description input
  });

  it("saves the edited todo", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText("edit"));

    // Select the first textbox (assumed to be the todo name)
    const textBoxes = screen.getAllByRole("textbox");
    fireEvent.change(textBoxes[0], { target: { value: "Updated Todo" } });

    fireEvent.click(screen.getByLabelText("save"));

    expect(mockOnUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Updated Todo" }),
    );
  });

  it("cancels editing and restores original values", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText("edit"));

    // Get all textboxes (first is name, second is description)
    const textBoxes = screen.getAllByRole("textbox");
    fireEvent.change(textBoxes[0], { target: { value: "New Value" } });

    fireEvent.click(screen.getByLabelText("cancel"));

    // Ensure original todo name is displayed
    expect(screen.getByText(mockTodo.name)).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText("delete"));

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockTodo.id);
  });
});
