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
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    axiosCommon.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    axiosCommon.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!isLoaded) {
          if (error.response) {
            const status = error.response.status;
            if ((status === 401 || status === 403) && user && isLoaded) {
              toast({
                description: "Unauthorized access",
                variant: "error",
              });
            }
          }
        }

        return Promise.reject(error);
        r;
      }
    );
  }, [isLoaded, isSignedIn, user, signOut]);

  return axiosCommon;
};

export default useAxiosCommon;
