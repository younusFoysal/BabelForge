import { render, screen } from "@testing-library/react";
import Sponser from "./Sponser";

// Mock Next.js Image component
jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ src, alt }) => <img src={src} alt={alt} />,
}));

// Mock the react-fast-marquee library
jest.mock("react-fast-marquee", () => ({ children }) => <div>{children}</div>);

describe("Sponser Component", () => {
    test("renders sponsor logos", () => {
        render(<Sponser />);

        // Check if the text is displayed
        expect(
            screen.getByText(
                /Trusted by 225,000\+ customers, from startups to enterprises/i
            )
        ).toBeInTheDocument();

        // Check if all the sponsor logos are displayed
        const images = [
            { alt: "Bd logo", src: "/_next/image?url=%2Fimage%2FHome%2Fsponser%2Fbd.png&w=3840&q=75" },
            { alt: "canva logo", src: "/_next/image?url=%2Fimage%2FHome%2Fsponser%2Fcanva.png&w=3840&q=75" },
            { alt: "carrefour logo", src: "/_next/image?url=%2Fimage%2FHome%2Fsponser%2Fcarrefour.png&w=3840&q=75" },
            { alt: "coca_cola logo", src: "/_next/image?url=%2Fimage%2FHome%2Fsponser%2Fcoca_cola.png&w=3840&q=75" },
            { alt: "netflix logo", src: "/_next/image?url=%2Fimage%2FHome%2Fsponser%2Fnetflix.png&w=3840&q=75" },
            { alt: "google logo", src: "/_next/image?url=%2Fimage%2FHome%2Fsponser%2Fgoogle.png&w=3840&q=75" },
            { alt: "microsoft logo", src: "/_next/image?url=%2Fimage%2FHome%2Fsponser%2Fmicrosoft.png&w=3840&q=75" },
            { alt: "oxy logo", src: "/_next/image?url=%2Fimage%2FHome%2Fsponser%2Foxy.png&w=3840&q=75" },
        ];

        images.forEach((image) => {
            const img = screen.getByAltText(image.alt);
        });
    });
});
