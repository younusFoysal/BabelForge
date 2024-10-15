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

  it("renders the LinkDialog component and opens the dialog on click", async () => {
    render(<LinkDialog id={id} refetch={mockRefetch} index={0} />);

    // Check if the dialog trigger is rendered
    const trigger = screen.getByText(/links/i);
    expect(trigger).toBeInTheDocument();

    // Click on the trigger to open the dialog
    await fireEvent.click(trigger);

    // Wait for the dialog content to be rendered
    const dialogTitle = screen.getByText(/add to link/i);
    expect(dialogTitle).toBeInTheDocument();
  });

  it("handles adding a link successfully", async () => {
    render(<LinkDialog id={id} refetch={mockRefetch} index={0} />);

    const trigger = screen.getByText(/links/i);
    await fireEvent.click(trigger);

    expect(screen.getByText(/add to link/i)).toBeInTheDocument();

    const inputField = screen.getByPlaceholderText(/add your link/i);
    fireEvent.change(inputField, { target: { value: "https://example.com" } });
  });
});
