// team.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Team from "./Team";
import useAxiosCommon from "@/lib/axiosCommon";
import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";

// Mock dependencies
jest.mock("@/lib/axiosCommon");
jest.mock("@/components/shared/LoadingSpinner/LoadingSpinner", () => () => (
  <div>Loading...</div>
));

const queryClient = new QueryClient();

describe("Team Component", () => {
  const mockTeamData = {
    tname: "Development Team",
    tdes: "This is a description of the team.",
    members: [
      { id: "1", name: "John Doe" },
      { id: "2", name: "Jane Smith" },
    ],
    links: [{ id: "1", url: "https://example.com" }],
    _id: "team123",
  };

  beforeEach(() => {
    // Reset mock implementations before each test
    jest.clearAllMocks();
  });

  it("should render loading state initially", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Team id="team123" />
      </QueryClientProvider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render team info when data is loaded", async () => {
    useAxiosCommon.mockResolvedValueOnce({ data: mockTeamData }); // Mock success response

    render(
      <QueryClientProvider client={queryClient}>
        <Team id="team123" />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Development Team")).toBeInTheDocument();
      expect(
        screen.getByText("This is a description of the team.")
      ).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  it("should display the number of members", async () => {
    useAxiosCommon.mockResolvedValueOnce({ data: mockTeamData }); // Mock success response

    render(
      <QueryClientProvider client={queryClient}>
        <Team id="team123" />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("2 members")).toBeInTheDocument();
    });
  });

  it("should render error message when there is an error", async () => {
    useAxiosCommon.mockRejectedValueOnce(new Error("Failed to fetch data")); // Mock error response

    render(
      <QueryClientProvider client={queryClient}>
        <Team id="team123" />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Error loading team data.")).toBeInTheDocument(); // Expect error message
    });
  });
});
