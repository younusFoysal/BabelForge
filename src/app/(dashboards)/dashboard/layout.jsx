'use client';

import Link from 'next/link';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTrigger } from '@/components/ui/drawer';
import { CgList } from 'react-icons/cg';
import { IoHomeOutline, IoMailUnread, IoMailUnreadOutline } from 'react-icons/io5';
import { MdDashboard, MdOutlineGroups, MdPostAdd } from 'react-icons/md';
import { GoProjectSymlink } from 'react-icons/go';
import { HiOutlineChatAlt2 } from 'react-icons/hi';
import { FiInbox } from 'react-icons/fi';
import { FaListUl, FaRegStar } from 'react-icons/fa';
import { BiSolidOffer } from 'react-icons/bi';
import { RxDashboard } from 'react-icons/rx';
import { FaStar } from 'react-icons/fa6';
import { UserButton, useUser } from '@clerk/nextjs';
import SideBar from '@/components/Siderbar/Sidebar';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ModeToggle } from '@/components/Theme/ModeToggle';
import { useRecording } from '@/providers/ScreenRecorderProvider';

const layout = ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  // foysal@gmail.com

  const admin = ['babelforgeltd@gmail.com', 'babelforgeltdfgd@gmail.com'];

  const isAdmin = admin.includes(uemail);

  const conditionClass = isAdmin ? '' : 'h-screen';

  return (
    <SidebarProvider>
      <AppSidebar className="bg-[#f7f8f9] dark:bg-[#151e30] dark:text-[#d4d4d4] text-[#34383e]" />
      <div className="bg-white w-full dark:bg-gray-900 dark:text-white relative">
        <main className="relative">
          {/* Dashboard Top */}
          <div className="flex  sticky backdrop-blur-[100px] border-b border-b-[#00000014] top-0 w-full px-5 py-[14px] justify-between items-center">
            <SidebarTrigger />
            <div className="flex items-center gap-3">
              <ModeToggle />
              <UserButton />
            </div>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default layout;
