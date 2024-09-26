import useAxiosCommon from "@/lib/axiosCommon";

import React from "react";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
const MemberBox = ({ member, refetch, id }) => {
  const axiosCommon = useAxiosCommon();
  const [open, setOpen] = React.useState(false);

  const handlesubmit = async () => {
    // Add team member to the project
    const { data } = await axiosCommon.patch(`team/teams/${id}`, {
      removeMember: member,
    });

    if (data.modifiedCount > 0) {
      refetch();

      toast.success("deleted member successfully");
    }
  };

  return (
    <div className="flex w-full justify-between rounded-md border px-4 py-2 items-center">
      <div className="text-sm font-medium leading-none flex items-center gap-2  ">
        <Avatar className="mt-2">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="w-8 h-8 rounded-full object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-muted-foreground">{member}</p>
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
              leave team
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MemberBox;
