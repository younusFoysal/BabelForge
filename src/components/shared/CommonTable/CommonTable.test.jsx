import { render, screen, fireEvent } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import CommonTable from './CommonTable';
import '@testing-library/jest-dom';
import useAxiosCommon from '@/lib/axiosCommon';
import toast from 'react-hot-toast';

// Mock necessary hooks and modules
jest.mock('next-auth/react');
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}));
jest.mock('@/lib/axiosCommon');
jest.mock('react-hot-toast');

// Test data
const mockTheads = ['Fav', 'Name', 'Category'];
const mockTdata = [
    {
        _id: '1',
        favorite: false,
        pimg: 'image.jpg',
        pname: 'Project A',
        pcategory: 'Category A',
        pmanager: 'manager@example.com',
        purl: 'https://example.com',
        psdate: '2023-01-01',
        pedate: '2023-12-31',
    },
];

describe('CommonTable Component', () => {
    const mockUseRouter = jest.fn();
    const mockAxiosPatch = jest.fn();
    const mockAxiosDelete = jest.fn();
    const projectRefetch = jest.fn();
    const inboxRefetch = jest.fn();

    beforeEach(() => {
        // Mock session data
        useSession.mockReturnValue({
            data: {
                user: { email: 'manager@example.com' },
            },
        });

        // Mock router and path
        useRouter.mockReturnValue({
            push: mockUseRouter,
        });
        usePathname.mockReturnValue('/dashboard/projects');

        // Mock axios functions
        useAxiosCommon.mockReturnValue({
            patch: mockAxiosPatch,
            delete: mockAxiosDelete,
        });

        // Mock toast notifications
        toast.success = jest.fn();
    });

    test('renders table with correct headers', () => {
        render(<CommonTable key="1" theads={mockTheads} tdata={mockTdata} projectRefetch={projectRefetch} inboxRefetch={inboxRefetch} />);

        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Category')).toBeInTheDocument();
        expect(screen.getByText('Project A')).toBeInTheDocument();
    });

    test('calls handleFavorite when favorite icon is clicked', async () => {
        render(<CommonTable key="1" theads={mockTheads} tdata={mockTdata} projectRefetch={projectRefetch} inboxRefetch={inboxRefetch} />);

        const favoriteIcon = screen.getByRole('button');
        fireEvent.click(favoriteIcon);

        expect(mockAxiosPatch).toHaveBeenCalledWith(
            'project/projects/update/1',
            { favorite: true }
        );
        expect(toast.success).toHaveBeenCalledWith('Project added to favorites!');
    });

    test('calls handleDelete when delete option is selected', () => {
        usePathname.mockReturnValue('/dashboard/admin/inbox'); // Set for inbox path
        render(<CommonTable key="1" theads={mockTheads} tdata={mockTdata} projectRefetch={projectRefetch} inboxRefetch={inboxRefetch} />);

        const ellipsisButton = screen.getByRole('button');
        fireEvent.click(ellipsisButton);

        const deleteOption = screen.getByText('Delete');
        fireEvent.click(deleteOption);

        expect(mockAxiosDelete).toHaveBeenCalledWith('/message/messages/1');
        expect(toast.success).toHaveBeenCalledWith('Message Deleted!');
    });
});
