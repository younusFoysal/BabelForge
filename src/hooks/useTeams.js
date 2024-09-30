import React from 'react';
import useAxiosCommon from "@/lib/axiosCommon";
import {useQuery} from "@tanstack/react-query";

const UseTeams = () => {

    const axiosCommon = useAxiosCommon()

    const { data: teams = [], isLoading, refetch, isError } = useQuery({
        queryKey: ['teamsalldata'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/team/teams`);
            return data;
        },
    });
    //console.log(teams);


    return [teams, isLoading, refetch, isError ]
};

export default UseTeams;