import useAxiosCommon from '@/lib/axiosCommon';
import { useQuery } from '@tanstack/react-query';

const usePerson = (email) => {
    // console.log(email);
    const axiosCommon = useAxiosCommon();
    const { data: person = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['person', email],
        queryFn: async () => {
            const data = await axiosCommon.get(`/api/user/${email}`)
            return data;
        }
    })
    return [person, isLoading, isError, refetch];
};

export default usePerson;