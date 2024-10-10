import useAxiosCommon from '@/lib/axiosCommon';
import { useQuery } from '@tanstack/react-query';

const useTrans = () => {
  const axiosCommon = useAxiosCommon();

  const {
    data: trans,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['allTransactions'],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`pay/payments`);
      return data;
    },
  });

  return [trans, isError, refetch, isLoading];
};

export default useTrans;
