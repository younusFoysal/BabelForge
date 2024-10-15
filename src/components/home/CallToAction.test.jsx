import { render, screen } from "@testing-library/react";
import CallToAction from "./CallToAction";

// Mock Next.js Image component
jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

// Mock Button component
jest.mock("../shared/Buttons", () => ({
    __esModule: true,
    default: ({ text, icon }) => (
        <button>
            {text} {icon}
        </button>
    ),
}));

describe("CallToAction Component", () => {
    test("renders heading text correctly", () => {
        render(<CallToAction />);

        const headingText = screen.getByText(/Deliver your best work with/i);
        expect(headingText).toBeInTheDocument();
        expect(headingText).toHaveTextContent("Deliver your best work with babelforge.com");
    });

    test("renders Get Started button with icon", () => {
        render(<CallToAction />);

        const button = screen.getByRole("button", { name: /Get Started/i });
        expect(button).toBeInTheDocument();
    });

    test("renders call to action image", () => {
        render(<CallToAction />);

        const image = screen.getByAltText("Call to Action");
        expect(image).toBeInTheDocument();
    });
});
