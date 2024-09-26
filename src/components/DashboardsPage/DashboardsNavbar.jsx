"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import logo from "@/image/Home/babellogo.png";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const DashboardNavbar = () => {
  const pathname = usePathname();
  const session = useSession();
  const user = session?.data?.user;
  const [users, setUsers] = useState([]);

  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${user?.email}`)
    .then((data) => setUsers(data.data))
    .catch((e) => console.log("error usersss", e));

  const NavbarItems = [
    {
      title: "Project",
      href: "/dashboard/projects",
    },
    {
      title: "Team",
      href: "/dashboard/team",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
  ];

  return (
    <div className="bg-white sticky top-0 right-0 border-b-2 border-b-gray-50 z-[999]">
      <div className="flex items-center justify-between container max-w-screen-2xl mx-auto px-4 py-3">
        {/* logo */}
        <Link href="/">
          <div className="flex gap-1 justify-center items-center">
            <Image src={logo} alt="babelforge" className="w-full h-8" />
            <h3 className="text-3xl font-bold text-[#106ac5]">BabelForge</h3>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 items-center justify-center">
            {NavbarItems.map((nav) => (
              <Link href={nav.href} key={nav.href}>
                <li
                  className={`hover:text-blue-500 ${
                    pathname === nav.href ? "text-blue-500 font-semibold" : ""
                  }`}
                >
                  {nav.title}
                </li>
              </Link>
            ))}
          </ul>
        </nav>

        {/* Desktop Right Menu */}
        <div className="md:flex items-center space-x-4 mr-4">
          {user && (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src={
                      users?.image
                        ? users?.image
                        : "https://getillustrations.b-cdn.net//photos/pack/3d-avatar-male_lg.png"
                    }
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="flex-col gap-2 p-4 flex ">
                <Link
                  href="/dashboard/profile"
                  className="bg-gray-100 py-2 px-4 w-full rounded-md text-center"
                >
                  User profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-gray-100 py-2 px-4 w-full rounded-md"
                >
                  {" "}
                  logout
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
