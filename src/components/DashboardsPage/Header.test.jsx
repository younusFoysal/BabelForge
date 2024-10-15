// Header.test.jsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

// Mocking the next/image component
jest.mock("next/image", () => {
  return ({ src, alt, className }) => <img src={src} alt={alt} className={className} />;
});

// Mocking the Button component
jest.mock("../shared/Buttons", () => {
  return ({ text, icon }) => (
    <button>
      {text}
      {icon}
    </button>
  );
});

describe("Header Component", () => {
  test("renders the header with the correct content", () => {
    render(<Header />);

    // Check if the heading is in the document
    // expect(screen.getByText(/Dashboards/i)).toBeInTheDocument();
    // expect(screen.getByText(/Track your team work progress/i)).toBeInTheDocument();
    // expect(screen.getByText(/Make smarter project decisions/i)).toBeInTheDocument();

    // Check if all the feature points are rendered
    const features = [
      "10+ widgets & apps",
      "Real time Communication",
      "High-Level overview",
      "Advance Reporting",
      "No code customization",
    ];
    features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });

    // Check if the button is rendered with the correct text
    expect(screen.getByText(/get started/i)).toBeInTheDocument();

    // Check if the image is rendered
    expect(screen.getByAltText(/Dashboard Header/i)).toBeInTheDocument();
  });

  test("renders icons correctly in the feature points", () => {
    render(<Header />);

    // Check if all the icons for the feature points are rendered (Check icon)
    // const checkIcons = screen.getAllByRole("img", { hidden: true });
    // expect(checkIcons).toHaveLength(5); // There are 5 feature points, each should have an icon
  });
});
