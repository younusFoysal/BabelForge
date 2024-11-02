"use client";
import UseUsers from "@/hooks/useUsers";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";
import usericon from "@/image/icon/user.png";
import noData from "@/image/Team/no-data.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageWithFallback from "../ImageWithFallback";
import teamPhoto from "@/image/Team/team.jpg";

const AllTeams = ({ teams, isLoading: loadingTeams, searchQuery }) => {
  const [filteredTeams, setFilteredTeams] = useState(teams);
  const [searchText, setSearchText] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [users, isLoadingUsers] = UseUsers();
  const router = useRouter();

  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  const categories = useMemo(() => {
    if (teams && teams.length > 0) {
      return ["All", ...new Set(teams.map((item) => item.tcategory))];
    }
    return [];
  }, [teams]);

  // Filter teams by search text and selected category
  useEffect(() => {
    let filtered = teams;

    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item?.tname?.toLowerCase().includes(lowerSearchText) ||
          item?.tcategory?.toLowerCase().includes(lowerSearchText)
      );
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (item) => item?.tcategory === selectedCategory
      );
    }
    setFilteredTeams(filtered);
  }, [searchText, selectedCategory, teams]);

  if (loadingTeams || isLoadingUsers) return <div>Loading...</div>;

  if (filteredTeams.length < 1) {
    return (
      <div className="flex flex-col justify-center items-center mt-7 py-16">
        <Image
          className="w-[300px] h-auto"
          src={noData}
          alt="No data"
          height={100}
          width={100}
        />
        <p className="text-3xl  mt-7">No data! </p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      {/* Team category */}
      <div className="flex justify-end mb-8">
        <div className="flex items-center gap-4">
          <p>Category :</p>
          <Select onValueChange={setSelectedCategory} defaultValue="All">
            <SelectTrigger className="w-[180px] ">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="backdrop-blur-[30px]">
              <SelectGroup>
                {categories?.map((item) => (
                  <SelectItem key={item} value={item}>
                    <span className="capitalize">{item}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Display teams */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredTeams?.map(
          ({ tname, tpic, _id, tcategory, tleader, tmembers }) => (
            <Card
              onClick={() => router.push(`/dashboard/teams/${_id}`)}
              key={_id}
              className="border dark:hover:shadow-[#3e1878c2] hover:dark:border-[#3e1878] hover:dark:bg-[#200e3be2] dark:border-[#3e1878c2] dark:bg-[#181024] hover:shadow-lg dark:hover:shadow-2xl cursor-pointer duration-300 rounded-2xl"
            >
              <ImageWithFallback
                className="w-[95px] mx-auto h-[95px] mt-6 rounded-full object-cover"
                alt={tname}
                width={80}
                height={80}
                src={tpic}
                fallbackSrc={teamPhoto}
              />
              <div className="p-5">
                <h3 className="text-center text-[18px] capitalize">{tname}</h3>
                <p className="text-[14px] dark:text-white my-1 text-[#666] font-light text-center capitalize">
                  Leader:{" "}
                  {users?.find((user) => user.email === tleader)?.firstName ||
                    "Unknown"}
                </p>
                <p className="text-[14px] font-semibold mb-3 text-center capitalize">
                  {tcategory}
                </p>

                {/* Team members */}
                <div className="flex dark:border-[#3e1878c2] dark:border dark:bg-[#2b2b51] mr-3 bg-[#f0f0f072] py-2 rounded-3xl cursor-pointer items-center justify-center">
                  {tmembers?.slice(0, 3).map((member, index) => {
                    const memberDetails = users?.find(
                      (user) => user.email === member
                    );
                    return (
                      <HoverCard key={index}>
                        <HoverCardTrigger className="w-9 -mr-3 border-[#fff] dark:border-[#3e1878] border-[4px] h-9 rounded-full">
                          <Image
                            className="w-full h-full object-cover rounded-full"
                            alt={memberDetails?.firstName || "Member"}
                            width={40}
                            height={40}
                            src={memberDetails?.image_url || usericon}
                          />
                        </HoverCardTrigger>
                        <HoverCardContent className="gap-4 backdrop-blur-[30px] bg-[#ffffff30] h-[80px] w-[250px]">
                          <div className="flex h-full items-center gap-4">
                            <Image
                              className="w-12 h-12 border-[#3e1878c2] border-4 object-cover rounded-full"
                              alt={memberDetails?.firstName || "Member"}
                              width={50}
                              height={50}
                              src={memberDetails?.image_url || usericon}
                            />
                            <p>{memberDetails?.firstName || "Unknown"}</p>
                          </div>
                          {/* <button className=" capitalize bg-gradient-to-r from-blue-600 to-purple-600  hover:shadow-purple-200 dark:hover:shadow-purple-800 dark:text-white px-3 py-1 rounded-sm text-[13px] ml-auto flex items-center gap-3 justify-end text-white">
                          <span>Send Message</span>
                          <FaTelegramPlane />
                        </button> */}
                        </HoverCardContent>
                      </HoverCard>
                    );
                  })}
                  {tmembers?.length > 3 && (
                    <div className="flex text-[12px] dark:border-[#3e1878] dark:bg-[#5b319a] dark:text-white bg-[#ddddde] border-[#fff] border-[4px] w-9 h-9 rounded-full items-center justify-center text-[#333]">
                      +{tmembers.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default AllTeams;
