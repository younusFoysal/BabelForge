import React from 'react';
import useAxiosCommon from "@/lib/axiosCommon";
import {useQuery} from "@tanstack/react-query";

const UseTasks = () => {

    const axiosCommon = useAxiosCommon()

    const { data: tasks = [], isLoading, refetch, isError } = useQuery({
        queryKey: ['tasksalldata'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`task/tasks`);
            return data;
        },
    });


    return [tasks, isLoading, refetch, isError]
};

export default UseTasks;