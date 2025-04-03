import TodoList from "@/app/_components/TodoList";
import { Todo } from "@/types";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useTodoStore } from "../src/lib/store/useTodoStore";

jest.mock("../src/lib/store/useTodoStore", () => ({
  useTodoStore: jest.fn(),
}));

describe("TodoList", () => {
  const mockTodos: Todo[] = [
    {
      id: 1,
      name: "Task 1",
      completed: false,
      description: "",
      createdAt: new Date(),
    },
    {
      id: 2,
      name: "Task 2",
      completed: true,
      description: "",
      createdAt: new Date(),
    },
    {
      id: 3,
      name: "Task 3",
      completed: false,
      description: "",
      createdAt: new Date(),
    },
    {
      id: 4,
      name: "Task 4",
      completed: true,
      description: "",
      createdAt: new Date(),
    },
  ];

  const mockUpdateTodo = jest.fn();
  const mockDeleteTodo = jest.fn();
  const mockSetTodos = jest.fn();

  beforeEach(() => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todos: mockTodos,
      updateTodo: mockUpdateTodo,
      deleteTodo: mockDeleteTodo,
      setTodos: mockSetTodos,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders incomplete and completed tasks", () => {
    render(<TodoList />);

    expect(screen.getByText("Incomplete Tasks")).toBeInTheDocument();
    expect(screen.getByText("Completed Tasks")).toBeInTheDocument();

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
    expect(screen.getByText("Task 4")).toBeInTheDocument();
  });

  it("renders 'No incomplete tasks' when there are no incomplete tasks", () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todos: mockTodos.filter((todo) => todo.completed),
      updateTodo: mockUpdateTodo,
      deleteTodo: mockDeleteTodo,
      setTodos: mockSetTodos,
    });

    render(<TodoList />);

    expect(screen.getByText("No incomplete tasks.")).toBeInTheDocument();
  });

  it("renders 'No completed tasks' when there are no completed tasks", () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todos: mockTodos.filter((todo) => !todo.completed),
      updateTodo: mockUpdateTodo,
      deleteTodo: mockDeleteTodo,
      setTodos: mockSetTodos,
    });

    render(<TodoList />);

    expect(screen.getByText("No completed tasks.")).toBeInTheDocument();
  });

  it("calls updateTodo when TodoItem calls onUpdate", () => {
    render(<TodoList />);
    const todoItem = screen.getAllByRole("listitem")[0];
    const updateTodoFunction = todoItem.querySelector('input[type="checkbox"]');
    if (updateTodoFunction) {
      fireEvent.click(updateTodoFunction);
    }
    expect(mockUpdateTodo).toHaveBeenCalled();
  });

  it("calls deleteTodo when TodoItem calls onDelete", () => {
    render(<TodoList />);
    const todoItem = screen.getAllByRole("listitem")[0];
    const deleteTodoButton = todoItem.querySelector(
      'button[aria-label="delete"]',
    );
    if (deleteTodoButton) {
      fireEvent.click(deleteTodoButton);
    }
    expect(mockDeleteTodo).toHaveBeenCalled();
  });
});
