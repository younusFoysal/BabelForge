import { render, screen, fireEvent } from "@testing-library/react";
import HeroBox from "./HeroBox";

describe("HeroBox", () => {
    const mockData = {
        icon: "🦸‍♂️", // An example icon
        title: "Hero",
        image: "hero.png",
    };
    const mockHandleChanged = jest.fn();

    it("renders correctly with the given props", () => {
        render(<HeroBox data={mockData} handleChanged={mockHandleChanged} />);

        // Check that the icon and title are rendered
        expect(screen.getByText("🦸‍♂️")).toBeInTheDocument();
        expect(screen.getByText("Hero")).toBeInTheDocument();

        // Check that the checkbox is unchecked initially
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
    });

    it("toggles the checkbox state on click", () => {
        render(<HeroBox data={mockData} handleChanged={mockHandleChanged} />);

        const checkbox = screen.getByRole("checkbox");
        const box = screen.getByText("🦸‍♂️").closest("div");

        // Initially unchecked
        expect(checkbox).not.toBeChecked();

        // Simulate click
        fireEvent.click(box);

        // Check that checkbox is checked
        expect(checkbox).toBeChecked();

        // Simulate click again
        fireEvent.click(box);

        // Check that checkbox is unchecked again
        expect(checkbox).not.toBeChecked();
    });

    it("calls handleChanged when clicked", () => {
        render(<HeroBox data={mockData} handleChanged={mockHandleChanged} />);

        const box = screen.getByText("🦸‍♂️").closest("div");

        // Simulate click
        fireEvent.click(box);

        // Check that handleChanged was called with the correct image
        expect(mockHandleChanged).toHaveBeenCalledWith("hero.png");
    });
});
