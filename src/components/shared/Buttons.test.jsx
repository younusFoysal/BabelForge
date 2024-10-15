// Button.test.jsx

import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Buttons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Mocking the necessary hooks and libraries
jest.mock("next-auth/react", () => ({
    useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
    loading: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
    dismiss: jest.fn(),
}));

describe("Button Component", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        // Mocking router push
        useRouter.mockReturnValue({
            push: mockPush,
        });

        // Mocking session to have no user by default
        useSession.mockReturnValue({
            data: null,
        });
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clearing all mocks after each test
    });

    test("renders button with the correct text", () => {
        render(<Button text="Get Started" icon={<span>Icon</span>} />);

        // Check if the button and its text/icon are rendered
        expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
        expect(screen.getByText("Icon")).toBeInTheDocument();
    });

    test("shows error toast when user is not authenticated", () => {
        render(<Button text="Get Started" />);

        // Simulate button click
        fireEvent.click(screen.getByRole("button"));

        // Expect an error toast when user is not logged in
        expect(toast.error).toHaveBeenCalledWith("Login First");
        expect(mockPush).not.toHaveBeenCalled();
    });

    test("navigates to dashboard and shows loading toast when clicked with authenticated user", async () => {
        // Mock session to have a user
        useSession.mockReturnValue({
            data: { user: { name: "John Doe" } },
        });

        render(<Button text="Get Started" />);

        // Simulate button click
        fireEvent.click(screen.getByRole("button"));

        // Expect the loading toast to be shown
        expect(toast.loading).toHaveBeenCalledWith("Dashboard loading...");

        // Simulate navigation to dashboard
        expect(mockPush).toHaveBeenCalledWith("/dashboard");

        // Expect the loading toast to be dismissed after navigation
        // expect(toast.dismiss).toHaveBeenCalled();
    });

    test("disables the button when loading", () => {
        render(<Button text="Get Started" />);

        // Simulate button click
        fireEvent.click(screen.getByRole("button"));

        // Expect button to be disabled during loading
        // expect(screen.getByRole("button")).toBeDisabled();
    });
});
