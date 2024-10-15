import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosCommon from '@/lib/axiosCommon';
import DashboardNavbar from './DashboardsNavbar';

// Mocking required hooks and modules
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
    success: jest.fn(),
    error: jest.fn(),
}));

jest.mock('@/lib/axiosCommon', () => jest.fn());

const mockRouter = {
    push: jest.fn(),
};

const mockAxios = {
    get: jest.fn(),
    patch: jest.fn(),
};

describe('DashboardNavbar Component', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        useSession.mockReturnValue({
            data: {
                user: {
                    name: 'Test User',
                    email: 'test@example.com',
                },
            },
        });
        useRouter.mockReturnValue(mockRouter);
        useAxiosCommon.mockReturnValue(mockAxios);
        usePathname.mockImplementation(() => '/projects');
    });

    test('renders the navbar with links', () => {
        // Mock the session data
        // require('next-auth/react').useSession.mockReturnValue(mockSession);
        require('next/navigation').usePathname.mockReturnValue('/dashboard/projects'); // Mock pathname

        render(

            <DashboardNavbar />

        );

        // Check if the logo is in the document
        expect(screen.getByAltText(/babelforge/i)).toBeInTheDocument();

        // Check for the presence of navbar items
        const navItems = ['Project', 'Teams', 'Group Chat', 'Dashboard', 'Review'];
        navItems.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });

    });

    test('calls signOut function on logout button click', async () => {
        const { signOut } = require('next-auth/react');
        // require('next-auth/react').useSession.mockReturnValue(mockSession);
        require('next/navigation').usePathname.mockReturnValue('/dashboard/projects'); // Mock pathname

        render(
            <DashboardNavbar />

        );

    });

    test('renders avatar with correct image', () => {
        // require('next-auth/react').useSession.mockReturnValue(mockSession);
        require('next/navigation').usePathname.mockReturnValue('/dashboard/projects'); // Mock pathname

        render(

            <DashboardNavbar />

        );

    });

    test('renders default avatar when user image is not available', () => {
        const mockSessionWithoutImage = {
            data: {
                user: {
                    image: null,
                    name: 'Test User',
                },
            },
        };

        require('next-auth/react').useSession.mockReturnValue(mockSessionWithoutImage);
        // require('next/navigation').usePathname.mockReturnValue('/dashboard/projects'); // Mock pathname

        render(


            <DashboardNavbar />


        );
    });
});
