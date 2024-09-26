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
import { IoHomeOutline } from "react-icons/io5";
import { MdPostAdd } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const layout = ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const session = useSession();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  if (!session?.data?.user) {
    return router.push("/");
  }

  return (
      <div className="flex min-h-screen bg-white dark:bg-[#070F2B] dark:text-white">
        {/* sidebar drawer small device */}
        <div className="lg:hidden p-0">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="fixed bg-primary bg-opacity-20  text-white rounded-full ml-1 ">
                <Button variant="ghost">
                <span className="flex justify-start  items-center gap-2 text-white">
                  open sidebar
                  <IoIosArrowDropupCircle className="text-3xl text-white"></IoIosArrowDropupCircle>
                </span>
                </Button>
              </div>
            </DrawerTrigger>

            <DrawerContent>
              <DrawerClose>
                <Button className="bg-primary rounded-full" variant="ghost">
                <span className="flex justify-start  items-center gap-2 text-white ">
                  Close
                  <IoIosArrowDropdownCircle className="text-3xl text-white"></IoIosArrowDropdownCircle>
                </span>
                </Button>
              </DrawerClose>
              <div className="flex justify-start items-center">
                <DrawerHeader>
                  <h2 className="text-2xl text-primary font-bold">Dashboard</h2>
                </DrawerHeader>
              </div>

              {/* Sidebar content  */}
              <div className="p-4">
                <ul>
                  <li>
                    <Link
                        href={"/"}
                        className="py-2 flex items-center dark:bg-white gap-2"
                    >
                      <IoHomeOutline /> Home
                    </Link>
                  </li>
                  <li>
                    <Link
                        href={"/dashboard/Backlog"}
                        className="py-2 flex items-center gap-2 dark:bg-white"
                    >
                      <MdPostAdd /> Backlog
                    </Link>
                  </li>
                  <li>
                    <Link
                        href={"/dashboard/board"}
                        className="py-2 flex items-center gap-2 dark:bg-white"
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
        <div className="hidden lg:block lg:w-48 bg-base-300 text-black dark:text-white p-4 border-r-2">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <ul>
            <li>
              <Link href={"/"} className="py-2 flex items-center gap-2">
                {" "}
                <IoHomeOutline /> Home
              </Link>
            </li>
            <li>
              <Link
                  href={"/dashboard/Backlog"}
                  className="py-2 flex items-center gap-2"
              >
                {" "}
                <MdPostAdd /> Backlog
              </Link>
            </li>
            <li>
              <Link
                  href={"/dashboard/board"}
                  className="py-2 flex items-center gap-2"
              >
                <CgList />
                Boards
              </Link>
            </li>
          </ul>
        </div>

        {/*layout content  */}
        <div className="lg:p-6 pt-10 flex justify-center w-full">{children}</div>
      </div>
  );
};

export default layout;