"use client"
import { DndContext, closestCenter, useDroppable, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Task from './Task';
import { useState, useEffect } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import AddTask from './AddTask';
import axios from 'axios';
import useAxiosCommon from "@/lib/axiosCommon"; // Import axios for API requests

export default function TaskList() {
    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: [],
    });

    const [activeTask, setActiveTask] = useState(null);
    const axiosCommon = useAxiosCommon()

    useEffect(() => {
        // Fetch tasks from the API when the component mounts
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/task/tasks');
                const data = response.data;

                // Organize tasks into categories
                const organizedTasks = {
                    todo: data.filter((task) => task.tproces === 'todo').map((task) => ({
                        id: task._id,
                        name: task.tname,
                    })),
                    inProgress: data.filter((task) => task.tproces === 'inProgress').map((task) => ({
                        id: task._id,
                        name: task.tname,
                    })),
                    done: data.filter((task) => task.tproces === 'done').map((task) => ({
                        id: task._id,
                        name: task.tname,
                    })),
                };

                setTasks(organizedTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [tasks]);

    const addTask = async (taskName) => {
        try {
            // Create the task object to send to the API
            const newTask = {
                tname: taskName,
                tproces: 'todo', // By default, new tasks are added to "Todo"
                author: 'Foysal', // Example author; adjust based on your requirements
            };

            // Send POST request to the API to add the task
            const response = await axios.post('http://localhost:5000/task/tasks/add', newTask);

            if (response.status === 200) {
                // On success, update the task list locally
                setTasks((prevTasks) => ({
                    ...prevTasks,
                    todo: [...prevTasks.todo, { id: response.data._id, name: taskName }],
                }));
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleDragStart = (event) => {
        const { active } = event;
        const activeTask = getActiveTask(active.id);
        setActiveTask(activeTask);
    };

    const handleDragEnd = async (event) => {


        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        const activeContainer = getContainer(active.id);
        const overContainer = getContainer(over.id) || over.id;

        if (activeContainer && overContainer) {
            if (activeContainer === overContainer) {
                const activeIndex = tasks[activeContainer].findIndex((task) => task.id === active.id);
                const overIndex = tasks[overContainer].findIndex((task) => task.id === over.id);

                setTasks((prevTasks) => ({
                    ...prevTasks,
                    [activeContainer]: arrayMove(prevTasks[activeContainer], activeIndex, overIndex),
                }));
            } else {
                const activeIndex = tasks[activeContainer].findIndex((task) => task.id === active.id);
                const movedTask = tasks[activeContainer][activeIndex];

                setTasks((prevTasks) => ({
                    ...prevTasks,
                    [activeContainer]: prevTasks[activeContainer].filter((task) => task.id !== active.id),
                    [overContainer]: [...prevTasks[overContainer], movedTask],
                }));

                await updateTaskStatus(movedTask.id, overContainer);

            }
        }
    };

    // Function to update task status in the backend
    const updateTaskStatus = async (taskId, newStatus) => {
        console.log("Update", taskId, newStatus);

        try {
            await axios.patch(`http://localhost:5000/task/tasks/update/${taskId}`, {
                tproces: newStatus,
            });
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const getContainer = (taskId) => {
        if (tasks.todo.find((task) => task.id === taskId)) return 'todo';
        if (tasks.inProgress.find((task) => task.id === taskId)) return 'inProgress';
        if (tasks.done.find((task) => task.id === taskId)) return 'done';
        return null;
    };

    const getActiveTask = (taskId) => {
        return tasks.todo.find((task) => task.id === taskId) ||
            tasks.inProgress.find((task) => task.id === taskId) ||
            tasks.done.find((task) => task.id === taskId);
    };

    return (
        <div className="p-6">
            <AddTask addTask={addTask} />

            <DndContext
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-6 justify-between">
                    <DroppableColumn id="todo" tasks={tasks.todo} title="Todo" />
                    <DroppableColumn id="inProgress" tasks={tasks.inProgress} title="In Progress" />
                    <DroppableColumn id="done" tasks={tasks.done} title="Done" />
                </div>

                <DragOverlay>
                    {activeTask ? <Task task={activeTask} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}

function DroppableColumn({ id, tasks, title }) {
    const { setNodeRef } = useDroppable({
        id,
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
