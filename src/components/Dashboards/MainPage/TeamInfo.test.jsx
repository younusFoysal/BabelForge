import React from 'react';
import { render, screen } from '@testing-library/react';
import TeamInfo from './TeamInfo';

// Mocking the Avatar components used inside TeamInfo
jest.mock('@/components/ui/avatar', () => ({
    Avatar: ({ children }) => <div data-testid="avatar">{children}</div>,
    AvatarImage: ({ src, alt }) => <img src={src} alt={alt} />,
    AvatarFallback: ({ children }) => <div data-testid="avatar-fallback">{children}</div>,
}));

jest.mock('@/components/ui/card', () => ({
    Card: ({ children }) => <div>{children}</div>,
    CardContent: ({ children }) => <div>{children}</div>,
    CardHeader: ({ children }) => <div>{children}</div>,
    CardTitle: ({ children }) => <h1>{children}</h1>,
}));

describe('TeamInfo Component', () => {
    const mockStats = {
        newmamber: ['Alice', 'Bob', 'Charlie', 'David', 'Eva']
    };

    test('displays loading state when isLoading is true', () => {
        render(<TeamInfo isLoading={true} stats={mockStats} />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('displays the correct number of team members', () => {
        render(<TeamInfo isLoading={false} stats={mockStats} />);

        // Check that the "Team Members" title is rendered
        expect(screen.getByText('Team Members')).toBeInTheDocument();

        // Check if it renders the correct number of team members
        const teamMembers = screen.getAllByText(/Alice|Bob|Charlie|David|Eva/);
        expect(teamMembers).toHaveLength(5);
    });

    test('displays the team member names', () => {
        render(<TeamInfo isLoading={false} stats={mockStats} />);

        // Check that each name is rendered correctly
        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
        expect(screen.getByText('Charlie')).toBeInTheDocument();
        expect(screen.getByText('David')).toBeInTheDocument();
        expect(screen.getByText('Eva')).toBeInTheDocument();
    });

    test('displays avatar and fallback correctly', () => {
        render(<TeamInfo isLoading={false} stats={mockStats} />);

        // Check that avatars are rendered
        const avatars = screen.getAllByTestId('avatar');
        expect(avatars.length).toBe(5); // 5 avatars expected

        // Check that avatar fallback is rendered (OM fallback as in the code)
        const fallbacks = screen.getAllByTestId('avatar-fallback');
        expect(fallbacks[0]).toHaveTextContent('OM');
    });
});
