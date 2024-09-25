"use client";
import Link from "next/link";
import { useState } from "react";
import logo from "../../image/Home/babellogo.png";
import { AlignJustify, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import Button from "./Buttons";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import DashboardNavbar from "../DashboardsPage/DashboardsNavbar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const session = useSession();
  const user = session?.data?.user;
  const pathname = usePathname();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
      href: "/features/dashboards",
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
    <div className="bg-white sticky top-0 right-0 border-b-2 border-b-gray-50 z-[999]">
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
          {user ? (
            <div className="flex gap-2 items">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
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
