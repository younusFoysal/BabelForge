"use client";
import useAxiosCommon from "@/lib/axiosCommon";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { DialogClose } from "@radix-ui/react-dialog";

const TeamDialog = ({ id, refetch }) => {
  const axiosCommon = useAxiosCommon();
  const [teamMembers, setTeamMembers] = useState();

  const handlesubmit = async (e) => {
    e.preventDefault();
    // Add team member to the project
    const { data } = await axiosCommon.patch(`team/teams/${id}`, {
      addMember: teamMembers,
    });
    if (data.modifiedCount > 0) {
      refetch();
      toast.success("Member added successfully!");
    }
  };

  //console.log(teamMembers, id);
  return (
    <>
      <Dialog>
        <DialogTrigger className="flex-1 font-medium hover:bg-gray-300 bg-gray-100  p-2 mb-2 rounded-sm dark:bg-gray-800">
          Add Member
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add to Team member</DialogTitle>
          <p className="mb-2">
            Grow your team and work better together. Adding people to this team
            gives them access to all the team’s work. Learn more about teams.
          </p>
          <form onSubmit={handlesubmit}>
            <input
              onChange={(e) => setTeamMembers(e.target.value)}
              type="email"
              placeholder="add member"
              className="w-full rounded-sm px-2 py-3 border border-gray-50 focus:border-gray-200"
              required
            />

            <Button type="submit" className="px-6 rounded-md py-2 mt-3">
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamDialog;
