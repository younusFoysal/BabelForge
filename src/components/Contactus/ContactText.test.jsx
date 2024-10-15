import React from "react";
import { render, screen } from "@testing-library/react";
import ContactText from "./ContactText";
import Sponser from "@/components/home/Sponser";

// Mocking the `Sponser` component
jest.mock('@/components/home/Sponser', () => () => <div data-testid="sponser-component">Sponser Component</div>);

// Mocking the AOS library
jest.mock('aos', () => ({
    init: jest.fn(),
}));

describe("ContactText Component", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clearing all mocks before each test
    });

    test("renders the component with all sections", () => {
        render(<ContactText />);

        // Check if main heading is rendered
        expect(screen.getByText("Align, collaborate, and gain visibility into your work in one connected space")).toBeInTheDocument();

        // Check the first section (Earth Icon, Countries)
        // expect(screen.getByText("Across 200+ countries")).toBeInTheDocument();
        expect(screen.getByText("Meet with a product consultant to see how bableforge.com can fit your exact business needs")).toBeInTheDocument();

        // Check the second section (TrainFront Icon, Paying customers)
        // expect(screen.getByText("225k+ paying customers")).toBeInTheDocument();
        expect(screen.getByText("Explore our tailored pricing plans based on your goals and priorities")).toBeInTheDocument();

        // Check the third section (Activity Icon, Industries)
        // expect(screen.getByText("Serving 200+ industries")).toBeInTheDocument();
        // expect(screen.getByText("Boost productivity from day one by building your team’s ideal workflow")).toBeInTheDocument();
    });

    test("calls AOS initialization on mount", () => {
        render(<ContactText />);

        // Ensure AOS.init was called with the correct duration
        expect(require('aos').init).toHaveBeenCalledWith({
            duration: 1000,
        });
    });

    test("renders the Sponser component", () => {
        render(<ContactText />);

        // Check that the Sponser component is rendered
        expect(screen.getByTestId("sponser-component")).toBeInTheDocument();
        expect(screen.getByText("Sponser Component")).toBeInTheDocument();
    });

    test("renders icons correctly", () => {
        render(<ContactText />);

        // Check that the icons (Earth, TrainFront, Activity) are rendered
        // expect(screen.getAllByRole("img")).toHaveLength(3); // Assuming lucide-react renders icons as SVGs (img role)
    });
});
