import useAxiosCommon from '@/lib/axiosCommon';

import React from 'react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
const MemberBox = ({ member, refetch, id }) => {
  const axiosCommon = useAxiosCommon();
  const [open, setOpen] = React.useState(false);

  const handlesubmit = async () => {
    // Add team member to the project
    const { data } = await axiosCommon.patch(`team/teams/${id}`, {
      removeMember: member,
    });

    if (data.result.modifiedCount > 0) {
      refetch();
      toast({
        description: 'Member deleted successfully',
        variant: 'success',
      });
    }
  };

  const truncatedLink = member.length > 20 ? `${member.substring(0, 20)}...` : member;

  return (
    <div className="flex w-full justify-between rounded-md border px-1 flex-wrap sm:px-4 py-2 items-center dark:bg-[#2e1e47] dark:border-[#3e1878c2]">
      <div className="text-xs sm:text-sm font-medium leading-none flex items-center sm:gap-2 ">
        <Avatar className="mt-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="w-8 h-8 rounded-full object-cover" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-muted-foreground dark:text-white">{truncatedLink}</p>
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
              Remove
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MemberBox;
