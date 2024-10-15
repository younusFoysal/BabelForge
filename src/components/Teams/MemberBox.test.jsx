import { render, screen, waitFor, fireEvent } from "@testing-library/react";

import MemberBox from "./MemberBox";
import toast from "react-hot-toast";
import useAxiosCommon from "@/lib/axiosCommon";

// Mock the dependencies
jest.mock("react-hot-toast");
jest.mock("@/lib/axiosCommon");

describe("MemberBox component", () => {
  const mockRefetch = jest.fn();
  const member = "John Doe";
  const id = "12345";

  beforeEach(() => {
    useAxiosCommon.mockReturnValue({
      patch: jest.fn().mockResolvedValue({ data: { modifiedCount: 1 } }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the MemberBox component correctly", () => {
    render(<MemberBox member={member} refetch={mockRefetch} id={id} />);

    // Check if the member name is rendered
    const memberName = screen.getByText(member);
    expect(memberName).toBeInTheDocument();
  });

  it("opens the dropdown menu when the trigger button is clicked", async () => {
    render(<MemberBox member={member} refetch={mockRefetch} id={id} />);

    // Open the dropdown menu by clicking the trigger button
    const triggerButton = screen.getByRole("button");

    fireEvent.click(triggerButton);
  });

  //   it("handles member removal successfully", async () => {
  //     render(<MemberBox member={member} refetch={mockRefetch} id={id} />);

  //     // Open the dropdown menu by clicking the trigger button
  //     const triggerButton = screen.getByRole("button", {
  //       name: /hello/i,
  //     });

  //     expect(triggerButton).toBeInTheDocument();
  //     fireEvent.click(triggerButton);

  //     // Wait for the dropdown content to be visible

  //     expect(screen.getByText(/leave team/i)).toBeInTheDocument();

  //     // Click on the 'leave team' button to remove the member
  //     const leaveTeamButton = screen.getByText(/leave team/i);

  //     expect(leaveTeamButton).toBeInTheDocument();
  //     fireEvent.click(leaveTeamButton);

  //     // Wait for the async operation to complete
  //     await waitFor(() => {
  //       expect(useAxiosCommon().patch).toHaveBeenCalledWith(`team/teams/${id}`, {
  //         removeMember: member,
  //       });
  //       expect(mockRefetch).toHaveBeenCalled();
  //       expect(toast.success).toHaveBeenCalledWith("deleted member successfully");
  //     });
  //   });
});
