import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

const useRole = () => {
  const axiosCommon = useAxiosCommon();
  const { user, isLoaded } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  const { data: role = "", isLoading: roleLoading } = useQuery({
    queryKey: ["role", user, isLoaded],
    queryFn: async () => {
      const { data } = await axiosCommon(`api/user/${uemail}`);
      return data.role;
    },
    enabled: isLoaded && !!user,
  });

  return [role, roleLoading];
};

export default useRole;
