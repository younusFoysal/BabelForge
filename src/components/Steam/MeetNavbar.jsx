"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import Logo from "@/image/Home/babellogo.png";
import { MdDashboard } from "react-icons/md";
import Image from "next/image";
import Button from "../shared/Buttons";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCall, useCalls } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

const SteamNavber = () => {
  const call = useCall();
  const { userId } = useAuth();
  const auth = !!userId;
  const router = useRouter();

  // GoBackButton to navigate with cleanup
  const GoBackButton = async (route) => {
    await call.endCall();
    call.camera.disable();
    call.microphone.disable();
    router.push(route);
    router.refresh();
  };

  return (
    <div className="backdrop-blur-lg bg-transparent border-b border-white/10 fixed w-full top-0 right-0 z-[999]">
      <div className="flex items-center justify-between container max-w-screen-2xl mx-auto px-4 py-4">
        {/* logo */}
        <div
          className="flex gap-1 justify-center items-center cursor-pointer"
          onClick={() => GoBackButton("/")}
        >
          <Image src={Logo} alt="babelforge" className="w-full h-12" />
          <h3 className="text-3xl font-bold text-white">BabelForge</h3>
        </div>

        {/* Desktop Right Menu */}
        <div className="md:flex items-center space-x-4 hidden">
          {auth ? (
            <div className="md:flex items-center space-x-4 mr-4">
              <SignedIn>
                <div className="flex items-center gap-4">
                  <UserButton>
                    <UserButton.MenuItems>
                      <UserButton.Link
                        label="Dashboard"
                        href="/dashboard"
                        labelIcon={<MdDashboard size={15} />}
                      />
                      <UserButton.Action label="manageAccount" />
                      <UserButton.Action label="signOut" />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
              </SignedIn>

              <button
                onClick={() => GoBackButton("/dashboard")}
                className="px-6 py-3 capitalize bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center group dark:bg-gray-50 cursor-pointer"
              >
                <span className="group-hover:translate-x-2 duration-500 transition-all">
                  <ArrowLeft size={20} />
                </span>
                <span>Go Dashboard</span>
              </button>
            </div>
          ) : (
            <>
              <ul className="flex items-start space-x-4">
                <SignedOut>
                  <SignInButton>
                    <button className="transition duration-500 hover:scale-110 relative inline-flex h-11 active:scale-95 overflow-hidden rounded-lg p-[1px] focus:outline-none">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a402a4_0%,#0037bb_50%,#bd5fff_100%)]"></span>
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#0E162A] px-7 text-md font-medium text-white backdrop-blur-3xl gap-2">
                        Login
                      </span>
                    </button>
                  </SignInButton>
                </SignedOut>
              </ul>
              <Button text="Get Started" icon={<ArrowRight size={20} />} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SteamNavber;
