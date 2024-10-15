import { render, screen, fireEvent } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SocialButton } from './SocialButton';
import '@testing-library/jest-dom';

// Mock the necessary hooks
jest.mock('next-auth/react');
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('SocialButton Component', () => {
    const mockSignIn = jest.fn();
    const mockUseRouter = jest.fn();

    beforeEach(() => {
        // Mock useSession
        useSession.mockReturnValue({
            data: null,
        });

        // Mock signIn
        signIn.mockImplementation(mockSignIn);

        // Mock useRouter
        useRouter.mockReturnValue({
            push: mockUseRouter,
        });
    });

    test('renders SocialButton component without crashing', () => {
        render(<SocialButton />);
        expect(screen.getByText(/Continue With Google/i)).toBeInTheDocument();
    });

    test('calls signIn when the button is clicked', async () => {
        render(<SocialButton />);

        const button = screen.getByText(/Continue With Google/i);
        fireEvent.click(button);

        expect(signIn).toHaveBeenCalledWith('google', {
            redirect: true,
            callbackUrl: '/dashboard',
        });
    });
});
