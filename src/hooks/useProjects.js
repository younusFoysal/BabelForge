import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";

const useProjects = (email) => {
    console.log(email);

    const axiosCommon = useAxiosCommon();

    const { data: projects = [], isLoading, isError, refetch } = useQuery({

        queryKey: ['all-projects', email],
        queryFn: async () => {
            if (email) {
                const { data } = await axiosCommon.get(`/project/projects/my-projects/${email}`);
                return data;
            }
            else {
                const { data } = await axiosCommon.get('/project/projects');
                return data;
            }

        }
    })

    return [projects, isLoading, isError, refetch]
};

export default useProjects;