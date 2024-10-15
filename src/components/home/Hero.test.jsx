// Hero.test.jsx
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";
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

describe("Hero Component", () => {
  const mockMutate = jest.fn();

  it("renders the heading correctly", () => {
    render(<Hero />);
    const headingElement = screen.getByRole("heading", {
      name: /made for work, designed to love/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("renders the description paragraph correctly", () => {
    render(<Hero />);
    const descriptionElement = screen.getByText(
      /the platform that gives you the flexibility to run any aspect of by work/i
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the text about the free plan", () => {
    render(<Hero />);
    const freePlanText = screen.getByText(
      /no credit card needed ✦ unlimited time on free plan/i
    );
    expect(freePlanText).toBeInTheDocument();
  });
});
