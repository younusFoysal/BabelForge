"use client";
import apple from "@/image/Footer/apple.png";
import google from "@/image/Footer/google.png";
import logo from "@/image/Home/babellogo.png";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Footer.css";

const Footer = () => {
  const pathname = usePathname();

  // Hide footer on login and signup pages

  if (pathname.includes("login") || pathname.includes("signup")) return null;

  return (
    <footer className="p-2 md:p-16 pt-10 text-gray-500 bg-sky-50 dark:text-white dark:bg-[#2E073F]">
      {/* upper part */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-7 items-center justify-between border-b pb-12">
        <div className="flex flex-col space-y-1 text-sm">
          {/* logo */}
          <Link href="/">
            <div className="flex gap-1 justify-center lg:justify-start items-center ">
              <Image
                src={logo}
                alt="babelforge"
                className=" size-6 lg:size-14 "
              />
              <h3 className="text-3xl font-bold text-[#106ac5] dark:text-">
                BabelForge
              </h3>
            </div>
          </Link>

          <p className="text-center md:text-start text-xs font-semibold">
            Where Teams Forge Success.
          </p>
          <p className="text-center md:text-start pt-3 text-xs">
            BabelForge – Streamlining teamwork, task management, and
            collaboration for your team’s success.
          </p>
        </div>
        <div className="flex flex-col  space-y-3 text-sm h-full text-center md:text-start">
          <h3 className="text-xl font-semibold">Company</h3>
          <a href="">About Us</a>
          <a href="">Pricing</a>
          <a href="">Contact Us</a>
          <a href="">Templates</a>
          <a href="">24/7 support</a>
        </div>
        <div className="flex flex-col  space-y-3 text-sm h-full text-center md:text-start">
          <h3 className="text-xl font-semibold">Features</h3>
          <a href="">Create Projects</a>
          <a href="">Dashboards</a>
          <a href="">Issue Tracking</a>
          <a href="">Reporting</a>
          <a href="">Communicate</a>
        </div>
        <div className="flex flex-col  space-y-3 text-sm h-full text-center md:text-start">
          <h3 className="text-xl font-semibold">Use Cases</h3>
          <a href="">Technology</a>
          <a href="">Education</a>
          <a href="">Project Management</a>
          <a href="">Non-Profit Organization</a>
          <a href=""></a>
        </div>
      </div>

      {/* lower part */}
      <div className="mt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-0">
        <div className="space-y-3 text-center md:text-start">
          <div className="flex gap-2 items-center justify-center md:justify-start text-2xl">
            <Link href="">
              <Linkedin />
            </Link>
            <Link href="">
              <Facebook />
            </Link>
            <Link href="">
              <Youtube />
            </Link>
            <Link href="">
              <Twitter />
            </Link>
            <Link href="">
              <Instagram />
            </Link>
          </div>
          <div className="text-sm font-light">
            <a href=""> Security |</a>
            <a href=""> Terms and privacy |</a>
            <a href=""> Privacy policy |</a>
            <a href=""> Status</a>
          </div>
          <p className="text-sm font-light">
            All Rights Reserved © babelforge.com
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-center">Download Our App</p>
          <div className="w-64 flex gap-2">
            <a href="">
              <Image
                src={google}
                alt="google play stoe"
                className="w-full h-full"
              />
            </a>
            <a href="">
              <Image
                src={apple}
                alt="Ios App store"
                className="w-full h-full"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
