import { render, screen } from '@testing-library/react';
import Profile from './Profile';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import '@testing-library/jest-dom';

// Mock the useSession and useQuery hooks
jest.mock('next-auth/react');
jest.mock('@tanstack/react-query');

const mockSession = {
    user: {
        email: 'test@example.com',
    },
};

const mockUserData = {
    name: 'John Doe',
    username: 'johndoe',
    department: 'Engineering',
    organization: 'Tech Corp',
    location: 'New York',
    email: 'test@example.com',
};

describe('Profile Component', () => {
    beforeEach(() => {
        // Mock useSession to return a valid session
        useSession.mockReturnValue({
            data: mockSession,
        });

        // Mock useQuery to return user data
        useQuery.mockReturnValue({
            data: mockUserData,
            isLoading: false,
            refetch: jest.fn(),
        });
    });

    test('renders Profile component without crashing', () => {
        render(<Profile />);
        expect(screen.getByText(/Name: John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/Username: johndoe/i)).toBeInTheDocument();
    });

    test('displays user details correctly', () => {
        render(<Profile />);
        expect(screen.getByText(/Engineering/i)).toBeInTheDocument();
        expect(screen.getByText(/Tech Corp/i)).toBeInTheDocument();
        expect(screen.getByText(/New York/i)).toBeInTheDocument();
    });

    test('displays loading spinner when loading', () => {
        useQuery.mockReturnValueOnce({
            data: [],
            isLoading: true,
            refetch: jest.fn(),
        });
        render(<Profile />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });
});
