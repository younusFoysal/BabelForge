import { render, screen, fireEvent } from "@testing-library/react";
import ProjectPage from "./ProjectPage"; // Update the path to your ProjectPage component
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mocking next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("ProjectPage Create Project Button", () => {
  const queryClient = new QueryClient();

  it("should render the Create Project button and navigate to the create project page on click", () => {
    // Mock the router
    const push = jest.fn();
    useRouter.mockReturnValue({ push });

    // Render the component inside the session provider and QueryClientProvider
    render(
      <SessionProvider session={null}>
        <QueryClientProvider client={queryClient}>
          <ProjectPage />
        </QueryClientProvider>
      </SessionProvider>
    );

    // Find the Create Project button
    const createProjectButton = screen.getByRole("button", { name: /Create Project/i });

    // Assert that the button is in the document
    expect(createProjectButton).toBeInTheDocument();

    // Simulate a click event on the button using fireEvent
    fireEvent.click(createProjectButton);

    // Assert that the router's push method was called with the correct route
  });
});
