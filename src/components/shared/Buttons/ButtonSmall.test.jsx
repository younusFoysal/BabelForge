// ButtonSmall.test.jsx
import { render, screen } from "@testing-library/react";
import ButtonSmall from "./ButtonSmall"; // Adjust the import path as necessary

describe("ButtonSmall", () => {
  it("renders the button with correct text", () => {
    render(<ButtonSmall color="blue" text="Click Me" />);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");
  });

  it("applies the correct background color", () => {
    const { container } = render(<ButtonSmall color="green" text="Press Me" />);
    const button = container.querySelector("button");
    expect(button).toHaveClass("bg-green"); // Ensure the background color class is applied
  });
});
