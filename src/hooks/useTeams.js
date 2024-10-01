import useAxiosCommon from '@/lib/axiosCommon';
import { useQuery } from '@tanstack/react-query';

const UseTeams = email => {
  const axiosCommon = useAxiosCommon();

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
        console.log('email there');
        return data;
      } else {
        const { data } = await axiosCommon.get(`/team/teams`);
        console.log('email not there');

        return data;
      }
    },
  });
  //console.log(teams);

  return [teams, isLoading, refetch, isError];
};

export default UseTeams;
