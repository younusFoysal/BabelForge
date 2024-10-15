
import { render, screen } from "@testing-library/react";
import PricingSingleCard from "@/components/Pricing/PricingSingleCard";
import '@testing-library/jest-dom';


// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("PricingSingleCard component", () => {
  const pricingData = {
    title: "Pro Plan",
    price: 49,
    priceDetails: "per month",
    buttonText: "Get Started",
    featuresTitle: "All features included",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    _id: "123",
  };

  

  test("renders pricing details correctly", () => {
    render(<PricingSingleCard pricing={pricingData} />);

    // Check if title and price are rendered
    expect(screen.getByText(pricingData.title)).toBeInTheDocument();
    expect(screen.getByText(`$${pricingData.price}`)).toBeInTheDocument();
    expect(screen.getByText(pricingData.priceDetails)).toBeInTheDocument();
  });
  

  test("renders features list correctly", () => {
    render(<PricingSingleCard pricing={pricingData} />);

    // Check if all features are rendered
    pricingData.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });


  test("renders button with correct text", () => {
    render(<PricingSingleCard pricing={pricingData} />);

    // Check if the button is rendered with the correct text
    const button = screen.getByRole("button", { name: /get started/i });
    expect(button).toBeInTheDocument();
  });


  test("navigates to correct checkout link", () => {
    render(<PricingSingleCard pricing={pricingData} />);

    // Check if the Link has the correct href
    const link = screen.getByRole("link", { name: /get started/i });
    expect(link).toHaveAttribute("href", `/checkout/${pricingData._id}`);
  });
});
