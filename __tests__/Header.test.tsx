import Header from "@/app/_components/Header";
import { Todo } from "@/types";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useTodoStore } from "../src/lib/store/useTodoStore";

jest.mock("../src/lib/store/useTodoStore", () => ({
  useTodoStore: jest.fn(),
}));

describe("Header", () => {
  const mockTodos: Todo[] = [
    {
      id: 1,
      name: "Existing Task",
      completed: false,
      description: "",
      createdAt: new Date(),
    },
  ];

  const mockAddTodo = jest.fn();

  beforeEach(() => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todos: mockTodos,
      addTodo: mockAddTodo,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the header and add todo button", () => {
    render(<Header />);

    expect(screen.getByText("Todo List")).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
  });

  it("opens the modal when the add todo button is clicked", () => {
    render(<Header />);

    fireEvent.click(screen.getByText("Add Todo"));

    expect(screen.getByText("Add New Todo")).toBeInTheDocument();
  });

  it("calls addTodo with the new todo when TodoForm submits valid data", async () => {
    render(<Header />);

    fireEvent.click(screen.getByText("Add Todo"));

    fireEvent.change(screen.getByPlaceholderText("Todo Name"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Todo Description"), {
      target: { value: "Task Description" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(mockAddTodo).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "New Task",
        description: "Task Description",
        completed: false,
      }),
    );
  });

  it("displays an error message when adding a todo with a duplicate name", async () => {
    render(<Header />);

    fireEvent.click(screen.getByText("Add Todo"));

    fireEvent.change(screen.getByPlaceholderText("Todo Name"), {
      target: { value: "Existing Task" },
    });
    fireEvent.change(screen.getByPlaceholderText("Todo Description"), {
      target: { value: "Task Description" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(
      screen.getByText("Todo name must be unique. This name already exists."),
    ).toBeInTheDocument();
  });
});
