<<<<<<< HEAD
"use client";

import { AlignJustify, ArrowRight, LayoutDashboard, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../../image/Home/babellogo.png";
import DashboardNavbar from "../DashboardsPage/DashboardsNavbar";
import { ModeToggle } from "../Theme/ModeToggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import Button from "./Buttons";
=======
'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import axios from 'axios';
import { AlignJustify, ArrowRight, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import logo from '../../image/Home/babellogo.png';
import DashboardNavbar from '../DashboardsPage/DashboardsNavbar';
import { ModeToggle } from '../Theme/ModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Button from './Buttons';
>>>>>>> ad0b448e07d05f3bec52351fb764ba95a30a815c

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userId } = useAuth();
  const auth = !!userId;

  const pathname = usePathname();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

<<<<<<< HEAD
  if (pathname?.includes("sign-in") || pathname?.includes("sign-up"))
    return null;
  if (pathname?.includes("/successPayment")) return null;

  if (pathname?.includes("dashboard")) {
    return <DashboardNavbar />;
  }
  if (pathname?.includes("stream")) {
=======
  // conditonial navbar
  if (pathname?.includes('login')) {
    return (
      <div className="bg-white/30 backdrop-blur-lg sticky top-0 right-0 border-b border-white/20 z-[999] dark:bg-gray-900/30 dark:border-gray-800/50">
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
  if (pathname?.includes('signup')) return null;
  if (pathname.includes('/successPayment')) return null;

  if (pathname?.includes('dashboard')) {
    return <DashboardNavbar />;
  }
  if (pathname?.includes('stream')) {
>>>>>>> ad0b448e07d05f3bec52351fb764ba95a30a815c
    return null;
  }

  const NavbarItems = [
    {
<<<<<<< HEAD
      title: "Features",
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
    {
      title: "Video",
      href: "/stream",
=======
      title: 'Features',
      href: '/features',
    },
    {
      title: 'Price',
      href: '/pricing',
    },
    {
      title: 'About Us',
      href: '/about-us',
    },
    {
      title: 'Contact Us',
      href: '/contact',
    },
    {
      title: 'Video',
      href: '/stream',
>>>>>>> ad0b448e07d05f3bec52351fb764ba95a30a815c
    },
  ];

  return (
<<<<<<< HEAD
    <div className="bg-white/30 backdrop-blur-lg dark:bg-[#0F172A]/60 border-b border-white/50 dark:border-gray-800/50 sticky top-0 right-0 z-[999]">
=======
    <div className="bg-white/30 backdrop-blur-lg dark:bg-gray-900/30 border-b border-white/20 dark:border-gray-800/50 sticky top-0 right-0 z-[999]">
>>>>>>> ad0b448e07d05f3bec52351fb764ba95a30a815c
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
<<<<<<< HEAD
            {NavbarItems.map((nav) => (
              <Link href={nav.href} key={nav.href}>
                <li
                  className={`hover:text-blue-500 ${
                    pathname === nav.href ? "text-blue-500 font-semibold" : ""
                  }`}
                >
                  {nav.title}
                </li>
=======
            {NavbarItems.map(nav => (
              <Link href={nav.href} key={nav.href}>
                <li className={`hover:text-blue-500 ${pathname === nav.href ? 'text-blue-500 font-semibold' : ''}`}>{nav.title}</li>
>>>>>>> ad0b448e07d05f3bec52351fb764ba95a30a815c
              </Link>
            ))}
          </ul>
        </nav>

        {/* Desktop Right Menu */}
        <div className="md:flex items-center space-x-4 hidden">
          <ModeToggle />
<<<<<<< HEAD
          {auth ? (
            <div className="md:flex items-center space-x-4 mr-4">
              <SignedIn>
                <div className="flex items-center gap-4">
                  <UserButton>
                    <UserButton.MenuItems>
                      <UserButton.Action label="signOut" />
                      <UserButton.Link label="Dashboard" href="/dashboard" />
                      <UserButton.Action label="manageAccount" />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
              </SignedIn>
=======
          {user ? (
            <div className="md:flex items-center space-x-4 mr-4">
              {user && (
                <Popover>
                  <PopoverTrigger>
                    <Avatar>
                      <AvatarImage
                        src={user?.image ? user?.image : 'https://getillustrations.b-cdn.net//photos/pack/3d-avatar-male_lg.png'}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="flex-col gap-2 p-4 flex dark:bg-gray-800 dark:border-gray-700 w-[200px] mr-4 mt-4">
                    <Link
                      href="/dashboard/profile"
                      className="bg-gray-100 py-2 px-4 w-full rounded-md text-center dark:text-white dark:bg-gray-900"
                    >
                      profile
                    </Link>
                    <button onClick={() => signOut()} className="bg-gray-100 py-2 px-4 w-full rounded-md dark:text-white dark:bg-gray-900">
                      {' '}
                      logout
                    </button>
                  </PopoverContent>
                </Popover>
              )}
>>>>>>> ad0b448e07d05f3bec52351fb764ba95a30a815c
            </div>
          ) : (
            <>
              <ul className="flex items-start space-x-4">
<<<<<<< HEAD
                <SignedOut>
                  <SignInButton>
                    <button className="capitalize text-blue-600">login</button>
                  </SignInButton>
                </SignedOut>
=======
                <Link href="/login">
                  <li>Login</li>
                </Link>
>>>>>>> ad0b448e07d05f3bec52351fb764ba95a30a815c
              </ul>
              <Button text="Get Started" icon={<ArrowRight size={20} />} />
            </>
          )}
        </div>
<<<<<<< HEAD
        {/* Desktop Right Menu */}

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={30} /> : <AlignJustify size={30} />}
          </button>
=======

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu}>{menuOpen ? <X size={30} /> : <AlignJustify size={30} />}</button>
>>>>>>> ad0b448e07d05f3bec52351fb764ba95a30a815c
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-white/30 backdrop-blur-lg border-t border-gray-200">
          <ul className="flex flex-col space-y-4 py-4">
<<<<<<< HEAD
            {NavbarItems.map((nav) => (
              <Link href={nav.href} key={nav.href}>
                <li className="border-b border-gray-100 pb-3 px-6 hover:text-blue-500">
                  {nav.title}
                </li>
=======
            {NavbarItems.map(nav => (
              <Link href={nav.href} key={nav.href}>
                <li className="border-b border-gray-100 pb-3 px-6 hover:text-blue-500">{nav.title}</li>
>>>>>>> ad0b448e07d05f3bec52351fb764ba95a30a815c
              </Link>
            ))}

            <Link href="/login">
<<<<<<< HEAD
              <li className="border-b border-gray-100 pb-3 px-6 hover:text-blue-500">
                Login
              </li>
=======
              <li className="border-b border-gray-100 pb-3 px-6 hover:text-blue-500">Login</li>
>>>>>>> ad0b448e07d05f3bec52351fb764ba95a30a815c
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
