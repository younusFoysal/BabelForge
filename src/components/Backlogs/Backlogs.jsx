'use client';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosCommon from '@/lib/axiosCommon';
import AddTask from '@/components/Dashboards/Task/AddTask';
import TableView from '@/components/Dashboards/Backlog/TableView';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@clerk/nextjs';

const Backlogs = () => {
  const axiosCommon = useAxiosCommon();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;

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
      toast({
        description: 'Task Added',
        variant: 'success',
      });
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
    queryKey: ['my-works', uemail],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/task/tasks/my-tasks/${uemail}`);
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
    try {
      await deleteTaskMutation({ id });
    } catch (err) {
      console.error(err);
    }
  };

  // Update task mutation
  const { mutateAsync: updateTaskMutation } = useMutation({
    mutationFn: async task => {
      const taskWithoutID = { ...task };
      delete taskWithoutID._id;
      const { data } = await axiosCommon.patch(`/task/tasks/update/${task._id}`, taskWithoutID);
      return data;
    },
    onSuccess: () => {
      toast({
        description: 'Task updated successfully!',
        variant: 'success',
      });
      refetch();
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
      <AddTask handleAddTask={handleAddTask} />
      <TableView refetch={refetch} tasks={tasks} handleDelete={handleDelete} handleEditTask={handleEditTask} />
    </div>
  );
};

export default Backlogs;
