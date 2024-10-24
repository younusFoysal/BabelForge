import * as React from "react";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";

export function AppSidebar({ ...props }) {
  const { user, isLoaded } = useUser();
  const [Packages, setPackages] = useState("");
  const uemail = user?.primaryEmailAddress?.emailAddress;
  // foysal@gmail.com
  const admin = [
    "babelforgeltd@gmail.com",
    "babelforgeltdfgd@gmail.com",
    "mrdevware@gmail.com",
  ];

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
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Help",
        url: "#",
        icon: CircleHelp,
      },
    ],
  };

  const AdminData = {
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
        ],
      },
      {
        title: "Transaction",
        url: "#",
        icon: BadgeDollarSign,
        items: [
          {
            title: "Transactions",
            url: "/dashboard/admin/transactions",
          },
        ],
      },
      {
        title: "Connect",
        url: "#",
        icon: MessageSquareText,
        items: [
          {
            title: "inbox",
            url: "/dashboard/admin/inbox",
          },

          {
            title: "reviews",
            url: "/dashboard/admin/reviews",
          },
        ],
      },
      {
        title: "Packages",
        url: "#",
        icon: Package,
        items: [
          {
            title: "Packages",
            url: "/dashboard/admin/Packages",
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
  };

  const filteredNavMain = data.navMain
    .map((mainItem) => {
      if (
        Packages !== "Standard" &&
        Packages !== "Premium" &&
        mainItem.title === "Chat"
      ) {
        return null;
      }

      if (mainItem.title === "Chat") {
        mainItem.items = mainItem.items.filter(
          (subItem) =>
            Packages === "Standard" ||
            Packages === "Premium" ||
            subItem.title !== "Meeting"
        );
      }

      if (mainItem.title === "Tools") {
        mainItem.items = mainItem.items.filter(
          (subItem) =>
            Packages === "Standard" ||
            Packages === "Premium" ||
            (subItem.title !== "Canvas" && subItem.title !== "Babel AI")
        );
      }

      return mainItem;
    })
    .filter(Boolean);

  const isAdmin = admin.includes(uemail);

  console.log(filteredNavMain);
  console.log(Packages);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {isAdmin ? (
          <NavMain items={AdminData.navMain} />
        ) : (
          <NavMain items={data.navMain} />
        )}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
