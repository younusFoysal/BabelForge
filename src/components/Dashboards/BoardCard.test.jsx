// BoardCard.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import BoardCard from './BoardCard';

describe('BoardCard Component', () => {
    test('renders BoardCard with title and content', () => {
        render(<BoardCard title="Test Board Title" />);

        // Check if the title is rendered
        expect(screen.getByText(/test board title/i)).toBeInTheDocument();

        // Check if card content is rendered
        const cardContents = screen.getAllByText(/card content/i);
        expect(cardContents).toHaveLength(2); // Expecting two card content paragraphs
        expect(cardContents[0]).toBeInTheDocument();
        expect(cardContents[1]).toBeInTheDocument();
    });

    test('renders without crashing', () => {
        const { container } = render(<BoardCard title="Another Title" />);
        expect(container).toBeInTheDocument();
    });
});
