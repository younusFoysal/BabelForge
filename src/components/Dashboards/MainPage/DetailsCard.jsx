"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { RiTeamLine } from "react-icons/ri";
import { MdOutlinePendingActions, MdTask } from "react-icons/md";
import { TbUsersGroup } from "react-icons/tb";
import { axiosCommon } from "@/lib/axiosCommon";
import useUsers from "@/hooks/useUsers";
import useTasks from "@/hooks/useTasks";
import useTeams from "@/hooks/useTeams";

const DetailsCard = ({ stats, isLoading }) => {
  const [stat, setStat] = useState(stats);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mb-8 lg:grid-cols-4 gap-5">
      {/* Total Member Card */}
      <Card className="hover:shadow-lg duration-300 dark:bg-gray-800 dark:border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          <TbUsersGroup />
        </CardHeader>
        <CardContent>
          <div className="text-2xl mb-2 font-bold">
            {stat?.totalTeamMembers}
          </div>
          <p className="text-xs text-muted-foreground">
            Shows the total number of registered members in your team
          </p>
        </CardContent>
      </Card>
      {/* Total Team Card */}
      <Card className="hover:shadow-lg duration-300 dark:bg-gray-800 dark:border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total teams</CardTitle>
          <RiTeamLine />
        </CardHeader>
        <CardContent>
          <div className="text-2xl mb-2 font-bold">{stat?.totalTeams}</div>
          <p className="text-xs text-muted-foreground">
            Displays the total number of tasks created .
          </p>
        </CardContent>
      </Card>
      {/* Total Task Card */}
      <Card className="hover:shadow-lg duration-300 dark:bg-gray-800 dark:border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          <MdTask />
        </CardHeader>
        <CardContent>
          <div className="text-2xl mb-2 font-bold">{stat?.totalTasks}</div>
          <p className="text-xs text-muted-foreground">
            Displays the total number of tasks created .
          </p>
        </CardContent>
      </Card>
      {/* Pending Task Card */}
      <Card className="hover:shadow-lg duration-300 dark:bg-gray-800 dark:border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
          <MdOutlinePendingActions />
        </CardHeader>
        <CardContent>
          <div className="text-2xl mb-2 font-bold">{stat?.pendingTasks}</div>
          <p className="text-xs text-muted-foreground">
            Displays the total number of pending tasks.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsCard;
