import { useState, useEffect } from "react";
import { TbHome, TbUserPentagon } from "react-icons/tb";
import { GrChat, GrWorkshop } from "react-icons/gr";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { MdAddTask } from "react-icons/md";
import CurrenSidesBox from "./CurrenSidesBox";
import { SiNextra } from "react-icons/si";
import { CgMoreR } from "react-icons/cg";
import { ModeToggle } from "../Theme/ModeToggle";
import logo from "@/image/Home/babellogo.png"

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSidebarTab, setCurrentSidebarTab] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setIsSidebarOpen(false);
      }
    };

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = (tab) => {
    if (currentSidebarTab === tab) {
      setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar if the same tab is clicked
    } else {
      setIsSidebarOpen(true); // Open the sidebar if a different tab is clicked
    }
    setCurrentSidebarTab(tab);
  };

  const menuButton = [
    {
      icon: <TbHome />,
      label: "Home",
      tab: "homeTab",
    },
    {
      icon: <GrWorkshop />,
      label: "Project",
      tab: "projectTab",
    },
    {
      icon: <MdAddTask />,
      label: "task",
      tab: "taskTab",
    },
    {
      icon: <GrChat />,
      label: "Chat",
      tab: "ChatTab",
    },
    {
      icon: <SiNextra size={18} />,
      label: "Tools",
      tab: "toolsTab",
    },
    {
      icon: <CgMoreR />,
      label: "More",
      tab: "moreTab",
    },
  ];

  return (
    <div className="flex h-screen antialiased text-gray-900 dark:bg-slate-900 dark:text-light">
      <div className="flex flex-shrink-0 transition-all">
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
          ></div>
        )}

        <nav
          aria-label="Options"
          className="z-20 flex-col items-center flex-shrink-0 hidden w-16 py-4 dark:bg-slate-900 border-r-1 dark:border-slate-800 shadow-md sm:flex rounded-tr-3xl rounded-br-3xl bg-gray-100 dark:border"
        >
          <div className="flex-shrink-0 py-4">
            <Link href="/">
              <Image
                height={100}
                width={100}
                className="w-10 h-auto"
                src={logo}
                alt="Babel"
              />
            </Link>
          </div>

          <div className="mb-8">
            <ModeToggle />
          </div>
          <hr className="border border-1 w-[60%] mb-5 border-bgColor" />
          <div className="flex flex-col items-center flex-1 p-2 space-y-6">
            <SignedIn>
              <div className="flex items-center gap-4">
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="profile"
                      href="/dashboard/profile"
                      labelIcon={<TbUserPentagon size={15} />}
                    />
                    <UserButton.Action label="signOut" />
                    <UserButton.Action label="manageAccount" />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            </SignedIn>

            {menuButton.map((item, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={""}
                      onClick={() => toggleSidebar(item.tab)}
                      className={`p-2 transition-colors rounded-lg shadow-md hover:bg-bgColor hover:text-white focus:outline-none focus:ring focus:ring-bgColor focus:ring-offset-white focus:ring-offset-2 ${
                        isSidebarOpen && currentSidebarTab === item.tab
                          ? "text-white bg-bgColor"
                          : "text-white bg-slate-600"
                      }`}
                    >
                      {item.icon}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 text-white outline-none rounded-sm text-xs border-slate-800">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </nav>

        <div
          className={`fixed inset-y-0 left-0 z-10 w-64 dark:bg-slate-900 border-r-2 dark:border-slate-800 shadow-xl sm:left-16 rounded-tr-3xl rounded-br-3xl sm:w-72 lg:static lg:w-64
          transform transition-transform duration-300 ease-in-out bg-gray-100 border-gray-200 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <nav aria-label="Main" className="flex flex-col h-full">
            <div className="flex items-center justify-center flex-shrink-0 py-10">
              <Image
                height={100}
                width={100}
                className="w-20 h-auto"
                src={logo}
                alt="BabeL"
              />
            </div>

            <div className="flex-1 px-4 space-y-2 overflow-hidden hover:overflow-auto">
              <CurrenSidesBox
                currentSidebarTab={currentSidebarTab}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
