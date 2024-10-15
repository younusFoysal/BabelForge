import { render, screen } from "@testing-library/react";
import LeaderCTA from "./LeaderCTA";

describe("LeaderCTA Component", () => {
  it("renders the component without errors", () => {
    render(<LeaderCTA />);
    // Check if the heading is rendered
    expect(
      screen.getByText(/A Leader for the third year in a row!/i)
    ).toBeInTheDocument();
  });

  it("displays the report information correctly", () => {
    render(<LeaderCTA />);
    // Check if the subtitle is displayed
    expect(
      screen.getByText(
        /babel.com recognized as a Leader in the 2024 Magic Quadrant/i
      )
    ).toBeInTheDocument();
  });

  it("displays the button with correct text", () => {
    render(<LeaderCTA />);
    // Check if the button with text "Get the report" is displayed
    const button = screen.getByRole("button", { name: /Get the report/i });
    expect(button).toBeInTheDocument();
  });
});
