"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarItems = [
  {
    title: "Project",
    href: "/dashboard/projects",
  },
  {
    title: "Teams",
    href: "/dashboard/teams",
  },
  {
    title: "Group Chat",
    href: "/dashboard/chat",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Review",
    href: "/dashboard/review",
  },
];

const DashboardNavbarBox = () => {
  const pathname = usePathname();
  return (
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
  );
};

export default DashboardNavbarBox;
