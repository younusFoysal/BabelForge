'use client';

import { AlignJustify, ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import logo from '../../image/Home/babellogo.png';
import DashboardNavbar from '../DashboardsPage/DashboardsNavbar';
import Button from './Buttons';

import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from '@clerk/nextjs';
import { MdDashboard } from 'react-icons/md';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userId } = useAuth();
  const auth = !!userId;
  const {} = useTheme();
  const pathname = usePathname();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (pathname?.includes('sign-in') || pathname?.includes('sign-up')) return null;
  if (pathname?.includes('/successPayment')) return null;

  if (pathname?.includes('dashboard')) {
    return <DashboardNavbar />;
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
      title: 'Video',
      href: '/stream',
    },
  ];

  return (
    <div className=" backdrop-blur-lg bg-transparent border-b  border-white/10 fixed w-full top-0 right-0 z-[999]">
      <div className="flex items-center justify-between container max-w-screen-2xl mx-auto px-4 py-4">
        {/* logo */}
        <Link href="/">
          <div className="flex gap-1 justify-center items-center">
            <Image src={logo} alt="babelforge" className="w-full h-12" />
            <h3 className="text-3xl font-bold text-[#106ac5]">BabelForge</h3>
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
              <SignedIn>
                <div className="flex items-center gap-4">
                  <UserButton>
                    <UserButton.MenuItems>
                      <UserButton.Action label="signOut" />
                      <UserButton.Link label="Dashboard" href="/dashboard" labelIcon={<MdDashboard size={15} />} />
                      <UserButton.Action label="manageAccount" />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
              </SignedIn>
            </div>
          ) : (
            <>
              <ul className="flex items-start space-x-4">
                <SignedOut>
                  <SignInButton>
                    <button className="capitalize text-blue-600">login</button>
                  </SignInButton>
                </SignedOut>
              </ul>
              <Button text="Get Started" icon={<ArrowRight size={20} />} />
            </>
          )}
        </div>
        {/* Desktop Right Menu */}

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu}>{menuOpen ? <X size={30} /> : <AlignJustify size={30} />}</button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-white/30 backdrop-blur-lg border-t border-gray-200">
          <ul className="flex flex-col space-y-4 py-4">
            {NavbarItems.map(nav => (
              <Link href={nav.href} key={nav.href}>
                <li className="border-b border-gray-100 pb-3 px-6 hover:text-blue-500">{nav.title}</li>
              </Link>
            ))}

            <Link href="/login">
              <li className="border-b border-gray-100 pb-3 px-6 hover:text-blue-500">Login</li>
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
