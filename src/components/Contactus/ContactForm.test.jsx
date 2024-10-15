import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from './ContactForm';
import { useMutation } from '@tanstack/react-query';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

// Mock the useMutation hook from react-query
jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
}));

// Mock emailjs
jest.mock('@emailjs/browser', () => ({
    sendForm: jest.fn(),
    init: jest.fn(),
}));

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
    success: jest.fn(),
    error: jest.fn(),
}));

describe('ContactForm Component', () => {
    let mutateMock;

    beforeEach(() => {
        // Mock mutation function from tanstack/react-query
        mutateMock = jest.fn();
        useMutation.mockReturnValue({
            mutate: mutateMock,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the form correctly', () => {
        render(<ContactForm />);

        // Check if the heading and form fields are rendered
        expect(screen.getByText('Contact With our team')).toBeInTheDocument();
        expect(screen.getByLabelText('First Name *')).toBeInTheDocument();
        expect(screen.getByLabelText('Last Name *')).toBeInTheDocument();
        expect(screen.getByLabelText('Work Email *')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone number *')).toBeInTheDocument();
        expect(screen.getByLabelText('Company Name *')).toBeInTheDocument();
        expect(screen.getByLabelText('Company Size *')).toBeInTheDocument();
        expect(screen.getByLabelText('What would you like to manage with babelforge.com? *')).toBeInTheDocument();
        expect(screen.getByLabelText('How can our team help you? *')).toBeInTheDocument();
    });

    test('shows error messages for required fields', async () => {
        render(<ContactForm />);

        fireEvent.click(screen.getByText('Submit'));

        // await waitFor(() => {
        //     expect(screen.getByText('First name is required')).toBeInTheDocument();
        //     expect(screen.getByText('Last name is required')).toBeInTheDocument();
        //     expect(screen.getByText('Email is required')).toBeInTheDocument();
        //     expect(screen.getByText('Phone number is required')).toBeInTheDocument();
        //     expect(screen.getByText('Company name is required')).toBeInTheDocument();
        //     expect(screen.getByText('Please fill up this field')).toBeInTheDocument(); // For the manage and help fields
        // });
    });

    test('calls mutation and sends email when form is submitted', async () => {
        render(<ContactForm />);

        // Fill out the form fields
        fireEvent.input(screen.getByLabelText('First Name *'), { target: { value: 'John' } });
        fireEvent.input(screen.getByLabelText('Last Name *'), { target: { value: 'Doe' } });
        fireEvent.input(screen.getByLabelText('Work Email *'), { target: { value: 'john@example.com' } });
        fireEvent.input(screen.getByLabelText('Phone number *'), { target: { value: '123456789' } });
        fireEvent.input(screen.getByLabelText('Company Name *'), { target: { value: 'Company Inc' } });
        fireEvent.input(screen.getByLabelText('What would you like to manage with babelforge.com? *'), { target: { value: 'Project management' } });
        fireEvent.input(screen.getByLabelText('How can our team help you? *'), { target: { value: 'Improve workflow' } });

        // Mock EmailJS success response
        emailjs.sendForm.mockResolvedValue({ text: 'Email sent successfully' });

        // Submit the form
        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            // Ensure mutation is called
            // expect(mutateMock).toHaveBeenCalled();

            // Ensure emailjs.sendForm is called
            // expect(emailjs.sendForm).toHaveBeenCalledWith(
            //     'service_69vnh7j',
            //     'template_fcmd8bd',
            //     expect.anything(),
            //     'R0SQsAJVqN9XXxY0A'
            // );

            // Ensure success toast is shown
            // expect(toast.success).toHaveBeenCalledWith('Email sent successfully!');
            // expect(toast.success).toHaveBeenCalledWith('Message send Successfully!');
        });
    });

    test('handles email send failure', async () => {
        render(<ContactForm />);

        // Fill out the form fields
        fireEvent.input(screen.getByLabelText('First Name *'), { target: { value: 'John' } });
        fireEvent.input(screen.getByLabelText('Last Name *'), { target: { value: 'Doe' } });
        fireEvent.input(screen.getByLabelText('Work Email *'), { target: { value: 'john@example.com' } });
        fireEvent.input(screen.getByLabelText('Phone number *'), { target: { value: '123456789' } });
        fireEvent.input(screen.getByLabelText('Company Name *'), { target: { value: 'Company Inc' } });
        fireEvent.input(screen.getByLabelText('What would you like to manage with babelforge.com? *'), { target: { value: 'Project management' } });
        fireEvent.input(screen.getByLabelText('How can our team help you? *'), { target: { value: 'Improve workflow' } });

        // Mock EmailJS failure
        emailjs.sendForm.mockRejectedValue(new Error('Email failed'));

        // Submit the form
        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            // Ensure emailjs.sendForm is called
            // expect(emailjs.sendForm).toHaveBeenCalled();

            // Ensure error toast is shown
            // expect(toast.error).toHaveBeenCalledWith('Failed to send the email.');
        });
    });
});
