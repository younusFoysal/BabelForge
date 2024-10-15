
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommonText from '@/components/AboutUs/CommonText'; 

describe('CommonText Component', () => {

    test('renders without crashing', () => {
        render(<CommonText text="Hello" text2="World" />);
        const textElement = screen.getByText(/hello/i);
        const text2Element = screen.getByText(/world/i);
        expect(textElement).toBeInTheDocument();
        expect(text2Element).toBeInTheDocument();
    });


    test('applies fullWidth class when fullWidth is true', () => {
        render(<CommonText text="Hello" text2="World" fullWidth={true} />);
        const paragraphElement = screen.getByText(/hello/i).closest('p');
        expect(paragraphElement).toHaveClass('lg:w-full');
    });


    test('applies non-fullWidth class when fullWidth is false', () => {
        render(<CommonText text="Hello" text2="World" fullWidth={false} />);
        const paragraphElement = screen.getByText(/hello/i).closest('p');
        expect(paragraphElement).toHaveClass('lg:w-2/5');
    });


    test('displays the correct text', () => {
        const { container } = render(<CommonText text="Test" text2="Text" />);
        expect(container).toHaveTextContent('Test');
        expect(container).toHaveTextContent('Text');
    });

});
