"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";

const AuthProvider = ({ children }) => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const handleAuthState = async () => {
      if (user) {
        const userInfo = { email: user?.primaryEmailAddress?.emailAddress };
        const { data } = await axios.post(
          "http://localhost:5000/api/jwttoken",
          userInfo,
          {
            withCredentials: true,
          }
        );
        console.log(data);

        if (data.token) {
          if (!localStorage.getItem("access_token")) {
            localStorage.setItem("access_token", data.token);
          }
        }
      }
      if (!user || !isLoaded) {
        localStorage.removeItem("access_token");
        return;
      }
    };

    handleAuthState();
  }, [user, isLoaded]);

  return <div>{children}</div>;
};

export default AuthProvider;
