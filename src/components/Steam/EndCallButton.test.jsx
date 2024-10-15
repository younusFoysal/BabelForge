import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EndCallButton from "./EndCallButton";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the Stream SDK hooks
jest.mock("@stream-io/video-react-sdk", () => ({
  useCall: jest.fn(),
  useCallStateHooks: jest.fn(() => ({
    useLocalParticipant: jest.fn(),
  })),
}));

describe("EndCallButton", () => {
  let mockRouterPush;
  let mockEndCall;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    useRouter.mockReturnValue({ push: mockRouterPush });

    // Mock endCall to resolve asynchronously
    mockEndCall = jest.fn().mockResolvedValue();
    useCall.mockReturnValue({
      endCall: mockEndCall,
      state: {
        createdBy: { id: "owner-id" },
      },
    });

    useCallStateHooks.mockReturnValue({
      useLocalParticipant: jest.fn(() => ({
        userId: "owner-id",
      })),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the End call button for meeting owner", () => {
    render(<EndCallButton />);
    const endCallButton = screen.getByText("End call for everyone");
    expect(endCallButton).toBeInTheDocument();
  });

  test("does not render the End call button if not the meeting owner", () => {
    useCallStateHooks.mockReturnValueOnce({
      useLocalParticipant: jest.fn(() => ({
        userId: "non-owner-id",
      })),
    });

    render(<EndCallButton />);
    const endCallButton = screen.queryByText("End call for everyone");
    expect(endCallButton).not.toBeInTheDocument();
  });

  test("calls endCall and redirects when button is clicked", async () => {
    render(<EndCallButton />);
    const endCallButton = screen.getByText("End call for everyone");

    // Simulate clicking the button
    fireEvent.click(endCallButton);

    // Wait for async endCall to be resolved and then check the expectations
    await waitFor(() => {
      expect(mockEndCall).toHaveBeenCalledTimes(1);
      expect(mockRouterPush).toHaveBeenCalledWith("/");
    });
  });
});
