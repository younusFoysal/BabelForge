"use client";
import useAxiosCommon from "@/lib/axiosCommon";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TeamDialog = () => {
  const axiosCommon = useAxiosCommon();
  const [teamMembers, setTeamMembers] = useState();

  const handlesubmit = () => {};

  return (
    <>
      <Dialog>
        <DialogTrigger className="flex-1 font-medium hover:bg-gray-300 bg-gray-100  p-2 mb-2 rounded-sm ">
          Add People
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add to Team member</DialogTitle>
          <p className="mb-2">
            Grow your team and work better together. Adding people to this team
            gives them access to all the team’s work. Learn more about teams.
          </p>
          <input
            onChange={(e) => setTeamMembers(e.target.value)}
            type="text"
            placeholder="add member"
            className="w-full rounded-sm px-2 py-3"
          />
        </DialogContent>
      </Dialog>
      ;
    </>
  );
};

export default TeamDialog;
