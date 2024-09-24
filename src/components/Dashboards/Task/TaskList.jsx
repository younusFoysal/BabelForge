"use client";
import { DndContext, closestCenter, useDroppable, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Task from './Task';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { arrayMove } from '@dnd-kit/sortable';
import AddTask from './AddTask'; // Import AddTask component

export default function TaskList() {
    const [tasks, setTasks] = useState({
        todo: [
            { id: 'task-1', name: 'Task 1' },
            { id: 'task-2', name: 'Task 2' },
        ],
        inProgress: [
            { id: 'task-3', name: 'Task 3' },
        ],
        done: [],
    });

    const [activeTask, setActiveTask] = useState(null); // Holds the currently dragged item

    const handleDragStart = (event) => {
        const { active } = event;
        const activeTask = getActiveTask(active.id);
        setActiveTask(activeTask);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveTask(null); // Reset active task after drop

        if (!over) return; // If the task is dropped outside of a droppable area

        const activeContainer = getContainer(active.id);
        const overContainer = getContainer(over.id) || over.id; // fallback to container id

        if (activeContainer && overContainer) {
            // Moving within the same container
            if (activeContainer === overContainer) {
                const activeIndex = tasks[activeContainer].findIndex((task) => task.id === active.id);
                const overIndex = tasks[overContainer].findIndex((task) => task.id === over.id);

                setTasks((prevTasks) => ({
                    ...prevTasks,
                    [activeContainer]: arrayMove(prevTasks[activeContainer], activeIndex, overIndex),
                }));
            } else {
                // Moving between containers
                const activeIndex = tasks[activeContainer].findIndex((task) => task.id === active.id);
                const movedTask = tasks[activeContainer][activeIndex];

                setTasks((prevTasks) => ({
                    ...prevTasks,
                    [activeContainer]: prevTasks[activeContainer].filter((task) => task.id !== active.id),
                    [overContainer]: [...prevTasks[overContainer], movedTask],
                }));
            }
        }
    };

    const getContainer = (taskId) => {
        if (tasks.todo.find((task) => task.id === taskId)) return 'todo';
        if (tasks.inProgress.find((task) => task.id === taskId)) return 'inProgress';
        if (tasks.done.find((task) => task.id === taskId)) return 'done';
        return null; // In case the task is not found in any container
    };

    const getActiveTask = (taskId) => {
        return tasks.todo.find((task) => task.id === taskId) ||
            tasks.inProgress.find((task) => task.id === taskId) ||
            tasks.done.find((task) => task.id === taskId);
    };

    // Function to add a new task to the "Todo" list
    const addTask = (taskName) => {
        setTasks((prevTasks) => ({
            ...prevTasks,
            todo: [...prevTasks.todo, { id: uuidv4(), name: taskName }],
        }));
    };

    return (
        <div className="p-6">
            {/* Use the AddTask component and pass addTask as a prop */}
            <AddTask addTask={addTask} />

            {/* Single DndContext wrapping all three columns */}
            <DndContext
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-6 justify-between">
                    {/* Todo Column */}
                    <DroppableColumn id="todo" tasks={tasks.todo} title="Todo" />

                    {/* In Progress Column */}
                    <DroppableColumn id="inProgress" tasks={tasks.inProgress} title="In Progress" />

                    {/* Done Column */}
                    <DroppableColumn id="done" tasks={tasks.done} title="Done" />
                </div>

                {/* DragOverlay for smoother drag */}
                <DragOverlay>
                    {activeTask ? <Task task={activeTask} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}

function DroppableColumn({ id, tasks, title }) {
    const { setNodeRef } = useDroppable({
        id, // Unique id for each droppable area (todo, inProgress, done)
    });

    return (
        <div ref={setNodeRef} className="bg-gray-100 p-4 rounded-lg w-1/3 shadow min-h-[200px]">
            <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                <ul className="space-y-2 min-h-[100px]">
                    {tasks.length > 0 ? (
                        tasks.map((task) => <Task key={task.id} task={task} />)
                    ) : (
                        <div className="text-center text-gray-500">No tasks</div>
                    )}
                </ul>
            </SortableContext>
        </div>
    );
}
