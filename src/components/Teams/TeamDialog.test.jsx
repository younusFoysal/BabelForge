import { render, screen, fireEvent } from "@testing-library/react";
import TeamDialog from "./TeamDialog"; // Adjust the path to your TeamDialog component

describe("TeamDialog component", () => {
  it("renders the TeamDialog component and opens the dialog on click", () => {
    render(<TeamDialog id="12345" refetch={jest.fn()} />);

    // Check if the dialog trigger button is rendered
    const trigger = screen.getByText(/add member/i);
    expect(trigger).toBeInTheDocument();

    // Click on the trigger to open the dialog
    fireEvent.click(trigger);

    // Check that the dialog content is rendered
    expect(screen.getByText(/add to team member/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /grow your team and work better together\. adding people to this team gives them access to all the team’s work\./i
      )
    ).toBeInTheDocument();

    // Check for the input field and button inside the dialog
    expect(screen.getByPlaceholderText(/add member/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });
});
