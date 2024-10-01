"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Button = ({ text, className, icon }) => {
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;


  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!user) {
      return toast.error("Login First");
    }


    setLoading(true);
    const loadingToast = toast.loading("Dashboard loading...");

    try {
      await router.push("/dashboard");
      toast.dismiss(loadingToast);
    } catch (error) {
      toast.error("Failed to redirect");
    } finally {
      setLoading(false);
    }
  };

  return (
      <button
          onClick={handleClick}
          className={`px-6 py-3 capitalize bg-primary text-white rounded-3xl transition-all duration-500 text-sm hover:bg-blue-500 flex gap-1 items-center group ${className} dark:bg-gray-50 dark:text-black`}
          disabled={loading}
      >
        <span>{text}</span>
        <span className="group-hover:translate-x-2 duration-500 transition-all">
        {icon}
      </span>
      </button>
  );
};

export default Button;
