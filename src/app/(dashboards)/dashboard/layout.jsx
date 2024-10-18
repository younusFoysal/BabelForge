"use client";

import Link from "next/link";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CgList } from "react-icons/cg";
import {
  IoHomeOutline,
  IoMailUnread,
  IoMailUnreadOutline,
} from "react-icons/io5";
import { MdDashboard, MdOutlineGroups, MdPostAdd } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { FiInbox } from "react-icons/fi";
import { FaListUl, FaRegStar } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FaStar } from "react-icons/fa6";
import { useUser } from "@clerk/nextjs";
import SideBar from "@/components/Siderbar/Sidebar";

const layout = ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  // foysal@gmail.com

  const admin = ["babelforgeltd@gmail.com", "babelforgeltdfgd@gmail.com"];

  return (
    <div className="flex bg-white dark:bg-gray-900 dark:text-white relative">
      <div className="fixed top-0 left-0">
        <SideBar />
      </div>
      <div className=" w-[96%] pl-16 py-3">{children}</div>
    </div>
  );
};

export default layout;
