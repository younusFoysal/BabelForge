"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { AlignJustify, ArrowRight, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../../image/Home/babellogo.png";
import DashboardNavbar from "../DashboardsPage/DashboardsNavbar";
import { ModeToggle } from "../Theme/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Button from "./Buttons";

const Navbar = () => {
  const [users, setUsers] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);
  const session = useSession();
  const user = session?.data?.user;
  const pathname = usePathname();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${user?.email}`)
    .then((data) => setUsers(data.data))
    .catch((e) => console.log("error usersss", e));

  // conditonial navbar
  if (pathname.includes("login")) {
    return (
      <div className="bg-white sticky top-0 right-0 border-b-2 border-b-gray-50 z-[999]">
        <div className="flex items-center justify-between container max-w-screen-2xl mx-auto px-4 py-3">
          {/* logo */}
          <Link href="/">
            <div className="flex gap-1 justify-center items-center">
              <Image src={logo} alt="babelforge" className="w-full h-12" />
              <h3 className="text-3xl font-bold text-[#106ac5]">BabelForge</h3>
            </div>
          </Link>
        </div>
      </div>
    );
  }
  if (pathname.includes("signup")) return null;

  if (pathname.includes("dashboard")) {
    return <DashboardNavbar />;
  }

  const NavbarItems = [
    {
      title: "Product",
      href: "/features",
    },
    {
      title: "Price",
      href: "/pricing",
    },
    {
      title: "About Us",
      href: "/about-us",
    },
    {
      title: "Contact Us",
      href: "/contact",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#2E073F] sticky top-0 right-0 border-b-2 border-b-gray-50 dark:border-b-[#19181a] z-[999]">
      <div className="flex items-center justify-between container max-w-screen-2xl mx-auto px-4 py-4">
        {/* logo */}
        <Link href="/">
          <div className="flex gap-1 justify-center items-center">
            <Image src={logo} alt="babelforge" className="w-full h-12" />
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
        <div className="md:flex items-center space-x-4 hidden">
          <ModeToggle />
          {user ? (
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
                      profile
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
          ) : (
            <>
              <ul className="flex items-start space-x-4">
                <Link href="/login">
                  <li>Login</li>
                </Link>
              </ul>
              <Button text="Get Started" icon={<ArrowRight size={20} />} />
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={30} /> : <AlignJustify size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col space-y-4  py-4">
            {NavbarItems.map((nav) => (
              <Link href={nav.href} key={nav.href}>
                <li className="border-b border-gray-100 pb-3 px-6 hover:text-blue-500">
                  {nav.title}
                </li>
              </Link>
            ))}

            <Link href="/login">
              <li className="border-b border-gray-100 pb-3 px-6 hover:text-blue-500">
                Login
              </li>
            </Link>
            <li>
              <div className="w-full items-center justify-center flex">
                <Button text="Get Started" icon={<ArrowRight size={20} />} />
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
