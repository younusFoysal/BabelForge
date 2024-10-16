"use client";
import { useState } from 'react';
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "@/lib/axiosCommon";
import AddTask from "@/components/Dashboards/Task/AddTask";
import BacklogPage from "@/components/Dashboards/Backlog/BacklogPage";
import TableView from "@/components/Dashboards/Backlog/TableView";
import Swal from "sweetalert2";
import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";

const Page = () => {
    const axiosCommon = useAxiosCommon();
    const [loading, setLoading] = useState(false);

    // Post task data
    const { mutateAsync: addTaskMutation } = useMutation({
        mutationFn: async (taskData) => {
            const { data } = await axiosCommon.post(`/task/tasks/add`, taskData);
            return data;
        },
        onSuccess: () => {
            toast.success('Task Added Successfully!');
            refetch(); // Refetch task data
            setLoading(false);
        },
        onError: (err) => {
            toast.error(err.message);
            setLoading(false);
        },
    });

    // Form handler for adding task
    const handleAddTask = async (newTask) => {
        setLoading(true);
        try {
            await addTaskMutation(newTask);
        } catch (err) {
            toast.error(err.message);
            setLoading(false);
        }
    };

    // Fetch tasks data
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['my-works'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/task/tasks`);
            return data;
        },
    });

    // Delete task
    const { mutateAsync: deleteTaskMutation, isLoading: isDeleting } = useMutation({
        mutationFn: async ({ id }) => {
            const { data } = await axiosCommon.delete(`/task/tasks/delete/${id}`);
            return data;
        },
        onSuccess: () => {
            refetch();
            toast.success('Task deleted successfully.');
        },
        onError: () => {
            toast.error('Failed to delete the task.');
        },
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            try {
                await deleteTaskMutation({ id });
            } catch (err) {
                console.error(err);
            }
        }
    };

    // Update task mutation
    const { mutateAsync: updateTaskMutation } = useMutation({
        mutationFn: async (task) => {
            const taskWithoutID = { ...task };
            delete taskWithoutID._id; // Remove the _id field before patching
            const { data } = await axiosCommon.patch(`/task/tasks/update/${task._id}`, taskWithoutID);
            return data;
        },
        onSuccess: () => {
            toast.success('Task updated successfully!');
            refetch(); // Refetch task data after update
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    // Form handler for updating a task
    const handleEditTask = async (updatedTask) => {
        try {
            await updateTaskMutation(updatedTask);
        } catch (err) {
            console.error(err);
        }
    };

    if (isLoading) return <LoadingSpinner/>;

    return (
        <div>
            <AddTask handleAddTask={handleAddTask} />
            <TableView tasks={tasks} handleDelete={handleDelete} handleEditTask={handleEditTask} />
        </div>
    );
};

export default Page;
