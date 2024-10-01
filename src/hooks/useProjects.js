"use client"
import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";

const useProjects = (email, search, category) => {

    // console.log("from hook", email, search, category);

    const axiosCommon = useAxiosCommon();

    const { data: projects = [], isLoading, isError, refetch } = useQuery({

        queryKey: ['allProjects', email, search, category],
        queryFn: async () => {
            if (search || category) {
                const { data } = await axiosCommon.get(`/project/projects?name=${search}&category=${category}&email=${email}`);
                return data;
            }
            else {
                const { data } = await axiosCommon.get(`/project/projects/my-projects/${email}`);
                return data;
            }

        },
        enabled: !!email,
    })

    return [projects, refetch, isLoading, isError]
};

export default useProjects;