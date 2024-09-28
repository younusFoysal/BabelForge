"use client";
import { signIn, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import Googleicon from "@/image/icon/google.png";

export const SocialButton = () => {
  const session = useSession();
  const router = useRouter();

  const handlesocail = async (provider) => {
    const resp = await signIn(provider, {
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <button
      onClick={() => handlesocail("google")}
      type="submit"
      className="w-full text-center rounded bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-200 text-[14px] py-2 dark:text-white dark:hover:bg-gray-800 duration-300 transition-all"
    >
      Continue With Google
    </button>
  );
};
