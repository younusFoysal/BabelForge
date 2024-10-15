
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import JoinTeamCTA from '@/components/AboutUs/JoinTeamCTA'; 

// Mock the Button component if needed
jest.mock('../shared/Buttons', () => {
    // eslint-disable-next-line react/display-name
    return ({ text, className, icon }) => (
        <button className={className}>{icon}{text}</button>
    );
});


// Mock the Next.js Image component
jest.mock('next/image', () => {
    // eslint-disable-next-line react/display-name, @next/next/no-img-element
    return ({ src, alt }) => <img src={src} alt={alt} />;
});


describe('JoinTeamCTA Component', () => {
    test('renders the title correctly', () => {
        render(<JoinTeamCTA />);
        
        const title = screen.getByText(/Together we can impact/i);
        expect(title).toBeInTheDocument();
    });


    test('renders the join button with correct text', () => {
        render(<JoinTeamCTA />);
        
        const button = screen.getByRole('button', { name: /Join our team!/i });
        expect(button).toBeInTheDocument();
    });
    

    test('renders the shape image', () => {
        render(<JoinTeamCTA />);
        
        const image = screen.getByAltText('shape image');
        expect(image).toBeInTheDocument();
    });
});
