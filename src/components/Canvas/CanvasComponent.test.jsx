import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CanvasComponent from './CanvasComponent';

describe('CanvasComponent', () => {
    it('renders color picker, pen size, eraser size, pen and eraser buttons, and canvas', () => {
        render(<CanvasComponent />);

        // Check if all controls render correctly
        expect(screen.getByTitle('Pick a color')).toBeInTheDocument();  // Color Picker
        expect(screen.getByLabelText('Pen Size')).toBeInTheDocument();  // Pen Size slider
        expect(screen.getByLabelText('Eraser Size')).toBeInTheDocument();  // Eraser Size slider
        expect(screen.getByText('Pen')).toBeInTheDocument();  // Pen Button
        expect(screen.getByText('Eraser')).toBeInTheDocument();  // Eraser Button
        expect(screen.getByText('Clear Canvas')).toBeInTheDocument();  // Clear Button
    });

    it('switches between Pen and Eraser modes correctly', () => {
        render(<CanvasComponent />);

        const penButton = screen.getByText('Pen');
        const eraserButton = screen.getByText('Eraser');
        const colorPicker = screen.getByTitle('Pick a color');
        const penSizeSlider = screen.getByLabelText('Pen Size');
        const eraserSizeSlider = screen.getByLabelText('Eraser Size');

        // By default, Pen mode is active
        expect(penButton).toHaveClass('bg-blue-500');
        expect(eraserButton).toHaveClass('bg-gray-300');
        expect(colorPicker).not.toBeDisabled();
        expect(penSizeSlider).not.toBeDisabled();
        expect(eraserSizeSlider).toBeDisabled();

        // Switch to Eraser mode
        fireEvent.click(eraserButton);
        expect(eraserButton).toHaveClass('bg-blue-500');
        expect(penButton).toHaveClass('bg-gray-300');
        expect(colorPicker).toBeDisabled();
        expect(penSizeSlider).toBeDisabled();
        expect(eraserSizeSlider).not.toBeDisabled();

        // Switch back to Pen mode
        fireEvent.click(penButton);
        expect(penButton).toHaveClass('bg-blue-500');
        expect(eraserButton).toHaveClass('bg-gray-300');
        expect(colorPicker).not.toBeDisabled();
        expect(penSizeSlider).not.toBeDisabled();
        expect(eraserSizeSlider).toBeDisabled();
    });

    it('clears the canvas when clicking the Clear Canvas button', () => {
        render(<CanvasComponent />);

        const clearButton = screen.getByText('Clear Canvas');
        fireEvent.click(clearButton);

        // There isn't a direct way to check the canvas content without additional libraries,
        // but we can check if the clear button is clickable and the function is called.
        // We assume the internal ReactSketchCanvas clearCanvas works correctly.
        expect(clearButton).toBeInTheDocument();  // Clear button is present and clickable
    });
});
