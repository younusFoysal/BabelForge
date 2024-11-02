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
import { Input } from "../ui/input";

const LinkDialog = ({ id, refetch, index }) => {
  const axiosCommon = useAxiosCommon();
  const [links, setlinks] = useState(null);

  const handlesubmit = async () => {
    if (links === null) {
      toast({
        description: "Invalid link",
        variant: "error",
      });
      return;
    }
    const { data } = await axiosCommon.patch(`team/teams/${id}`, {
      addLink: links,
    });

    if (data.result.modifiedCount > 0) {
      refetch();
      toast({
        description: "link added succesfully",
        variant: "success",
      });
      setlinks(null);
    }
  };

  return (
    <Dialog>
      <div className="flex justify-between dark:border dark:border-[#3e1878c2] items-center font-medium bg-gray-50 px-4  rounded-sm  w-full dark:bg-[#181024] mb-3">
        <h3 className="font-semibold">Links</h3>
        <DialogTrigger>
          <span className="p-1 cursor-pointer ">
            <FaPlus></FaPlus>
          </span>
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogTitle className="text-center">Add to Link</DialogTitle>
        <Input
          onChange={(e) => setlinks(e.target.value)}
          type="text"
          placeholder="Add your links"
          className="w-full rounded-sm px-2 py-3"
        />
        <DialogClose className="flex justify-start">
          <Button
            onClick={handlesubmit}
            className="px-6 w-full rounded-md py-2"
          >
            Add
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default LinkDialog;
