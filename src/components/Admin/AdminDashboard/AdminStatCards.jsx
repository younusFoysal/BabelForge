"use client";
import React from "react";
import { LuEye } from "react-icons/lu";
import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";

const AdminStatCards = () => {
  const axiosCommon = useAxiosCommon();

  const { isLoading, data: stats } = useQuery({
    queryKey: ["dashadmin"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`admin/dashboard`);
      return data;
    },
  });

  return (
    <div>
      <div className="mb-6 grid  grid-cols-1 gap-4 text-white sm:grid-cols-2 xl:grid-cols-4">
        <div className="panel  dark:hover:shadow-cyan-500 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-md p-4 shadow-lg hover:shadow-cyan-300 duration-500">
          <div className="flex justify-between">
            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">
              Total Projects
            </div>
          </div>
          <div className="mt-5 flex items-center">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
              {" "}
              {stats?.plen}
            </div>
          </div>
          <div className="mt-5 flex items-center font-semibold">
            <LuEye className="mr-2 shrink-0" />
            Last Week {stats?.lwplen}
          </div>
        </div>

        {/* Sessions */}
        <div className="panel dark:hover:shadow-violet-400 bg-gradient-to-r from-violet-500 to-violet-400 rounded-md p-4 shadow-lg hover:shadow-violet-500 duration-500">
          <div className="flex justify-between">
            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">
              Total Teams
            </div>
          </div>
          <div className="mt-5 flex items-center">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
              {" "}
              {stats?.tmlen}
            </div>
          </div>
          <div className="mt-5 flex items-center font-semibold">
            <LuEye className="mr-2 shrink-0" />
            Last Week {stats?.lwtmlen}
          </div>
        </div>

        {/*  Time On-Site */}
        <div className="panel dark:hover:shadow-blue-500 bg-gradient-to-r from-blue-500 to-blue-400 rounded-md p-4 shadow-lg hover:shadow-blue-300 duration-500">
          <div className="flex justify-between">
            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">
              Total Tasks
            </div>
          </div>
          <div className="mt-5 flex items-center">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
              {" "}
              {stats?.tslen}
            </div>
          </div>
          <div className="mt-5 flex items-center font-semibold">
            <LuEye className="mr-2 shrink-0" />
            Last Week {stats?.lwtslen}
          </div>
        </div>

        {/* Bounce Rate */}
        <div className="panel dark:hover:shadow-fuchsia-500 bg-gradient-to-r from-fuchsia-500 to-fuchsia-400 rounded-md p-4 shadow-lg hover:shadow-fuchsia-300 duration-500">
          <div className="flex justify-between">
            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">
              Total Users
            </div>
          </div>
          <div className="mt-5 flex items-center">
            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
              {" "}
              {stats?.ulen}
            </div>
          </div>
          <div className="mt-5 flex items-center font-semibold">
            <LuEye className="mr-2 shrink-0" />
            Last Week {stats?.lwulen}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatCards;
