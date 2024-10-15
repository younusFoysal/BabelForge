import { render, screen, fireEvent } from "@testing-library/react";
import HeroDown from "./HeroDown";
import "@testing-library/jest-dom";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
// Mock Next.js router and path
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock the useSession hook from next-auth
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("HeroDown Component", () => {
  const mockMutate = jest.fn();

  it("renders without crashing", () => {
    render(<HeroDown />);
    expect(screen.getByText(/what you like to manage/i)).toBeInTheDocument();
  });

  it('renders the "get started" button', () => {
    render(<HeroDown />);
    const button = screen.getByRole("button", { name: /get started/i });
    expect(button).toBeInTheDocument();
  });
});
