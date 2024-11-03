"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";

const AuthProvider = ({ children }) => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const handleAuthState = async () => {
      try {
        if (isLoaded && user) {
          const userInfo = { email: user.primaryEmailAddress?.emailAddress };

          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/jwttoken`,
            userInfo,
            { withCredentials: true }
          );

          if (data.token && !localStorage.getItem("access_token")) {
            localStorage.setItem("access_token", data.token);
          }
        } else {
          localStorage.removeItem("access_token");
        }
      } catch (error) {
        console.error("Error fetching the JWT token:", error);
      }
    };

    handleAuthState();
  }, [user, isLoaded]);

  return <>{children}</>;
};

export default AuthProvider;
