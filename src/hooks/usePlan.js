import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

const usePlan = () => {
  const axiosCommon = useAxiosCommon();
  const { user, isLoaded } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  const { data: plan = "", isLoading } = useQuery({
    queryKey: ["plan", user, isLoaded],

    queryFn: async () => {
      const { data } = await axiosCommon(`api/user/${uemail}`);
      return data.plan;
    },
    enabled: isLoaded && !!uemail,
  });

  return [plan, isLoading];
};

export default usePlan;
