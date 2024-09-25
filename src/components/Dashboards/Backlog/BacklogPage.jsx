"use client"
import React, {useEffect, useState} from 'react';
import TableView from "@/components/Dashboards/Backlog/TableView";
import CardGridView from "@/components/Dashboards/Backlog/CardGridView";
import toast from "react-hot-toast";

import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosCommon from "@/lib/axiosCommon";
import axios from "axios";

const BacklogPage = () => {

    const [tasks, setTasks] = useState([]);

    const [isTableView, setIsTableView] = useState(true);
    const axiosCommon = useAxiosCommon()


    // const { data: tasks = [], isLoading, refetch } = useQuery({
    //     queryKey: ['verified-employee'],
    //     queryFn: async () => {
    //         const { data } = await axiosCommon.get(`/task/tasks`);
    //         return data;
    //     },
    //
    //
    // });

    useEffect(() => {
        // Fetch tasks from the API when the component mounts
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/task/tasks');
                const tasks = response.data;




                setTasks(tasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [tasks]);



    return (
        <div>
            <div className="flex flex-col gap-4 justify-center items-center w-full h-full px-3 md:px-0">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={() => setIsTableView(!isTableView)}
                >
                    {isTableView ? "Switch to Card View" : "Switch to Table View"}
                </button>
                <div className="shadow-lg rounded-lg overflow-hidden m-3 md:mx-4 w-full">
                    {isTableView ? (
                        <TableView
                            tasks={tasks}
                        />
                    ) : (
                        <CardGridView
                            tasks={tasks}

                        />
                    )}
                </div>
            </div>

        </div>
    );
};

export default BacklogPage;