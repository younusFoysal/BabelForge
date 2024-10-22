'use client';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosCommon from '@/lib/axiosCommon';
import AddTask from '@/components/Dashboards/Task/AddTask';
import TableView from '@/components/Dashboards/Backlog/TableView';
import Swal from 'sweetalert2';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import { toast } from '@/hooks/use-toast';
import TaskPage from './TaskPage';
import Alert from '@/components/shared/Alert';

const Page = () => {
  const axiosCommon = useAxiosCommon();
  const [loading, setLoading] = useState(false);

  // Post task data
  const { mutateAsync: addTaskMutation } = useMutation({
    mutationFn: async taskData => {
      const { data } = await axiosCommon.post(`/task/tasks/add`, taskData);
      return data;
    },
    onSuccess: () => {
      toast({
        description: 'Task Added Successfully! ',
      });
      refetch();
      setLoading(false);
    },
    onError: err => {
      toast({
        description: 'Error! Try Again !',
        variant: 'error',
      });
      setLoading(false);
    },
  });

  // Form handler for adding task
  const handleAddTask = async newTask => {
    setLoading(true);
    try {
      await addTaskMutation(newTask);
    } catch (err) {
      toast({
        description: err.message,
        variant: 'error',
      });
      setLoading(false);
    }
  };

  // Fetch tasks data
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
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
      toast({
        description: 'Task deleted successfully. ',
        variant: 'success',
      });
    },
    onError: () => {
      toast({
        description: 'Failed to delete the task!',
        variant: 'error',
      });
    },
  });

  const handleDelete = async id => {
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
    mutationFn: async task => {
      const taskWithoutID = { ...task };
      delete taskWithoutID._id; // Remove the _id field before patching
      const { data } = await axiosCommon.patch(`/task/tasks/update/${task._id}`, taskWithoutID);
      return data;
    },
    onSuccess: () => {
      toast({
        description: 'Task updated successfully!',
        variant: 'success',
      });
      refetch(); // Refetch task data after update
    },
    onError: err => {
      toast({
        description: err.message,
        variant: 'error',
      });
    },
  });

  // Form handler for updating a task
  const handleEditTask = async updatedTask => {
    try {
      await updateTaskMutation(updatedTask);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* <AddTask handleAddTask={handleAddTask} /> */}
      <TableView tasks={tasks} handleDelete={handleDelete} handleEditTask={handleEditTask} />
      <TaskPage task={tasks} />
    </div>
  );
};

export default Page;
