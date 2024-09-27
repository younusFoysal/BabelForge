"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { BsThreeDots } from "react-icons/bs";
import { HiExclamationCircle } from "react-icons/hi";
import { FaCheckSquare } from "react-icons/fa";
import TeamDialog from "./TeamDialog";
import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import MemberBox from "./MemberBox";
import LinkDialog from "./LinkDialog";
import LinkBox from "./LinkBox";

const Team = () => {
  const axiosCommon = useAxiosCommon();
  const {
    data: team = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const { data } = await axiosCommon(
        `team/teams/my-teams/morshidul4@gmail.com`
      );
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { members, _id, links } = team[0];

  return (
    <div>
      <div className="h-40 w-full bg-blue-500 flex rounded-md items-center justify-center">
        <div className="text-3xl font-semibold text-white">Team Info</div>
      </div>
      <div className="py-20 flex lg:flex-row flex-col justify-between items-start gap-10 lg:p-0 p-4">
        {/* card left */}
        <div className="lg:w-[50%] w-full ">
          {/* card header user info */}
          <div className="space-y-5 py-10">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold">Team:</span>
              <h3 className="text-3xl font-semibold">Babel</h3>
            </div>
            <div className="flex justify-between item-center gap-2 text-center ">
              <TeamDialog id={_id} refetch={refetch} />
              <span className="hover:bg-gray-300 bg-gray-100  p-2 mb-2 rounded-sm w-10 cursor-pointer">
                <BsThreeDots className="flex flex-col justify-center item-center text-2xl"></BsThreeDots>
              </span>
            </div>
          </div>

          {/* card content */}
          <Card className="p-6">
            <div className="space-y-2 border-b border-gray-200 pb-3">
              <p className="flex justify-between items-center">
                <span className="text-xl font-semibold">Members</span>
                <span>
                  <HiExclamationCircle className="text-xl opacity-50"></HiExclamationCircle>
                </span>
              </p>

              <p>{members?.length} members</p>
            </div>

            <div className="py-3">
              {/* member 1 */}
              <div className="flex items-center gap-4  ">
                <div className="flex w-full p-1 rounded-md group flex-col gap-3">
                  {members?.map((member, index) => (
                    <MemberBox
                      member={member}
                      key={index}
                      id={_id}
                      refetch={refetch}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* card right */}
        <div className="w-full  pt-10 ">
          <h3 className="text-start text-base font-semibold uppercase">
            Team Description
          </h3>

          <Card className="mt-4 space-y-2 p-4">
            <div className="p-2 mb-2 rounded-md space-y-2">
              <div className="flex justify-start items-center gap-3">
                <div>
                  <p className="space-x-3">
                    <span>
                      The BabelForge team consists of skilled developers
                      specializing in frontend technologies like React and
                      Next.js. Focused on delivering seamless user experiences,
                      they combine creativity and technical expertise to build
                      scalable, secure web applications. Their collaborative
                      approach ensures high-quality solutions tailored to meet
                      modern business needs.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Link content */}
          <div className="pt-14 ">
            <LinkDialog id={_id} refetch={refetch} />

            <div className="p-4 ">
              {links?.map((link, index) => (
                <LinkBox
                  key={index}
                  link={link}
                  id={_id}
                  refetch={refetch}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
