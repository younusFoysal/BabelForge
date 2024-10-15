import React from 'react';
import { render, screen } from '@testing-library/react';
import Task from './Task';
import { useSortable } from '@dnd-kit/sortable';
import '@testing-library/jest-dom';
import Link from 'next/link';

jest.mock('@dnd-kit/sortable', () => ({
    useSortable: jest.fn(),
}));

jest.mock('next/link', () => {
    return ({ href, children }) => (
        <a href={href} data-testid="link">
            {children}
        </a>
    );
});

describe('Task Component', () => {
    const mockTask = {
        id: '1',
        name: 'Test Task',
        process: 'todo',
        assignTo: 'John Doe',
    };

    beforeEach(() => {
        useSortable.mockReturnValue({
            attributes: {},
            listeners: {},
            setNodeRef: jest.fn(),
            transform: null,
            transition: null,
        });
    });

    test('renders task name correctly', () => {
        render(<Task task={mockTask} />);
        expect(screen.getByText('Test Task')).toBeInTheDocument();
    });

    test('renders correct icon for "todo" process', () => {
        render(<Task task={mockTask} />);
        expect(screen.getByText('📝')).toBeInTheDocument(); // '📝' for 'todo'
    });

    test('renders correct icon for "done" process', () => {
        const doneTask = { ...mockTask, process: 'done' };
        render(<Task task={doneTask} />);
        expect(screen.getByText('✅')).toBeInTheDocument(); // '✅' for 'done'
    });

    test('renders correct icon for any other process', () => {
        const inProgressTask = { ...mockTask, process: 'in-progress' };
        render(<Task task={inProgressTask} />);
        expect(screen.getByText('⏰')).toBeInTheDocument(); // '⏰' for anything else
    });

    test('renders the correct link', () => {
        render(<Task task={mockTask} />);
        const link = screen.getByTestId('link');
        expect(link).toHaveAttribute('href', `/dashboard/tasks/${mockTask.id}`);
        expect(link).toHaveTextContent('Test Task');
    });

    test('renders assigned person correctly', () => {
        render(<Task task={mockTask} />);
        expect(screen.getByText('Assigned to: John Doe')).toBeInTheDocument();
    });
});
