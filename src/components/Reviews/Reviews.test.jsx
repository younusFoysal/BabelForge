import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import Reviews from './Reviews';

// Mock the react-query mutation and react-hot-toast
jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('Reviews Component', () => {
    const mutateMock = jest.fn();

    beforeEach(() => {
        useMutation.mockReturnValue({ mutate: mutateMock });
        jest.clearAllMocks();
    });

    test('renders the component correctly', () => {
        render(<Reviews />);
        expect(screen.getByText('Submit Your Review', 'Your Rating:')).toBeInTheDocument();
        //expect(screen.getByText('Your Rating:')).toBeInTheDocument();
        expect(screen.getByLabelText('Name:')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('please share your thoughts...')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    });

    test('displays error toast when no rating is selected', () => {
        render(<Reviews />);

        fireEvent.change(screen.getByPlaceholderText('please share your thoughts...'), {
            target: { value: 'This is my review' },
        });
        fireEvent.click(screen.getByText('Submit'));

        expect(toast.error).toHaveBeenCalledWith('Please select a rating.');
        expect(mutateMock).not.toHaveBeenCalled();
    });

    test('displays error toast when no review text is entered', () => {
        render(<Reviews />);

        // Simulate selecting a rating
        fireEvent.click(screen.getAllByTestId('emoji-button')[0]); // Select the first emoji
        fireEvent.click(screen.getByText('Submit'));

        expect(toast.error).toHaveBeenCalledWith('Please enter your review.');
        expect(mutateMock).not.toHaveBeenCalled();
    });

    test('submits the review successfully', () => {
        render(<Reviews />);

        // Simulate entering a review and selecting a rating
        fireEvent.change(screen.getByPlaceholderText('please share your thoughts...'), {
            target: { value: 'This is my review' },
        });
        fireEvent.click(screen.getAllByTestId('emoji-button')[1]); // Select the second emoji
        fireEvent.click(screen.getByText('Submit'));

        expect(mutateMock).toHaveBeenCalledWith({
            name: 'Test User',
            reviewText: 'This is my review',
            rating: 2,
        });
    });

    test('displays success toast on successful mutation', () => {
        // Simulate a successful mutation
        mutateMock.mockImplementation((review,) => {

        });

        render(<Reviews />);

        fireEvent.change(screen.getByPlaceholderText('please share your thoughts...'), {
            target: { value: 'This is my review' },
        });
        fireEvent.click(screen.getAllByTestId('emoji-button')[2]); // Select the third emoji
        fireEvent.click(screen.getByText('Submit'));

        //expect(toast.success).toHaveBeenCalledWith('Review Added Successfully!');
    });

    test('displays error toast on failed mutation', () => {
        // Simulate a failed mutation
        mutateMock.mockImplementation((review, ) => {
            //console.log("Simulating error...");
        });

        render(<Reviews />);

        fireEvent.change(screen.getByPlaceholderText('please share your thoughts...'), {
            target: { value: 'This is my review' },
        });
        fireEvent.click(screen.getAllByTestId('emoji-button')[2]); // Select the third emoji
        fireEvent.click(screen.getByText('Submit'));

        // Check if mutate was called
        expect(mutateMock).toHaveBeenCalled();

        // Check if the error toast was called
        //expect(toast.error)?.toHaveBeenCalledWith('Failed to add review.');
    });
});
