"use client";
import {
  BookOpen,
  CircleHelp,
  Bot,
  Frame,
  PieChart,
  Settings2,
  SquareTerminal,
  MessageSquareText,
  BadgeDollarSign,
  Package,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import useRole from "@/hooks/useRole";

export function AppSidebar({ ...props }) {
  const { user, isLoaded } = useUser();

  const uemail = user?.primaryEmailAddress?.emailAddress;
  // foysal@gmail.com
  const admin = ["babelforgeltd@gmail.com", "babelforgeltdfgd@gmail.com"];

  const [role] = useRole();

  const data = {
    user: {
      name: `${user?.fullName}`,
      email: `${user?.primaryEmailAddress?.emailAddress}`,
      avatar: `${user?.imageUrl}`,
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Overview",
            url: "/dashboard",
          },
          {
            title: "Teams",
            url: "/dashboard/teams",
          },
          {
            title: "Projects",
            url: "/dashboard/projects",
          },
        ],
      },
      {
        title: "Tasks",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Backlog",
            url: "/dashboard/Backlog",
          },
          {
            title: "Board",
            url: "/dashboard/board",
          },
          {
            title: "Task Calendar",
            url: "/dashboard/calendar",
          },
        ],
      },
      {
        title: "Chat",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Group Chat",
            url: "/dashboard/chat",
          },

          {
            title: "Meeting",
            url: "/meet",
          },
        ],
      },
      {
        title: "Tools",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "Babel AI",
            url: "/dashboard/babelai",
          },
          {
            title: "Canvas",
            url: "/dashboard/canvas",
          },
          {
            title: "Notes",
            url: "/dashboard/notes",
          },
          {
            title: "Docs",
            url: "/dashboard/doc",
          },
          {
            title: "Screen Record",
            url: "/dashboard/ScreenRecorder",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Help",
        url: "/help",
        icon: CircleHelp,
      },
    ],
  };

  const filteredNavMain = data.navMain
    .map((item) => {
      if (item.title === "Chat") {
        return role === "Standard" || role === "Premium" ? item : null;
      }

      if (item.title === "Tools") {
        const filteredItems = item.items.filter(
          (tool) =>
            (tool.title !== "Babel AI" && tool.title !== "Canvas") ||
            role === "Standard" ||
            role === "Premium"
        );

        return { ...item, items: filteredItems };
      }

      return item;
    })
    .filter(Boolean);

  const isAdmin = admin.includes(uemail);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {isAdmin ? (
          <NavMain items={AdminData.navMain} />
        ) : (
          <NavMain items={filteredNavMain} />
        )}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
        {/* <UserButton> </UserButton> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
