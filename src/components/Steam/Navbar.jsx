import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const SteamNavber = () => {
  return (
    <header className="shadow">
      <div className="mx-auto  max-w-5xl flex justify-between py-3">
        <Link href="/">Newmetting</Link>
        <div>
          <SignedIn>
            <div className="flex items-center gap-4">
              <Link
                href="/meetings"
                className="bg-blue-500 rounded-sm text-white px-4 py-2 "
              >
                metting
              </Link>
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default SteamNavber;
