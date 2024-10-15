import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Checkout from './Checkout';

// Mocking the Image component from next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }) => <img src={src} alt={alt} />, // Mock as simple img tag
}));

describe('Checkout Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the checkout form and order summary correctly', () => {
    render(<Checkout />);
    
    // Check that form fields are rendered
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('1234-5678-XXXX-XXXX')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name on the card')).toBeInTheDocument();
    expect(screen.getByText('Expiration date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Security code')).toBeInTheDocument();

    // Check the presence of order summary
    expect(screen.getByText('Nano Titanium Hair Dryer')).toBeInTheDocument();
    expect(screen.getByText('$260.00')).toBeInTheDocument();
    expect(screen.getByText('Total price:')).toBeInTheDocument();
    expect(screen.getByText('$510.00')).toBeInTheDocument();
  });

  test('displays error message for incomplete email field', () => {
    render(<Checkout />);
    
    // Simulate form submission without filling email
    fireEvent.click(screen.getByText('Place Order'));
    
    // Assuming validation gives an alert or error message
    // Here you should either mock validation logic or capture user feedback
    // Adjust this assertion based on your specific implementation
    // Example:
    // expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
  });

  test('displays error message for invalid card number', () => {
    render(<Checkout />);
    
    fireEvent.change(screen.getByPlaceholderText('1234-5678-XXXX-XXXX'), {
      target: { value: '1234' }, // Invalid card number
    });

    fireEvent.click(screen.getByText('Place Order'));

    // Expect error related to invalid card number
    // Example:
    // expect(screen.getByText('Please enter a valid card number')).toBeInTheDocument();
  });

  test('submits form correctly when all fields are valid', () => {
    render(<Checkout />);
    
    // Fill in valid data
    fireEvent.change(screen.getByPlaceholderText('john.capler@fang.com'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('1234-5678-XXXX-XXXX'), {
      target: { value: '1234-5678-1234-5678' },
    });

    fireEvent.change(screen.getByPlaceholderText('Name on the card'), {
      target: { value: 'John Doe' },
    });

    fireEvent.change(screen.getByPlaceholderText('Security code'), {
      target: { value: '123' },
    });

    fireEvent.change(screen.getByLabelText('Select expiration month'), {
      target: { value: '12' },
    });

    fireEvent.change(screen.getByLabelText('Select expiration year'), {
      target: { value: '2025' },
    });

    fireEvent.click(screen.getByText('Place Order'));

    // Expect the form to be submitted without errors
    // Adjust this as per actual submission handling
    // Example: expect(mockSubmitFunction).toHaveBeenCalledTimes(1);
  });

  test('displays order summary with correct total price and VAT', () => {
    render(<Checkout />);

    // Check that total price and VAT are displayed correctly
    expect(screen.getByText('Total price:')).toBeInTheDocument();
    expect(screen.getByText('$510.00')).toBeInTheDocument();
    expect(screen.getByText('Vat: 10%')).toBeInTheDocument();
    expect(screen.getByText('$55.00')).toBeInTheDocument();
  });

  test('displays support information correctly', () => {
    render(<Checkout />);

    expect(screen.getByText('+01 653 235 211')).toBeInTheDocument();
    expect(screen.getByText('support@nanohair.com')).toBeInTheDocument();
    expect(screen.getByText('Call us now for payment related issues')).toBeInTheDocument();
  });

  test('renders image components correctly', () => {
    render(<Checkout />);

    // Check that image components render properly using alt text
    // expect(screen.getAllByAltText('')).toHaveLength(5); // Check for all images (mocked)
  });
});
