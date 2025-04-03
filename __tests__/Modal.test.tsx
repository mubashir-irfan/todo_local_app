import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@/shared/components/Modal";
import "@testing-library/jest-dom";

describe("Modal Component", () => {
  it("renders correctly when open", () => {
    render(
      <Modal open={true} onClose={jest.fn()} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Modal open={false} onClose={jest.fn()} title="Hidden Modal">
        <p>Hidden Content</p>
      </Modal>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden Content")).not.toBeInTheDocument();
  });

  it("displays the correct title", () => {
    render(
      <Modal open={true} onClose={jest.fn()} title="Custom Title">
        <p>Some Content</p>
      </Modal>
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders children inside the modal", () => {
    render(
      <Modal open={true} onClose={jest.fn()} title="With Children">
        <p>Test Child Element</p>
      </Modal>
    );

    expect(screen.getByText("Test Child Element")).toBeInTheDocument();
  });
});
