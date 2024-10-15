
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutCulture from '@/components/AboutUs/AboutCulture';



jest.mock('@/components/AboutUs/AboutCultureCard', () => {
    return function MockAboutCultureCard({ image, headline, hoverText }) {
        return (
            <div>
                <img src={image} alt={headline} />
                <h4>{headline}</h4>
                <p>{hoverText}</p>
            </div>
        );
    };
});




describe('AboutCulture Component', () => {

    beforeEach(() => {
        render(<AboutCulture />);
    });



    test('renders the title', () => {
        const title = screen.getByText(/Our Culture and Values/i);
        expect(title).toBeInTheDocument();
    });



    test('renders the correct number of AboutCultureCard components', () => {
        const cards = screen.getAllByRole('heading', { level: 4 });
        expect(cards).toHaveLength(6); 
    });



    test('renders the AboutCultureCard with correct props', () => {
        const firstCardHeading = screen.getByText(/Transparency and trust/i);
        expect(firstCardHeading).toBeInTheDocument();
        
        const firstCardHoverText = screen.getByText(/Data is at the core of our identity/i);
        expect(firstCardHoverText).toBeInTheDocument();
    });

});
