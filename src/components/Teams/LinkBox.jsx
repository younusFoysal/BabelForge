import useAxiosCommon from "@/lib/axiosCommon";
import { Link2 } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LinkBox = ({ id, refetch, link }) => {
  const axiosCommon = useAxiosCommon();
  const [open, setOpen] = React.useState(false);

  const handlesubmit = async () => {
    const { data } = await axiosCommon.patch(`team/teams/${id}`, {
      removeLink: link,
    });

    if (data.result.modifiedCount > 0) {
      refetch();
      toast({
        description: "Remove link successfully",
        variant: "success",
      });
    }
  };

  // Truncate link if it exceeds 20 characters
  const BigtruncatedLink =
    link.length > 70 ? `${link.substring(0, 70)}...` : link;
  const SmtruncatedLink =
    link.length > 20 ? `${link.substring(0, 20)}...` : link;

  return (
    <div className="flex w-full items-start justify-between rounded-md border px-4 py-2 mb-3 dark:bg-[#181024] dark:border-[#3e1878c2]">
      <div className="text-sm font-medium leading-none flex items-center gap-3">
        <span className="mt-1">
          <Link2 />
        </span>
        <Link href={link} className="hover:underline" target="_blank">
          <span className="block sm:hidden">{SmtruncatedLink}</span>
          <span className="hidden sm:block">{BigtruncatedLink}</span>
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
