import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AllTeams from "./AllTeams";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

// Mock data for the test
const mockTeams = [
  {
    _id: "1",
    tname: "Development Team",
    tpic: "/path/to/image1.jpg",
    tcategory: "Software Engineering",
    tleader: "leader1@example.com",
    tmembers: [
      "member1@example.com",
      "member2@example.com",
      "member3@example.com",
      "member4@example.com",
    ],
  },
  {
    _id: "2",
    tname: "Marketing Team",
    tpic: "/path/to/image2.jpg",
    tcategory: "Marketing",
    tleader: "leader2@example.com",
    tmembers: ["member5@example.com", "member6@example.com"],
  },
];

// Mock the useUsers hook
jest.mock("@/hooks/useUsers", () => ({
  __esModule: true,
  default: jest.fn(() => [
    [
      {
        email: "leader1@example.com",
        name: "Leader One",
        image: "/path/to/leader1.jpg",
      },
      {
        email: "leader2@example.com",
        name: "Leader Two",
        image: "/path/to/leader2.jpg",
      },
      {
        email: "member1@example.com",
        name: "Member One",
        image: "/path/to/member1.jpg",
      },
      {
        email: "member2@example.com",
        name: "Member Two",
        image: "/path/to/member2.jpg",
      },
      {
        email: "member3@example.com",
        name: "Member Three",
        image: "/path/to/member3.jpg",
      },
      {
        email: "member4@example.com",
        name: "Member Four",
        image: "/path/to/member4.jpg",
      },
      {
        email: "member5@example.com",
        name: "Member Five",
        image: "/path/to/member5.jpg",
      },
      {
        email: "member6@example.com",
        name: "Member Six",
        image: "/path/to/member6.jpg",
      },
    ],
    false,
  ]),
}));

// Mock the next/navigation to handle navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("AllTeams Component", () => {
  beforeEach(() => {
    // Reset the mock before each test to ensure a clean state
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  test("renders AllTeams component correctly", () => {
    render(<AllTeams teams={mockTeams} isLoading={false} searchQuery="" />);

    expect(screen.getByText("Development Team")).toBeInTheDocument();
    expect(screen.getByText("Marketing Team")).toBeInTheDocument();
  });

  test("displays loading indicator when loading teams or users", () => {
    render(<AllTeams teams={[]} isLoading={true} searchQuery="" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("filters teams based on the search query", () => {
    render(
      <AllTeams teams={mockTeams} isLoading={false} searchQuery="Development" />
    );

    expect(screen.getByText("Development Team")).toBeInTheDocument();
    expect(screen.queryByText("Marketing Team")).not.toBeInTheDocument();
  });

  test("displays team member details in HoverCard when hovered", async () => {
    render(<AllTeams teams={mockTeams} isLoading={false} searchQuery="" />);

    // Use userEvent to simulate a hover over the member image
    const memberImage = screen.getAllByRole("img", { name: /member/i })[0];
    userEvent.hover(memberImage);

    // Wait for the HoverCard to display member details
    await waitFor(() => {
      expect(screen.getByText("Member One")).toBeInTheDocument();
    });
  });

  test("navigates to the team details page when a team card is clicked", () => {
    const { push } = useRouter();
    render(<AllTeams teams={mockTeams} isLoading={false} searchQuery="" />);

    fireEvent.click(screen.getByText("Development Team"));
    expect(push).toHaveBeenCalledWith("/dashboard/teams/1");
  });
});
