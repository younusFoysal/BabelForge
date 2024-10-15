import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import AddTask from './AddTask';

// Mock the useSession hook from next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('AddTask Component', () => {
  const mockHandleAddTask = jest.fn();

  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks();
    // Mock a user session
    useSession.mockReturnValue({
      data: {
        user: {
          name: 'Test User',
          email: 'test@example.com',
        },
      },
    });
  });

  test('renders AddTask input and button', () => {
    render(<AddTask handleAddTask={mockHandleAddTask} />);

    const input = screen.getByPlaceholderText('Add new task');
    const button = screen.getByRole('button', { name: 'Add Task' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('allows user to input a task name', () => {
    render(<AddTask handleAddTask={mockHandleAddTask} />);

    const input = screen.getByPlaceholderText('Add new task');

    fireEvent.change(input, { target: { value: 'New Task' } });
    expect(input.value).toBe('New Task');
  });

  test('calls handleAddTask with the correct arguments when submitting', async () => {
    render(<AddTask handleAddTask={mockHandleAddTask} />);

    const input = screen.getByPlaceholderText('Add new task');
    const button = screen.getByRole('button', { name: 'Add Task' });

    // Simulate typing a task name
    fireEvent.change(input, { target: { value: 'New Task' } });
    
    // Click the button to submit
    fireEvent.click(button);

    // Assert that handleAddTask was called with the expected argument
    expect(mockHandleAddTask).toHaveBeenCalledTimes(1);
    expect(mockHandleAddTask).toHaveBeenCalledWith(expect.objectContaining({
      tname: 'New Task',
      tdes: 'This is a description',
      tassignTo: 'Test User',
      author: 'test@example.com',
      tproces: 'todo',
      tdate: expect.any(String),  // Here you can check specific format if needed
      ttime: expect.any(String),   // Similarly, check the format for time
    }));
  });

  test('handles empty task name by using default value', async () => {
    render(<AddTask handleAddTask={mockHandleAddTask} />);

    const button = screen.getByRole('button', { name: 'Add Task' });

    // Click the button to submit with empty task name
    fireEvent.click(button);

    // Assert that handleAddTask was called with the expected default task name
    expect(mockHandleAddTask).toHaveBeenCalledWith(expect.objectContaining({
      tname: 'Untitled Task', // Check default value when taskName is empty
    }));
  });
});
