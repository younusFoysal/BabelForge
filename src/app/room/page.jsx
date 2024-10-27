"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useAuth } from "@clerk/nextjs";
import useMeet from "@/hooks/useMeet";
const Meett = () => {
  const { fullName, setFullName } = useMeet();
  const [roomID, setRoomID] = useState("");
  const router = useRouter();
  const { userId } = useAuth();
  useEffect(() => {
    setFullName("");
  }, []);

  return (
    <div>
      <h1>meeting list</h1>
      {/* <MeetingTypeList /> */}
      <div className="flex justify-center items-center w-full h-screen">
        <section className="bg-gray-950 text-white  w-[60%]">
          <div className="mx-auto px-4 py-32 flex-col gap-24 flex items-center">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="bg-gradient-to-r text-white  font-extrabold text-transparent text-5xl">
                Meet
              </h1>

              <div className="flex items-center justify-center gap-4 mt-6">
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setFullName(e.target.value.toString())}
                  className="border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
                  placeholder="Enter your name"
                />
              </div>

              {fullName && fullName.length >= 3 && (
                <>
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <input
                      type="text"
                      id="roomid"
                      value={roomID}
                      onChange={(e) => setRoomID(e.target.value)}
                      className="border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
                      placeholder="Enter room ID to join a meeting"
                    />
                    <button
                      className="rounded-md bg-blue-600 px-10 py-[11px] text-sm font-medium text-white focus:outline-none sm:w-auto"
                      onClick={() => router.push(`/room/${roomID}`)}
                      disabled={!roomID}
                    >
                      Join
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <Link href={`/room/${userId}`} target="_blank">
                      <button
                          className="text-lg font-medium hover:text-blue-400 hover:underline"
                      >
                        Or create a new meeting
                      </button>
                    </Link>

                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Meett;
