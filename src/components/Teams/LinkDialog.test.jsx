import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LinkDialog from "./LinkDialog";
import toast from "react-hot-toast";
import useAxiosCommon from "@/lib/axiosCommon";

// Mock the dependencies
jest.mock("react-hot-toast");
jest.mock("@/lib/axiosCommon");

describe("LinkDialog component", () => {
  const mockRefetch = jest.fn();
  const id = "12345";

  beforeEach(() => {
    useAxiosCommon.mockReturnValue({
      patch: jest.fn().mockResolvedValue({ data: { modifiedCount: 1 } }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the LinkDialog component and opens the dialog on click", () => {
    render(<LinkDialog id={id} refetch={mockRefetch} index={0} />);

    // Check if the dialog trigger is rendered
    const trigger = screen.getByText(/links/i);
    expect(trigger).toBeInTheDocument();

    // Click on the trigger to open the dialog
    fireEvent.click(trigger);

    // Wait for the dialog content to be rendered
    const dialogTitle = screen.getByText(/add to link/i);
    expect(dialogTitle).toBeInTheDocument();
  });

  it("handles adding a link successfully", async () => {
    render(<LinkDialog id={id} refetch={mockRefetch} index={0} />);

    // Open the dialog by clicking the trigger button
    const trigger = screen.getByText(/links/i);
    fireEvent.click(trigger);

    // Wait for the dialog to be visible
    await waitFor(() => {
      expect(screen.getByText(/add to link/i)).toBeInTheDocument();
    });

    // Enter a link into the input field
    const inputField = screen.getByPlaceholderText(/add your link/i);
    fireEvent.change(inputField, { target: { value: "https://example.com" } });

    // Debug the DOM to check the current state of the button
    screen.debug();

    // Check if the button is present in the document and visible
    await waitFor(
      () => screen.getByRole("button", { name: /add/i, hidden: true }),
      { timeout: 3000 }
    );

    // Click the add button to submit the link
    fireEvent.click(addButton);

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(useAxiosCommon().patch).toHaveBeenCalledWith(`team/teams/${id}`, {
        addLink: "https://example.com",
      });
      expect(mockRefetch).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("link added successfully");
    });
  });
});
