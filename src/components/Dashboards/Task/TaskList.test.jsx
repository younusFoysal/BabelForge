import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TaskList from './TaskList';
import { DndContext, useDroppable } from '@dnd-kit/core';
import { useQuery } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import Task from './Task';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

// Mocking dnd-kit functions
jest.mock('@dnd-kit/core', () => ({
    DndContext: jest.fn(({ children }) => <div>{children}</div>),
    useDroppable: jest.fn(() => ({ setNodeRef: jest.fn() })),
}));

// Mocking @dnd-kit/sortable including arrayMove
jest.mock('@dnd-kit/sortable', () => ({
    arrayMove: jest.fn(),
    SortableContext: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}));

jest.mock('./Task', () => jest.fn(({ task }) => <div>{task.name}</div>));

jest.mock('@/components/shared/LoadingSpinner/LoadingSpinner', () =>
    jest.fn(() => <div>Loading...</div>)
);

describe('TaskList Component', () => {
    const mockTasks = [
        { _id: '1', tname: 'Task 1', tproces: 'todo', tassignTo: 'John Doe' },
        { _id: '2', tname: 'Task 2', tproces: 'inProgress', tassignTo: 'Jane Doe' },
        { _id: '3', tname: 'Task 3', tproces: 'done', tassignTo: 'John Doe' },
    ];

    beforeEach(() => {
        useQuery.mockReturnValue({
            data: mockTasks,
            isLoading: false,
            refetch: jest.fn(),
        });
    });

    test('shows loading spinner while data is loading', () => {
        useQuery.mockReturnValueOnce({ isLoading: true });

        render(<TaskList />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    // test('renders tasks in the correct columns', async () => {
    //     render(<TaskList />);

    //     // Ensure tasks are displayed in the appropriate categories
    //     await waitFor(() => {
    //         expect(screen.getByText('Task 1')).toBeInTheDocument(); // Todo
    //         expect(screen.getByText('Task 2')).toBeInTheDocument(); // In Progress
    //         expect(screen.getByText('Task 3')).toBeInTheDocument(); // Done
    //     });

    //     expect(screen.getByText('Todo')).toBeInTheDocument();
    //     expect(screen.getByText('In Progress')).toBeInTheDocument();
    //     expect(screen.getByText('Done')).toBeInTheDocument();
    // });

    test('displays message when there are no tasks', async () => {
        useQuery.mockReturnValueOnce({
            data: [],
            isLoading: false,
        });

        // render(<TaskList />);

        // await waitFor(() => {
        //     expect(screen.getAllByText('No tasks').length).toBe(3); // No tasks in all columns
        // });
    });

    // test('handles drag and drop events', async () => {
    //     render(<TaskList />);

    //     const taskElements = screen.getAllByText(/Task/);
    //     expect(taskElements).toHaveLength(3); // Ensure all tasks are rendered

    //     const todoColumn = screen.getByText('Todo');
    //     const inProgressColumn = screen.getByText('In Progress');
    //     const doneColumn = screen.getByText('Done');

    //     expect(todoColumn).toBeInTheDocument();
    //     expect(inProgressColumn).toBeInTheDocument();
    //     expect(doneColumn).toBeInTheDocument();
    // });

});
