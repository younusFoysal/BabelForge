import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutCultureCard from '@/components/AboutUs/AboutCultureCard'; 



jest.mock('next/image', () => {
    return function Image({ src, alt }) {
        return <img src={src} alt={alt} />;
    };
});



describe('AboutCultureCard Component', () => {
    const mockProps = {
        image: '/test-image.jpg',
        headline: 'Our Culture',
        hoverText: 'We value diversity and collaboration.',
    };



    test('displays the image correctly', () => {
        render(<AboutCultureCard {...mockProps} />);
        const imageElement = screen.getByAltText(/culture and values icon/i);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', mockProps.image); 
    });



    test('displays the headline correctly', () => {
        render(<AboutCultureCard {...mockProps} />);
        const headlineElement = screen.getByText(mockProps.headline);
        expect(headlineElement).toBeInTheDocument();
    });



    test('displays the hover text correctly', () => {
        render(<AboutCultureCard {...mockProps} />);
        const hoverTextElement = screen.getByText(mockProps.hoverText);
        expect(hoverTextElement).toBeInTheDocument();
    });


});
