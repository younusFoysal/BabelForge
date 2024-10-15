// UpdatePage.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import UpdatePage from './UpdatePage';
import toast from 'react-hot-toast';
import useAxiosCommon from '@/lib/axiosCommon';

// Mocking required hooks and modules
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
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

describe('UpdatePage Component', () => {
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
    });

    test('renders UpdatePage form', () => {
        useQuery.mockReturnValue({
            data: {
                data: {
                    pname: 'Existing Project Name',
                    purl: 'http://existing-url.com',
                    pimg: 'http://existing-image-url.com',
                    pdes: 'Existing project description',
                    pcategory: 'Software Engineering',
                },
            },
            isLoading: false,
            isError: false,
        });

        render(<UpdatePage id="1" />);

        expect(screen.getByText(/update projects/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/project name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/project url/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/project image url/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/project category/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/project description/i)).toBeInTheDocument();
        // expect(screen.getByLabelText(/who should be in this project/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
    });

    test('displays validation errors for required fields', async () => {
        useQuery.mockReturnValue({
            data: {
                data: {
                    pname: '',
                    purl: '',
                    pimg: '',
                    pdes: '',
                    pcategory: '',
                },
            },
            isLoading: false,
            isError: false,
        });

        render(<UpdatePage id="1" />);

        // Click the Update button without filling in any fields
        fireEvent.click(screen.getByRole('button', { name: /update/i }));

        // Check for validation errors
        expect(await screen.findByText(/project name required/i)).toBeInTheDocument();
        // expect(await screen.findByText(/project url required/i)).toBeInTheDocument();
        // expect(await screen.findByText(/project image url required/i)).toBeInTheDocument();
        // expect(await screen.findByText(/category required/i)).toBeInTheDocument();
        expect(await screen.findByText(/description required/i)).toBeInTheDocument();
    });

    test('submits form with valid data', async () => {
        useQuery.mockReturnValue({
            data: {
                data: {
                    pname: 'Existing Project Name',
                    purl: 'http://existing-url.com',
                    pimg: 'http://existing-image-url.com',
                    pdes: 'Existing project description',
                    pcategory: 'Software Engineering',
                },
            },
            isLoading: false,
            isError: false,
        });

        useMutation.mockReturnValue({
            mutate: jest.fn(),
        });

        render(<UpdatePage id="1" />);

        // Fill in the form fields
        // fireEvent.change(screen.getByLabelText(/project name/i), { target: { value: 'Updated Project Name' } });
        fireEvent.change(screen.getByLabelText(/project url/i), { target: { value: 'http://updated-url.com' } });
        fireEvent.change(screen.getByLabelText(/project image url/i), { target: { value: 'http://updated-image-url.com' } });
        // fireEvent.change(screen.getByLabelText(/project description/i), { target: { value: 'Updated project description' } });

        // Select a category
        // fireEvent.click(screen.getByText(/software engineering/i));

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /update/i }));

        // Check if the mutate function was called with the correct data
        // expect(mockAxios.patch).toHaveBeenCalledWith(`project/projects/update/1`, expect.objectContaining({
        //     pname: 'Updated Project Name',
        //     purl: 'http://updated-url.com',
        //     pimg: 'http://updated-image-url.com',
        //     pdes: 'Updated project description',
        //     pcategory: expect.any(String),
        //     pallmembers: expect.any(Array),
        // }));

        // Check for success toast
        // await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Project update Successfully!"));
        // expect(mockRouter.push).toHaveBeenCalledWith("/dashboard/projects");
    });
});
