'use client';
import { AlignJustify, ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '../../image/Home/babellogo.png';

import Button from './Buttons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { MdDashboard } from 'react-icons/md';
import {ModeToggle} from "@/components/Theme/ModeToggle";

const Navbar = () => {
  const { userId } = useAuth();
  const auth = !!userId;
  const { setTheme, themes } = useTheme();
  const pathname = usePathname();

  if (pathname?.includes('sign-in') || pathname?.includes('sign-up')) return null;
  if (pathname?.includes('/successPayment')) return null;

  if (pathname?.includes('dashboard')) {
    return null;
  }
  if (pathname?.includes('stream')) {
    return null;
  }

  const NavbarItems = [
    {
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
      title: 'Help',
      href: '/help',
    },
  ];

  return (
    <div className=" backdrop-blur-lg bg-transparent border-b  border-white/10 fixed w-full top-0 right-0 z-[999]">
      <div className="flex items-center justify-between container max-w-screen-2xl mx-auto px-4 py-4">
        {/* logo text-[#106ac5] */}
        <Link href="/">
          <div className="flex gap-1 justify-center items-center">
            <Image src={logo} alt="babelforge" className="w-full h-12" />
            <h3 className="text-3xl font-bold text-white">BabelForge</h3>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden text-white md:flex">
          <ul className="flex space-x-6 items-center justify-center">
            {NavbarItems.map(nav => (
              <Link href={nav.href} key={nav.href}>
                <li className={`hover:text-blue-500 ${pathname === nav.href ? 'text-blue-500 font-semibold' : ''}`}>{nav.title}</li>
              </Link>
            ))}
          </ul>
        </nav>

        {/* Desktop Right Menu */}
        <div className="md:flex items-center space-x-4 hidden">
          {auth ? (
            <div className="md:flex items-center space-x-4 mr-4">
              <ModeToggle />
              <SignedIn>
                <div className="flex items-center gap-4">
                  <UserButton>
                    <UserButton.MenuItems>
                      <UserButton.Link label="Dashboard" href="/dashboard" labelIcon={<MdDashboard size={15} />} />
                      <UserButton.Action label="manageAccount" />
                      <UserButton.Action label="signOut" />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
              </SignedIn>
            </div>
          ) : (
            <>
              <ModeToggle />
              <ul className="flex items-start space-x-4">
                <SignedOut>
                  <SignInButton>
                    <button className="transition duration-500 hover:scale-110 relative inline-flex h-11 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a402a4_0%,#0037bb_50%,#bd5fff_100%)]"></span>
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#0E162A] px-7 text-md font-medium text-white backdrop-blur-3xl gap-2 undefined">
                        Login
                      </span>
                    </button>
                  </SignInButton>
                </SignedOut>
              </ul>
              <Button text="Get Started" icon={<ArrowRight size={20} />} />
            </>
          )}
        </div>

        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger>
              <AlignJustify size={30} className="dark:text-white text-black" />
            </SheetTrigger>
            <SheetContent side={'top'} className="md:hidden bg-white/30 backdrop-blur-lg border-t border-gray-200 mt-20">
              <div>
                <ul className="flex flex-col space-y-4 py-4">
                  {NavbarItems.map(nav => (
                    <Link href={nav.href} key={nav.href}>
                      <li className="border-b border-gray-50 pb-3 px-4 hover:text-blue-500 text-white">{nav.title}</li>
                    </Link>
                  ))}
                  {!auth && (
                    <Link href="/sign-in">
                      <li className="border-b border-gray-50 pb-3 px-4 hover:text-blue-500 text-white">Login</li>
                    </Link>
                  )}
                  <li>
                    <div className="w-full items-center justify-center flex">
                      <Button text="Get Started" icon={<ArrowRight size={20} />} />
                    </div>
                  </li>
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
