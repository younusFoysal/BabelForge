import useAxiosCommon from '@/lib/axiosCommon';
import { useQuery } from '@tanstack/react-query';

const usePerson = (email) => {
    // console.log("The email: ", email);
    const axiosCommon = useAxiosCommon();
    const { data: person = [], isLoading: isUserLoading, isError, refetch } = useQuery({
        queryKey: ['person', email],
        queryFn: async () => {
            if (!email)
                return;
            const data = await axiosCommon.get(`/api/user/${email}`)
            return data;
        }
    })
    return [person, isUserLoading, isError, refetch];
};

export default usePerson;