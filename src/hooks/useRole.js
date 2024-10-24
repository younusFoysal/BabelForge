import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

const useRole = () => {
  const axiosCommon = useAxiosCommon();
  const { user, isLoaded } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  const { data: role = "", isLoading } = useQuery({
    queryKey: ["role", user, isLoaded],
    enabled: !isLoaded || !!user,
    queryFn: async () => {
      const { data } = await axiosCommon(`api/user/${uemail}`);
      return data.package;
    },
  });

  return [role, isLoading];
};

export default useRole;
