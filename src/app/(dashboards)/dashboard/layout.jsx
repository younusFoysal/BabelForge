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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CgList } from "react-icons/cg";
import {IoHomeOutline, IoMailUnread, IoMailUnreadOutline} from "react-icons/io5";
import {MdDashboard, MdOutlineGroups, MdPostAdd} from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { FiInbox } from "react-icons/fi";
import {FaListUl, FaRegStar} from "react-icons/fa";
import {BiSolidOffer} from "react-icons/bi";
import {RxDashboard} from "react-icons/rx";
import {FaStar} from "react-icons/fa6";


const layout = ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const session = useSession();
  const uemail = session?.data?.user?.email;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  //console.log("user",session?.data?.user);

  // if (!session?.data?.user) {
  //   return router.push("/");
  // }



  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 dark:text-white">
      {/* sidebar drawer small device */}
      <div className="lg:hidden p-0">
        <Drawer>
          <DrawerTrigger asChild>
            <div className="fixed bg-primary bg-opacity-20 dark:text-black text-white rounded-full ml-1 ">
              <Button variant="ghost">
                <span className="flex justify-start  items-center dark:text-black gap-2 text-white">
                  open sidebar
                  <IoIosArrowDropupCircle className="text-3xl dark:text-black text-white"></IoIosArrowDropupCircle>
                </span>
              </Button>
            </div>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerClose>
              <Button className="bg-primary rounded-full " variant="ghost">
                <span className="flex justify-start  items-center gap-2 dark:text-black text-white ">
                  Close
                  <IoIosArrowDropdownCircle className="text-3xl dark:text-black  text-white"></IoIosArrowDropdownCircle>
                </span>
              </Button>
            </DrawerClose>
            <div className="flex justify-start items-center">
              <DrawerHeader>

                <Link href={"/dashboard"}>
                  <h2 className="text-2xl text-primary font-bold">Dashboard</h2>
                </Link>


              </DrawerHeader>
            </div>

            {/* Sidebar content mobile  */}
            <div className="p-4">
              <ul>
                <li>
                  <Link href={"/"} className="py-2 flex items-center  gap-2">
                    <IoHomeOutline /> Home
                  </Link>
                </li>

                <li>
                  <Link href={"/dashboard/projects"} className="py-2 flex items-center gap-2">
                    {" "}
                    <GoProjectSymlink /> Project
                  </Link>
                </li>

                <li>
                  <Link href={"/dashboard/teams"} className="py-2  flex items-center gap-2">
                    {" "}
                    <MdOutlineGroups /> Teams
                  </Link>
                </li>

                <li>
                  <Link href={"/dashboard/chat"} className="py-2  flex items-center gap-2">
                    {" "}
                    <HiOutlineChatAlt2 /> Group Chat
                  </Link>
                </li>

                <li>
                  <Link
                    href={"/dashboard/Backlog"}
                    className="py-2 flex items-center gap-2 "
                  >
                    <MdPostAdd /> Backlog
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/dashboard/board"}
                    className="py-2 flex items-center gap-2 "
                  >
                    <CgList />
                    Boards
                  </Link>
                </li>
              </ul>
            </div>




          </DrawerContent>
        </Drawer>
      </div>

      {/* Sidebar drawer large device*/}

      {uemail === "admin@admin.com" ? (
          <div className="hidden lg:block lg:w-48 bg-base-300 text-black dark:text-white p-4 border-r-2 dark:border-r-gray-800">
            {/*<h2 className="text-2xl font-bold">Dashboard</h2>*/}
            <ul>
              <li>
                <Link href={"/dashboard"} className="py-2 ml-4 flex items-center gap-2">
                  {" "}
                  <MdDashboard  /> Dashboard
                </Link>
              </li>


              <li>
                <Link
                    href={"/dashboard/Backlog"}
                    className="py-2 ml-4 flex items-center gap-2"
                >
                  {" "}
                  <FaListUl /> Transactions
                </Link>
              </li>
              <li>
                <Link
                    href={"/dashboard/admin/packages"}
                    className="py-2 ml-4 flex items-center gap-2"
                >
                  <BiSolidOffer />
                  Packages
                </Link>
              </li>
              <li>
                <Link
                    href={"/dashboard/admin/inbox"}
                    className="py-2 ml-4 flex items-center gap-2"
                >
                  <IoMailUnread  />
                  Inbox
                </Link>
              </li>

              <li>
                <Link
                    href={"/dashboard/admin/reviews"}
                    className="py-2 ml-4 flex items-center gap-2"
                >
                  <FaStar  />
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
      ) : (
          <div
              className="hidden lg:block lg:w-48 bg-base-300 text-black dark:text-white p-4 border-r-2 dark:border-r-gray-800">
            {/*<h2 className="text-2xl font-bold">Dashboard</h2>*/}
            <ul>
              <li>
                <Link href={"/"} className="py-2 ml-4 flex items-center gap-2">
                  {" "}
                  <IoHomeOutline/> Home
                </Link>
              </li>


              <li>
                <Link
                    href={"/dashboard/Backlog"}
                    className="py-2 ml-4 flex items-center gap-2"
                >
                  {" "}
                  <MdPostAdd/> Backlogs
                </Link>
              </li>
              <li>
                <Link
                    href={"/dashboard/board"}
                    className="py-2 ml-4 flex items-center gap-2"
                >
                  <CgList/>
                  Boards
                </Link>
              </li>
            </ul>
          </div>
      )}


      {/*layout content  */}
      <div className="lg:p-6 pt-10 w-full">{children}</div>
    </div>
  );
};

export default layout;
