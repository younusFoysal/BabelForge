"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {useSession} from "next-auth/react";
import toast from "react-hot-toast";

const Button = ({ text, className, icon }) => {
  const router = useRouter();
  const session = useSession();

  const handleClick = () => {


    if (!session?.data?.user){
      return toast.error("Login First")
    }

    router.push("/dashboard");

  };
  return (
    <button
      onClick={handleClick}
      className={`px-6 py-3 capitalize bg-primary text-white rounded-3xl transition-all duration-500 text-sm hover:bg-blue-500 flex gap-1 items-center group ${className}`}
    >
      <span>{text}</span>
      <span className="group-hover:translate-x-2 duration-500 transition-all">
        {icon}
      </span>
    </button>
  );
};

export default Button;
