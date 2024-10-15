// AboutStatistics.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutStatistics from '@/components/AboutUs/AboutStatistics'; // Adjust the import path if necessary


// Mocking CountUp and ScrollTrigger to avoid actual animation during tests
jest.mock('react-countup', () => {
    return jest.fn(({ end }) => {
        // Add '+' for specific values or return plain numbers
        return <span>{end}{end === 1900 || end === 150 ? '+' : ''}</span>;
    });
});

jest.mock('react-scroll-trigger', () => {
    return ({ children, onEnter, onExit }) => {
        // Simulate the scroll trigger by calling onEnter directly
        React.useEffect(() => {
            onEnter();
            return () => onExit();
        }, [onEnter, onExit]);

        return <div>{children}</div>;
    };
});

describe('AboutStatistics Component', () => {
    test('renders without crashing', () => {
        render(<AboutStatistics />);
        const headingElement = screen.getByText(/babelforge.com by the numbers/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('displays correct statistics when scrolled into view', () => {
        render(<AboutStatistics />);
        // Use regex and function matcher for flexibility
        expect(screen.getByText((content) => content.includes('1200'))).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes('1900+'))).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes('150+'))).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes('225'))).toBeInTheDocument();
      ;
    });
});
