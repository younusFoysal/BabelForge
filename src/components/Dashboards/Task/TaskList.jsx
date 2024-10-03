"use client";
import {
  DndContext,
  closestCenter,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./Task";
import React, { useState, useEffect } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import AddTask from "./AddTask";
import axios from "axios";
import useAxiosCommon from "@/lib/axiosCommon";
import {useQuery} from "@tanstack/react-query"; // Import axios for API requests

export default function TaskList() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [activeTask, setActiveTask] = useState(null);
  const axiosCommon = useAxiosCommon();


  const { data: taskdata = [], isLoading, refetch } = useQuery({
    queryKey: ['alltaskss'],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/task/tasks`);

      // Organize tasks into categories
      const organizedTasks = {
        todo: taskdata
            .filter((task) => task.tproces === "todo")
            .map((task) => ({
              id: task._id,
              name: task.tname,
              process: "todo",
              author: task.author,
              assignTo: task.tassignTo
            })),
        inProgress: data
            .filter((task) => task.tproces === "inProgress")
            .map((task) => ({
              id: task._id,
              name: task.tname,
              process: "inProgress",
              author: task.author,
              assignTo: task.tassignTo
            })),
        done: data
            .filter((task) => task.tproces === "done")
            .map((task) => ({
              id: task._id,
              name: task.tname,
              process: "done",
              author: task.author,
              assignTo: task.tassignTo
            })),
      };


      setTasks(organizedTasks)
      return data;
    },
  });
  console.log(tasks);




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
        const activeIndex = tasks[activeContainer].findIndex(
          (task) => task.id === active.id
        );
        const overIndex = tasks[overContainer].findIndex(
          (task) => task.id === over.id
        );

        setTasks((prevTasks) => ({
          ...prevTasks,
          [activeContainer]: arrayMove(
            prevTasks[activeContainer],
            activeIndex,
            overIndex
          ),
        }));
      } else {
        const activeIndex = tasks[activeContainer].findIndex(
          (task) => task.id === active.id
        );
        const movedTask = tasks[activeContainer][activeIndex];

        setTasks((prevTasks) => ({
          ...prevTasks,
          [activeContainer]: prevTasks[activeContainer].filter(
            (task) => task.id !== active.id
          ),
          [overContainer]: [...prevTasks[overContainer], movedTask],
        }));

        await updateTaskStatus(movedTask.id, overContainer);
      }
    }
  };

  // Function to update task status in the backend
  const updateTaskStatus = async (taskId, newStatus) => {
    //console.log("Update", taskId, newStatus);

    try {
      await axios.patch(
        `https://babelforgeserver.vercel.app/task/tasks/update/${taskId}`,
        {
          tproces: newStatus,
        }
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const getContainer = (taskId) => {
    if (tasks.todo.find((task) => task.id === taskId)) return "todo";
    if (tasks.inProgress.find((task) => task.id === taskId))
      return "inProgress";
    if (tasks.done.find((task) => task.id === taskId)) return "done";
    return null;
  };

  const getActiveTask = (taskId) => {
    return (
      tasks.todo.find((task) => task.id === taskId) ||
      tasks.inProgress.find((task) => task.id === taskId) ||
      tasks.done.find((task) => task.id === taskId)
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">


      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 justify-between">
          <DroppableColumn id="todo" tasks={tasks.todo} title="Todo" key={tasks._id} />
          <DroppableColumn
            id="inProgress"
            tasks={tasks.inProgress}
            title="In Progress"
            key={tasks._id}
          />
          <DroppableColumn id="done" tasks={tasks.done} title="Done" key={tasks._id}/>
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
    <div
      ref={setNodeRef}
      className="bg-gray-50 p-4 rounded-md w-full shadow min-h-[200px] dark:bg-gray-800"
    >
      <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <ul className="space-y-2 min-h-[100px]">
          {tasks.length > 0 ? (
            tasks.map((task) => <Task key={task._id} task={task} />)
          ) : (
            <div className="text-center text-gray-500">No tasks</div>
          )}
        </ul>
      </SortableContext>
    </div>
  );
}
