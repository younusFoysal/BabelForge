"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { HiExclamationCircle } from "react-icons/hi";
import TeamDialog from "./TeamDialog";
import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import MemberBox from "./MemberBox";
import LinkDialog from "./LinkDialog";
import LinkBox from "./LinkBox";
import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { Button } from "@/components/ui/button";
import UpdateTeamModal from "./UpdateTeamModal";
import Image from "next/image";
import ImageWithFallback from "../ImageWithFallback";
import teamCover from "@/image/Team/teamCover.jpeg";

const Team = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosCommon = useAxiosCommon();

  const {
    data: team = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["team", id],
    queryFn: async () => {
      const { data } = await axiosCommon(`/team/teams/one-team/${id}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  const { tmembers, _id, links, tpic, tname } = team;

  const handleUpdate = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="h-52 w-full  flex rounded-md items-center justify-center">
        <ImageWithFallback
          fallbackSrc={teamCover}
          height={300}
          width={900}
          src={tpic}
          alt={tname}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Update Button */}
      <div className="flex justify-end mt-4">
        <Button
          onClick={() => handleUpdate()}
          variant="outline"
          className=" bg-gradient-to-r from-blue-600 to-purple-600 rounded-md hover:shadow-purple-200 dark:hover:shadow-purple-800 text-white hover:text-white transition-all duration-500 hover:scale-105"
        >
          Update Team
        </Button>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <UpdateTeamModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          team={team}
          refetch={refetch}
        />
      )}

      <div className="py-20 flex lg:flex-row flex-col justify-between items-start gap-10 lg:p-0 p-4">
        {/* card left */}
        <div className="lg:w-[50%] w-full ">
          {/* card header user info */}
          <div className="space-y-3 py-10">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-semibold">Team:</span>
              <h3 className="text-3xl font-semibold">{team?.tname}</h3>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-semibold">Category:</span>
              <h3 className="text-base capitalize font-semibold">
                {team?.tcategory}
              </h3>
            </div>
            <div className="flex justify-between item-center gap-2 text-center dark:bg-gray-800">
              <TeamDialog id={_id} refetch={refetch} />
            </div>
          </div>

          {/* card content */}
          <Card className="p-6 dark:bg-[#181024] dark:border-[#3e1878c2]">
            <div className="space-y-2 border-b border-gray-200 pb-3">
              <p className="flex justify-between items-center">
                <span className="text-xl font-semibold">Members</span>
                <span>
                  <HiExclamationCircle className="text-xl opacity-50"></HiExclamationCircle>
                </span>
              </p>

              <p>{tmembers?.length} members</p>
            </div>

            <div className="py-3">
              {/* member 1 */}
              <div className="flex items-center gap-4  ">
                <div className="flex w-full p-1 rounded-md group flex-col gap-3">
                  {tmembers?.map((member, index) => (
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

          <Card className="mt-4 space-y-2 p-4 ">
            <div className="p-2 mb-2 rounded-md space-y-2">
              <div className="flex justify-start items-center gap-3">
                <div>
                  <p className="space-x-3">
                    <span>{team?.tdes}</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Link content */}
          <div className="pt-14 ">
            <LinkDialog id={_id} refetch={refetch} />

            <div className="">
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
