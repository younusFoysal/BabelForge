'use client';
import apple from '@/image/Footer/apple.png';
import google from '@/image/Footer/google.png';
import logo from '@/image/Home/babellogo.png';
import { Facebook, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import './Footer.css';
import { IoAccessibility } from 'react-icons/io5';
import { useState } from 'react';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const pathname = usePathname();
  const [accessLoading, setAcessLoading] = useState(false);

  const handleAcessBtn = () => {
    loadAccessibilityWidget();
    setAcessLoading(true);
    setTimeout(() => {
      setAcessLoading(false);
    }, 3500);
  };

  //  Web accesibilty widget
  const loadAccessibilityWidget = () => {
    (function (d) {
      var s = d.createElement('script');
      /* Uncomment and set desired attributes */
      s.setAttribute('data-position', 100); // Set custom position
      s.setAttribute('data-size', 'small'); // Set custom size
      s.setAttribute('data-color', '#3770EC'); // Set custom color
      s.setAttribute('data-trigger', 'triggerId'); // Custom trigger ID
      s.setAttribute('data-account', 'sz3Lj3xaQ0'); // Your UserWay account
      s.setAttribute('src', 'https://cdn.userway.org/widget.js'); // Widget source
      (d.body || d.head).appendChild(s); // Append the script to the document
    })(document);
  };

  // Hide footer on login and signup pages
  if (pathname?.includes('sign-in') || pathname?.includes('sign-up') || pathname?.includes('dashboard')) return null;
  if (pathname?.includes('meet')) {
    return null;
  }
  if (pathname?.includes('/successPayment') || pathname?.includes('meet')) return null;
  return (
    <footer className="relative">
      <div className="footer-top-bg w-full mx-auto h-[200px] z-10 absolute top-0 left-0 -translate-y-full"></div>
      <div className="p-2 md:p-16 pt-10  text-gray-200 bg-[#181024] border-t-gray-800 border-t-[1px] footer-background relative">
        {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div> */}
        {/* upper part */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7 lg:gap-12 justify-between border-[#ffffff57] border-b pb-12">
          <div className="flex flex-col space-y-1 text-sm">
            {/* logo */}
            <div className="flex gap-1 justify-center lg:justify-start items-center ">
              <Image src={logo} alt="babelforge" className=" size-6 lg:size-14" />
              <h3 className="text-2xl lg:text-3xl font-bold text-white dark:text-">BabelForge</h3>
            </div>

            <p className="text-center md:text-start text-xs font-semibold">Where Teams Forge Success.</p>
            <p className="text-center md:text-start pt-3 text-xs">
              BabelForge – Streamlining teamwork, task management, and collaboration for your team’s success.
            </p>
          </div>
          <div className="flex flex-col  space-y-3 text-sm h-full text-center md:text-start">
            <h3 className="text-lg lg:text-xl font-semibold uppercase">Company</h3>
            <Link href="/about-us">About Us</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className="flex flex-col  space-y-3 text-sm h-full text-center md:text-start">
            <h3 className="text-lg lg:text-xl font-semibold uppercase">Features</h3>
            <Link href="/dashboard/projects">Create Projects</Link>
            <Link href="/dashboard/teams">Teams</Link>
            <Link href="/dashboard/Backlog">Tasks</Link>
            <Link href="/dashboard/meet">Communicate</Link>
          </div>
          <div className="flex flex-col  space-y-3 text-sm h-full text-center md:text-start">
            <h3 className="text-lg lg:text-xl font-semibold uppercase">Legal</h3>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/help">Get Help</Link>
          </div>
        </div>
        {/* lower part */}
        <div className="mt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-0">
          <div className="space-y-3 text-center md:text-start">
            <div className="flex gap-2 items-center justify-center md:justify-start text-2xl">
              <Link href="https://www.linkedin.com/in/babelforge/">
                <Linkedin />
              </Link>
              <Link href="https://www.facebook.com/babelforge/">
                <Facebook />
              </Link>
              <Link href="https://x.com/BabelForge">
                <FaXTwitter />
              </Link>
              <Link href="https://github.com/teambabeldev">
                <FaGithub />
              </Link>
            </div>
            <div className="text-sm font-light">
              <Link href="/privacy"> Privacy Policy |</Link>
              <Link href="/terms"> Terms and Conditions | </Link>
              <Link href="/help"> Get Help</Link>
            </div>
            <p className="text-sm font-light">All Rights Reserved © babelforge.com</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-64 flex gap-2">
              <Link href="https://play.google.com/store/apps">
                <Image src={google} alt="google play stoe" className="w-full h-full" />
              </Link>
              <Link href="https://www.apple.com/app-store/">
                <Image src={apple} alt="ios App store" className="w-full h-full" />
              </Link>
            </div>

            <button
              title="Accessibility"
              className={`relative w-12 h-12 flex items-center justify-center transition-all duration-300 ease-in-out ${accessLoading ? 'cursor-wait' : 'cursor-pointer'
                }`}
              id="triggerId"
              onClick={handleAcessBtn}
            >
              <span className="text-[22px] relative z-10">
                <IoAccessibility />
              </span>

              <span
                className={`absolute inset-0 rounded-full border-dashed border-[2px] transition-all duration-500 
          ${accessLoading
                    ? 'border-[#74767D] acess-btn '
                    : 'border-[#74767D] hover:bg-[#e5e5e5] hover:text-[#8c8c8c] hover:border-transparent'
                  }`}
              ></span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
