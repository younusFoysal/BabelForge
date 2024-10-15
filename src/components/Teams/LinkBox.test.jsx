import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LinkBox from "./LinkBox";
import toast from "react-hot-toast";
import useAxiosCommon from "@/lib/axiosCommon";

// Mock the dependencies
jest.mock("react-hot-toast");
jest.mock("@/lib/axiosCommon");

describe("LinkBox component", () => {
  const mockRefetch = jest.fn();
  const link = "https://example.com";
  const id = "12345";

  beforeEach(() => {
    useAxiosCommon.mockReturnValue({
      patch: jest.fn().mockResolvedValue({ data: { modifiedCount: 1 } }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the LinkBox component with the provided link", () => {
    render(<LinkBox id={id} refetch={mockRefetch} link={link} />);

    // Check if the link is rendered
    expect(screen.getByText(link)).toBeInTheDocument();
  });
});
