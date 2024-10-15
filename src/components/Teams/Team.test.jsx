import React from 'react';
import { render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import Team from './Team';

// Mock the components
jest.mock('./MemberBox', () => () => <div>Mocked MemberBox</div>);
jest.mock('./TeamDialog', () => () => <div>TeamDialog</div>);
jest.mock('./LinkDialog', () => () => <div>LinkDialog</div>);
jest.mock('./LinkBox', () => () => <div>Mocked LinkBox</div>);
jest.mock('@/components/shared/LoadingSpinner/LoadingSpinner', () => () => <div>Loading...</div>);

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}));

describe('Team Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading spinner when loading', () => {
        useQuery.mockReturnValue({
            isLoading: true,
            isError: false,
            data: null,
        });

        render(<Team id="team123" />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders error message when there is an error', () => {
        useQuery.mockReturnValue({
            isLoading: false,
            isError: true,
            data: null,
        });

        render(<Team id="team123" />);

        expect(screen.getByText('Failed to load team data.')).toBeInTheDocument();
    });

    test('renders members and links correctly', () => {
        useQuery.mockReturnValue({
            isLoading: false,
            isError: false,
            data: {
                members: [{ name: 'Member 1' }, { name: 'Member 2' }],
                _id: 'team123',
                tname: 'Team A',
                tdes: 'Team A Description',
                links: [{ url: 'https://example.com' }],
            },
        });

        render(<Team id="team123" />);

        // Check that multiple member boxes are rendered (use getAllByText)
        const memberBoxes = screen.getAllByText('Mocked MemberBox');
        expect(memberBoxes).toHaveLength(2);

        // Check if team dialog is rendered
        expect(screen.getByText('TeamDialog')).toBeInTheDocument();

        // Check if link dialog is rendered
        expect(screen.getByText('LinkDialog')).toBeInTheDocument();

        // Check if link box is rendered
        expect(screen.getByText('Mocked LinkBox')).toBeInTheDocument();

        // Check if team name and description are rendered
        expect(screen.getByText('Team A')).toBeInTheDocument();
        expect(screen.getByText('Team A Description')).toBeInTheDocument();
    });
});
