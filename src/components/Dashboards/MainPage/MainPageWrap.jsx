import React, { useEffect } from "react";
import { ExportTeamInfo } from "./ExportTeamInfo";
import DetailsCard from "./DetailsCard";
import { PieCharts } from "./PieCharts";
import TeamInfo from "./TeamInfo";
import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { useUser } from "@clerk/nextjs";
import axios, { Axios } from "axios";

const MainPageWrap = () => {
  const axiosCommon = useAxiosCommon();

  const { user, isLoaded } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;

  const { isLoading, data: stats } = useQuery({
    queryKey: ["dashuser", uemail],

    queryFn: async () => {
      const { data } = await axiosCommon.get(`/dashboard/stat/${uemail}`);
      return data;
    },
    enabled: isLoaded && !!uemail,
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="w-full   md:mt-2">
      <div className="flex gap-9 md:gap-3 mb-10 flex-wrap justify-center md:justify-between items-center">
        <h1 className="font-bold text-3xl  text-[#333] dark:text-white">
          Dashboard
        </h1>
        <ExportTeamInfo stats={stats} isLoading={isLoading} />
      </div>
      {/* Details Card Section Start here */}
      <section>
        <DetailsCard stats={stats} isLoading={isLoading} />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieCharts stats={stats} isLoading={isLoading} />
        <TeamInfo stats={stats} isLoading={isLoading} />
      </section>
    </div>
  );
};

export default MainPageWrap;
