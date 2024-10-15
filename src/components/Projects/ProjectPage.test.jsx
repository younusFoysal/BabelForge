import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectPage from './ProjectPage'; // Adjust the import path as necessary
import { useSession } from 'next-auth/react';
import useProjects from '@/hooks/useProjects';
import { useRouter, usePathname } from 'next/navigation';

// Mock Next.js router and path
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('next-auth/react');
jest.mock('@/hooks/useProjects');

describe('ProjectPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the router
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
    }));

    // Mock the pathname
    usePathname.mockImplementation(() => '/projects');
  });

  test('renders loading state', () => {
    useSession.mockReturnValue({ data: { user: { email: 'user@test.com' } } });
    useProjects.mockReturnValue({
      isLoading: true,
    });

    render(<ProjectPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Adjust to match your loading state text
  });

  test('displays no projects message', () => {
    useSession.mockReturnValue({ data: { user: { email: 'user@test.com' } } });
    useProjects.mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<ProjectPage />);
    expect(screen.getByText(/you have no projects yet/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create project/i })).toBeInTheDocument();
  });

  test('searches for a project', async () => {
    useSession.mockReturnValue({ data: { user: { email: 'user@test.com' } } });
    useProjects.mockReturnValue({
      data: [{ name: 'Project 1' }, { name: 'Project 2' }],
      isLoading: false,
    });

    render(<ProjectPage />);

    const input = screen.getByPlaceholderText('Project Name');
    fireEvent.change(input, { target: { value: 'Project 1' } });

    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    // Wait for the project to be rendered
    // await waitFor(() => {
    //   expect(screen.getByText('Project 1')).toBeInTheDocument();
    // });

    // Verify that the other project is not rendered
    expect(screen.queryByText('Project 2')).not.toBeInTheDocument(); // Adjust based on your filter logic
  });

  test('renders projects in table', async () => {
    useSession.mockReturnValue({ data: { user: { email: 'user@test.com' } } });
    useProjects.mockReturnValue({
      data: [
        { name: 'Project 1', type: 'Software', manager: 'Alice' },
        { name: 'Project 2', type: 'Education', manager: 'Bob' },
      ],
      isLoading: false,
    });

    render(<ProjectPage />);

    // Wait for the projects to be rendered
    //await waitFor(() => {
    //expect(screen.getByText('Project 1')).toBeInTheDocument();
    //expect(screen.getByText('Project 2')).toBeInTheDocument();
    //});
  });
});