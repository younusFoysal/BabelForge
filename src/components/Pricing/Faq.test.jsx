import { render, screen, fireEvent } from "@testing-library/react";
import Faq from "@/components/Pricing/Faq"; 
import AOS from "aos";
// jest.setup.js
import '@testing-library/jest-dom';


// Mock AOS
jest.mock("aos", () => ({
  init: jest.fn(),
}));

describe("Faq component", () => {
  beforeEach(() => {
    render(<Faq />);
  });

  test("renders FAQ heading", () => {
    const heading = screen.getByRole("heading", {
      name: /frequently asked questions/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test("initializes AOS on component mount", () => {
    expect(AOS.init).toHaveBeenCalledWith({
      duration: 1000,
    });
  });

  test("toggles FAQ items correctly", () => {
    // Query the summary elements by their text
    const firstQuestion = screen.getByText(/which pricing plan is right for me/i);
  
    // Expect the details to be initially closed
    expect(firstQuestion.closest('details')).not.toHaveAttribute('open');
  
    // Click on the first summary to open it
    fireEvent.click(firstQuestion);
    expect(firstQuestion.closest('details')).toHaveAttribute('open');
  
    // Click again to close
    fireEvent.click(firstQuestion);
    expect(firstQuestion.closest('details')).not.toHaveAttribute('open');
  });
  

  test("renders all FAQ questions", () => {
    const questions = [
      "Which pricing plan is right for me?",
      "How does our pricing work?",
      "Do you offer any discounted plans?",
      "Can I change my plan?",
      "How secure is bableforge.com?",
      "How can I manage my billing?",
    ];

    questions.forEach((question) => {
      expect(screen.getByText(question)).toBeInTheDocument();
    });
  });
});
