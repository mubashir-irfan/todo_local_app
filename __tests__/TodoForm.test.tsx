import TodoForm from "@/app/_components/TodoForm";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("TodoForm Component", () => {
  const mockOnAddTodo = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with inputs and button", () => {
    render(<TodoForm onAddTodo={mockOnAddTodo} onClose={mockOnClose} />);

    expect(screen.getByPlaceholderText("Todo Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Todo Description")).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
  });

  it("updates the input fields correctly", () => {
    render(<TodoForm onAddTodo={mockOnAddTodo} onClose={mockOnClose} />);

    const nameInput = screen.getByPlaceholderText(
      "Todo Name",
    ) as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText(
      "Todo Description",
    ) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: "New Todo" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Todo Description" },
    });

    expect(nameInput.value).toBe("New Todo");
    expect(descriptionInput.value).toBe("Todo Description");
  });

  it("shows error when submitted with empty fields", () => {
    render(<TodoForm onAddTodo={mockOnAddTodo} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Add Todo"));

    expect(screen.getByText("Todo name is required")).toBeInTheDocument();
    expect(
      screen.getByText("Todo description is required"),
    ).toBeInTheDocument();
  });

  it("calls onAddTodo with correct data when form is submitted", () => {
    render(<TodoForm onAddTodo={mockOnAddTodo} onClose={mockOnClose} />);

    const nameInput = screen.getByPlaceholderText("Todo Name");
    const descriptionInput = screen.getByPlaceholderText("Todo Description");

    fireEvent.change(nameInput, { target: { value: "Sample Todo" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Sample Description" },
    });

    fireEvent.click(screen.getByText("Add Todo"));

    expect(mockOnAddTodo).toHaveBeenCalledWith({
      name: "Sample Todo",
      description: "Sample Description",
    });
  });

  it("does not call onClose if onAddTodo returns an error", () => {
    mockOnAddTodo.mockReturnValue("Error: Todo already exists");

    render(<TodoForm onAddTodo={mockOnAddTodo} onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText("Todo Name"), {
      target: { value: "Duplicate Todo" },
    });
    fireEvent.change(screen.getByPlaceholderText("Todo Description"), {
      target: { value: "Duplicate Description" },
    });

    fireEvent.click(screen.getByText("Add Todo"));

    expect(mockOnClose).not.toHaveBeenCalled();
    expect(screen.getByText("Error: Todo already exists")).toBeInTheDocument();
  });

  it("calls onClose when todo is added successfully", () => {
    mockOnAddTodo.mockReturnValue(null);

    render(<TodoForm onAddTodo={mockOnAddTodo} onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText("Todo Name"), {
      target: { value: "New Todo" },
    });
    fireEvent.change(screen.getByPlaceholderText("Todo Description"), {
      target: { value: "Description" },
    });

    fireEvent.click(screen.getByText("Add Todo"));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
