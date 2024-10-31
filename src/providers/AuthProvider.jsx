"use client";

import useAxiosCommon from "@/lib/axiosCommon";
import { useAuth, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthState = async () => {
      if (isSignedIn) {
        const token = await getToken({ template: "my-template" }); // Use your custom token template if needed
        localStorage.setItem("access_token", token);
        setLoading(false);

        // Save user info if necessary
        const userInfo = { email: user.primaryEmailAddress?.emailAddress };
        await axios.post("/api/jwt", userInfo, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        localStorage.removeItem("access_token");
        setLoading(false);
      }
    };

    handleAuthState();
  }, [isSignedIn, getToken, user]);

  return <div>{children}</div>;
};

export default AuthProvider;
