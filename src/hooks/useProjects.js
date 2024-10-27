'use client';
import useAxiosCommon from '@/lib/axiosCommon';
import { useQuery } from '@tanstack/react-query';

const useProjects = (email, search, category) => {
  const axiosCommon = useAxiosCommon();

  const queryResult = useQuery({
    queryKey: ['allProjects', email, search, category],
    queryFn: async () => {
      if ((search || category) && category !== 'All') {
        const { data } = await axiosCommon.get(`/project/projects?name=${search}&category=${category}&email=${email}`);
        return data;
      } else {
        const { data } = await axiosCommon.get(`/project/projects/my-projects?name=${search}&email=${email}`);
        return data;
      }
    },
    enabled: !!email,
  });

  return queryResult;
};

export default useProjects;
