import React from 'react';
import useAxiosCommon from "@/lib/axiosCommon";
import {useQuery} from "@tanstack/react-query";

const UseUsers = () => {

    const axiosCommon = useAxiosCommon()

    const { data: users = [], isLoading, refetch, isError } = useQuery({
        queryKey: ['usersalldata'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`api/users`);
            return data;
        },
    });
    //console.log(users);


    return [users, isLoading, refetch, isError ]
};

export default UseUsers;