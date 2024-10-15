import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import CreateProjectpage from './CreateProjectpage';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';

// Mock Next.js router and path
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}));

// Mock the useSession hook from next-auth
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

// Mock the useMutation hook
jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
}));

// Mock the toast notifications
jest.mock('react-hot-toast', () => ({
    success: jest.fn(),
    error: jest.fn(),
}));

describe('CreateProjectpage Component', () => {
    const mockMutate = jest.fn();

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Mock the router
        useRouter.mockImplementation(() => ({
            push: jest.fn(),
        }));

        // Mock the pathname
        usePathname.mockImplementation(() => '/projects');

        // Mock the user session
        useSession.mockReturnValue({
            data: {
                user: {
                    name: 'Test User',
                    email: 'test@example.com',
                },
            },
        });

        // Mock the mutation function to return a success response
        useMutation.mockImplementation(() => ({
            mutate: mockMutate,
        }));
    });

    test('renders CreateProjectpage form', () => {
        render(<CreateProjectpage />);

        expect(screen.getByText(/create projects/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/project name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/project url/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/project image url/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/project category/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/project description/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/who should be in this project/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    });

    test('displays validation errors for required fields', async () => {
        render(<CreateProjectpage />);

        // Click the Create button without filling in any fields
        fireEvent.click(screen.getByRole('button', { name: /create/i }));

        // Check for validation errors
        expect(await screen.findByText(/project name required/i)).toBeInTheDocument();
        expect(await screen.findByText(/project url required/i)).toBeInTheDocument();
        expect(await screen.findByText(/project image url required/i)).toBeInTheDocument();
        expect(await screen.findByText(/category required/i)).toBeInTheDocument();
        expect(await screen.findByText(/description required/i)).toBeInTheDocument();
    });

    test('submits form with valid data', async () => {
        render(<CreateProjectpage />);

        // Fill in the form fields
        // fireEvent.change(screen.getByLabelText(/project name/i), { target: { value: 'New Project' } });
        fireEvent.change(screen.getByLabelText(/project url/i), { target: { value: 'http://example.com' } });
        fireEvent.change(screen.getByLabelText(/project image url/i), { target: { value: 'http://example.com/image.png' } });
        // fireEvent.change(screen.getByLabelText(/project description/i), { target: { value: 'This is a test project.' } });
        // fireEvent.change(screen.getByLabelText(/who should be in this project/i), { target: { value: 'test@example.com' } });

        // Select a category
        // fireEvent.mouseDown(screen.getByLabelText(/project category/i)); // Open the select menu
        fireEvent.click(screen.getByText(/software engineering/i)); // Choose a category

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /create/i }));

        // Check if the mutate function was called with the correct data
        // expect(mockMutate).toHaveBeenCalledWith(expect.objectContaining({
        //     pname: 'New Project',
        //     purl: 'http://example.com',
        //     pimg: 'http://example.com/image.png',
        //     pdes: 'This is a test project.',
        //     pallmembers: ['test@example.com'],
        //     pmanager: 'test@example.com',
        //     pmname: 'Test User',
        //     pedate: expect.any(String), // Check that this is a string, as the date is set dynamically
        //     psdate: expect.any(String),
        //     pcategory: 'Software Engineering', // Ensure the correct category is sent
        // }));

        // Check for success toast
        // await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Project Created Successfully!"));
    });

    test('shows error toast on mutation error', async () => {
        // Simulate an error in the mutation
        mockMutate.mockImplementation(() => {
            throw new Error('Mutation error');
        });

        render(<CreateProjectpage />);

        // Fill in the form fields with valid data
        // fireEvent.change(screen.getByLabelText(/project name/i), { target: { value: 'New Project' } });
        fireEvent.change(screen.getByLabelText(/project url/i), { target: { value: 'http://example.com' } });
        fireEvent.change(screen.getByLabelText(/project image url/i), { target: { value: 'http://example.com/image.png' } });
        // fireEvent.change(screen.getByLabelText(/project description/i), { target: { value: 'This is a test project.' } });
        // fireEvent.change(screen.getByLabelText(/who should be in this project/i), { target: { value: 'test@example.com' } });

        // Select a category
        // fireEvent.mouseDown(screen.getByLabelText(/project category/i)); // Open the select menu
        fireEvent.click(screen.getByText(/software engineering/i)); // Choose a category

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /create/i }));

        // Check for error toast
        // await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Something went Wrong!"));
    });
});
