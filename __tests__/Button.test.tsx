import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/shared/components/Button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("renders with the correct label", () => {
    render(<Button label="Click Me" />);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("applies the default variant when not specified", () => {
    render(<Button label="Default Variant" />);
    const button = screen.getByRole("button", { name: /default variant/i });
    expect(button).toHaveClass("MuiButton-contained"); // MUI adds this class for contained buttons
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Button label="Outlined" variant="outlined" />);
    expect(screen.getByRole("button", { name: /outlined/i })).toHaveClass("MuiButton-outlined");

    rerender(<Button label="Text" variant="text" />);
    expect(screen.getByRole("button", { name: /text/i })).toHaveClass("MuiButton-text");
  });

  it("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("passes additional props correctly", () => {
    render(<Button label="Disabled" disabled />);
    const button = screen.getByRole("button", { name: /disabled/i });

    expect(button).toBeDisabled();
  });
});
