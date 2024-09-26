import useAxiosCommon from "@/lib/axiosCommon";
import { Link2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa6";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { MoreHorizontal } from "lucide-react";
const LinkBox = ({ id, refetch, link }) => {
  const axiosCommon = useAxiosCommon();
  const [open, setOpen] = React.useState(false);
  const handlesubmit = async () => {
    // Add team member to the project
    const { data } = await axiosCommon.patch(`team/teams/${id}`, {
      removeLink: link,
    });

    if (data.modifiedCount > 0) {
      refetch();

      toast.success("remove link successfully");
    }
  };

  return (
    <div className="flex w-full  items-start justify-between rounded-md border px-4 py-2 mb-3">
      <div className="text-sm font-medium leading-none flex items-center gap-3">
        <span className="mt-1">
          {" "}
          <Link2 />{" "}
        </span>
        <Link href={link} className="hover:underline">
          {link}
        </Link>
      </div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[100px] mt-1">
          <DropdownMenuGroup>
            <DropdownMenuItem className="capitalize" onClick={handlesubmit}>
              Remove Link
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LinkBox;
