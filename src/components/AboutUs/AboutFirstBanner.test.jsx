import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutFirstBanner from '@/components/AboutUs/AboutFirstBanner'; 

// Mock next/image to avoid dealing with Next.js image optimization in tests
jest.mock('next/image', () => {
    return function Image({ src, alt }) {
        return <img src={src} alt={alt} />;
    };
});


// Mock the CommonText component
jest.mock('@/components/AboutUs/CommonText', () => {
    return function CommonText({ text }) {
        return <p>{text}</p>;
    };
});


describe('AboutFirstBanner Component', () => {
    test('renders the banner headline correctly', () => {
        render(<AboutFirstBanner />);
        const headline = screen.getByText(/So how did/i);
        expect(headline).toBeInTheDocument();

        const highlightedText = screen.getByText(/babelforge.com/i);
        expect(highlightedText).toBeInTheDocument();

        const restHeadline = screen.getByText(/come to be/i);
        expect(restHeadline).toBeInTheDocument();
    });



    test('renders the banner image correctly', () => {
        render(<AboutFirstBanner />);
        const bannerImage = screen.getByAltText(/banner image/i);
        expect(bannerImage).toBeInTheDocument();
    });



    test('renders the CommonText component with the correct text', () => {
        render(<AboutFirstBanner />);
        const commonText = screen.getByText(
            'Well for us, it happened somewhere in between collaborating and communicating, engaging, and scaling rapidly. All while being totally transparent and working the way we want.'
        );
        expect(commonText).toBeInTheDocument();
    });



    test('renders the large banner overlay text', () => {
        render(<AboutFirstBanner />);
        
        // Get all instances of the text elements
        const overlayText1 = screen.getByText(/It's all/i);
        const overlayText2 = screen.getByText(/about/i);
        const overlayText3 = screen.getAllByText(/the/i);  
        const overlayText4 = screen.getByText(/people/i);

        // Assert that the specific elements exist
        expect(overlayText1).toBeInTheDocument();
        expect(overlayText2).toBeInTheDocument();
        
        // Since "the" appears multiple times, select the first instance
        expect(overlayText3[0]).toBeInTheDocument();  
        
        expect(overlayText4).toBeInTheDocument();
    });
});


