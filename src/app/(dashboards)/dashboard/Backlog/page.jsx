"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from "@/components/Dashboards/Task/AddTask";
import BacklogPage from "@/components/Dashboards/Backlog/BacklogPage";

const Page = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from the API when the component mounts
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/task/tasks');
                setTasks(response.data); // Store the tasks from the backend
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const addTask = async (taskName) => {
        try {
            const newTask = {
                tname: taskName,
                tproces: 'todo',
                author: 'Foysal',
            };

            const response = await axios.post('http://localhost:5000/task/tasks/add', newTask);

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