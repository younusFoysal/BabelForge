import { render } from "@testing-library/react";
import { UpdateProfile } from "./UpdateProfile";
import { useMutation } from "@tanstack/react-query";


jest.mock("@tanstack/react-query", () => ({
    useMutation: jest.fn(),
}));

describe("UpdateProfile Component", () => {
    const mockUser = {
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        department: "Engineering",
        organization: "Tech Corp",
        location: "New York",
    };

    const mockRefetch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useMutation.mockReturnValue({
            mutate: jest.fn(),
        });


        render(<UpdateProfile user={mockUser} refetch={mockRefetch} />);
    });

    test("submits updated profile data and calls refetch", async () => {

    });
});
