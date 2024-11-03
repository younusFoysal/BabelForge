import { useUser } from "@clerk/nextjs";
import axios from "axios";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { toast } from "@/hooks/use-toast";
export const axiosCommon = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const useAxiosCommon = () => {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  useEffect(() => {
    axiosCommon.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("access_token");

        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // response
    axiosCommon.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        toast({
          description: "Unauthorized access",
          variant: "error",
        });

        if (error.status == 401 || error.status == 403) {
          signOut({ redirectUrl: "/" });
        }
        return Promise.reject(error);
      }
    );
  }, [user, isLoaded]);
  return axiosCommon;
};

export default useAxiosCommon;
