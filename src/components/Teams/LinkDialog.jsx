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
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";

const LinkDialog = ({ id, refetch, index }) => {
  const axiosCommon = useAxiosCommon();
  const [links, setlinks] = useState("");

  const handlesubmit = async () => {
    // Add team member to the project
    const { data } = await axiosCommon.patch(`team/teams/${id}`, {
      addLink: links,
    });
    if (data.modifiedCount > 0) {
      refetch();
      toast.success("link added successfully");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex-1 font-medium bg-gray-50  p-3 mb-2 rounded-sm  w-full dark:bg-gray-800">
        <h3 className="flex justify-between items-center font-semibold">
          Links
          <span className="bg-gray-50 p-1 hover:bg-gray-100 cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-800">
            <FaPlus></FaPlus>
          </span>
        </h3>
      </DialogTrigger>
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
