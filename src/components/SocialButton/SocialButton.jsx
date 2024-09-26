"use client";
import { signIn, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import Googleicon from "@/image/icon/google.png";

export const SocialButton = () => {
  const session = useSession();
  const router = useRouter();

  const handlesocail = (provider) => {
    const resp = signIn(provider, { redirect: false });
  };

  if (session.status == "authenticated") {
    router.push("/dashboard");
  }

  return (
    <button
      onClick={() => handlesocail("google")}
      type="submit"
      className="w-full text-center rounded bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-200 text-[14px] py-2"
    >
      Continue With Google
    </button>
  );
};
