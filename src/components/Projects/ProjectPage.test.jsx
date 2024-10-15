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

  // Simulate a click event on the button using fireEvent
  fireEvent.click(createProjectButton);


  // foysal vai
  
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



// describe("ProjectPage Category Select", () => {
//   const queryClient = new QueryClient();

//   it("should allow the user to select a category and update the state", () => {
//     // Render the component
//     render(
//       <SessionProvider session={null}>
//         <QueryClientProvider client={queryClient}>
//           <ProjectPage />
//         </QueryClientProvider>
//       </SessionProvider>
//     );

//     // Find the select trigger (button) by role
//     // const selectTrigger = screen.getByRole("button", { name: /Filter By Category/i });

//     // Simulate clicking the dropdown to open it
//     fireEvent.click(selectTrigger);

//     // Find all category options and select "Software Engineering"
//     const categoryOptions = screen.getAllByRole("option");

//     // Find and click the "Software Engineering" option
//     const softwareEngineeringOption = categoryOptions.find(option =>
//       option.textContent === "Software Engineering"
//     );
//     fireEvent.click(softwareEngineeringOption);

//     // Assert that the selected category now appears in the dropdown trigger
//     expect(selectTrigger).toHaveTextContent("Software Engineering");
//   });
// });



// describe("ProjectPage Input Field", () => {
//   const queryClient = new QueryClient();

//   it("should update the search state when typing in the input field", async () => {
//     // Render the component
//     render(
//       <SessionProvider session={null}>
//         <QueryClientProvider client={queryClient}>
//           <ProjectPage />
//         </QueryClientProvider>
//       </SessionProvider>
//     );

//     // Find the input field by placeholder (use findBy for async rendering)
//     const inputField = await screen.findByPlaceholderText("Project Name");

//     // Assert that the input field is in the document
//     expect(inputField).toBeInTheDocument();

//     // Simulate user typing into the input field
//     fireEvent.change(inputField, { target: { value: "Test Project" } });

//     // Assert the input value is updated correctly
//     expect(inputField.value).toBe("Test Project");
//   });
// });

