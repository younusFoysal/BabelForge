"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from "@/components/Dashboards/Task/AddTask";
import BacklogPage from "@/components/Dashboards/Backlog/BacklogPage";
import useTasks from "@/hooks/useTasks";

const Page = () => {





    const addTask = async (taskName) => {
        try {
            const newTask = {
                tname: taskName,
                tproces: 'todo',
                author: 'Foysal',
            };

            const response = await axios.post('https://babelforgeserver.vercel.app/task/tasks/add', newTask);

            if (response.status === 200) {
                setTasks((prevTasks) => [...prevTasks, response.data]); // Add the new task to the list
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };



    return (
        <div>
            <div className="w-full">

                {/* AddTask Component */}
                <AddTask addTask={addTask}/>

                {/*<ul>*/}
                {/*    {tasks.map((task) => (*/}
                {/*        <li key={task._id}>{task.tname}</li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
                <BacklogPage></BacklogPage>
            </div>

        </div>
    );
};

export default Page;