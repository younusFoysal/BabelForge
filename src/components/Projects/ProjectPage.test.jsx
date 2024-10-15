import { render, screen, fireEvent } from "@testing-library/react";
import ProjectPage from "./ProjectPage"; // Update the path to your ProjectPage component
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mocking next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("ProjectPage Create Project Button", () => {
  const queryClient = new QueryClient();

  it("should render the Create Project button and navigate to the create project page on click", () => {
    // Mock the router
    const push = jest.fn();
    useRouter.mockReturnValue({ push });

    // Render the component inside the session provider and QueryClientProvider
    render(
      <SessionProvider session={null}>
        <QueryClientProvider client={queryClient}>
          <ProjectPage />
        </QueryClientProvider>
      </SessionProvider>
    );

    // Find the Create Project button
    const createProjectButton = screen.getByRole("button", { name: /Create Project/i });

    // Assert that the button is in the document
    expect(createProjectButton).toBeInTheDocument();

    // Simulate a click event on the button using fireEvent
    fireEvent.click(createProjectButton);
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

