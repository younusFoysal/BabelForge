'use client';
import useAxiosCommon from '@/lib/axiosCommon';
import { useQuery } from '@tanstack/react-query';

const useCalendarEvents = (email) => {
    const axiosCommon = useAxiosCommon();

    const queryResult = useQuery({
        queryKey: ['calendarEvents', email],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/task/tasks/my-tasks/${email}`);
            // console.log(data);
            return data;
        },
    });

    return queryResult;
};

export default useCalendarEvents;
