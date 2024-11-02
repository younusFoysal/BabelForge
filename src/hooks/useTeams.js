import useAxiosCommon from '@/lib/axiosCommon';
import { useQuery } from '@tanstack/react-query';

const UseTeams = email => {
  const axiosCommon = useAxiosCommon();
  //console.log(email);
  const {
    data: teams = [],
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ['teamsalldata'],
    queryFn: async () => {
      if (email) {
        const { data } = await axiosCommon.get(`/team/teams/my-teams/${email}`);
        return data;
      }
    },
  });
  return [teams, isLoading, refetch, isError];
};

export default UseTeams;
