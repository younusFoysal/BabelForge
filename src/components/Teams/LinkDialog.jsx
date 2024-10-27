"use client";
import useAxiosCommon from "@/lib/axiosCommon";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

import { FaPlus } from "react-icons/fa6";
import { toast } from "@/hooks/use-toast";

const LinkDialog = ({ id, refetch, index }) => {
  const axiosCommon = useAxiosCommon();
  const [links, setlinks] = useState("");

  const handlesubmit = async () => {
    // Add team member to the project
    const { data } = await axiosCommon.patch(`team/teams/${id}`, {
      addLink: links,
    });

    if (data.result.modifiedCount > 0) {
      refetch();
      toast({
        description: "link added succesfully",
        variant: "success",
      });
    }
  };

  return (
    <Dialog>
      <div className="flex justify-between items-center font-medium bg-gray-50 px-4 mb-2 rounded-sm  w-full dark:bg-gray-800">
        <h3 className="font-semibold">Links</h3>
        <DialogTrigger>
          <span className="bg-gray-50 p-1 hover:bg-gray-100 cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-800">
            <FaPlus></FaPlus>
          </span>
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogTitle className="text-center">Add to Link</DialogTitle>
        <input
          onChange={(e) => setlinks(e.target.value)}
          type="text"
          placeholder="add your link"
          className="w-full rounded-sm px-2 py-3"
        />
        <DialogClose className="flex justify-start">
          <Button onClick={handlesubmit} className="px-6 rounded-md py-2">
            Add
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default LinkDialog;
