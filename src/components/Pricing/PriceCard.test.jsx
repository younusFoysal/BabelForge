// PriceCard.test.jsx

import { render, screen } from "@testing-library/react";
import PriceCard from "./PriceCard";
import { useQuery } from "@tanstack/react-query";
import '@testing-library/jest-dom';


// Mock the `useQuery` hook from react-query
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));


describe("PriceCard component", () => {
  const mockPricingData = {
    data: [
      { _id: "1", title: "Basic", price: 0, features: ["Feature 1"] },
      { _id: "2", title: "Standard", price: 50, features: ["Feature 2"] },
      { _id: "3", title: "Premium", price: 150, features: ["Feature 3"] },
    ],
  };
  

  test("fetches and renders pricing data correctly", async () => {
    // Mock useQuery to return the mock pricing data
    useQuery.mockReturnValue({
      data: mockPricingData,
      isLoading: false,
      isError: false,
    });

    render(<PriceCard />);
    
    // Check if the pricing titles are rendered
    expect(screen.getByText("Basic")).toBeInTheDocument();
    expect(screen.getByText("Standard")).toBeInTheDocument();
    expect(screen.getByText("Premium")).toBeInTheDocument();
    
    // Ensure the correct number of titles are displayed
    expect(screen.getAllByText(/basic|standard|premium/i).length).toBe(3);
  });
});

