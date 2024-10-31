'use client';
import { BookOpen, CircleHelp, Bot, Settings2, SquareTerminal, MessageSquareText, BadgeDollarSign, Package } from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { useUser } from '@clerk/nextjs';
import useRole from '@/hooks/useRole';
import usePlan from '@/hooks/usePlan';

export function AppSidebar({ ...props }) {
  const { user, isLoaded } = useUser();
  const [role] = useRole();
  const [plan] = usePlan();

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
            title: "Projects",
            url: "/dashboard/projects",
          },
          {
            title: "Teams",
            url: "/dashboard/teams",
          },

        ],
      },
      {
        title: 'Tasks',
        url: '#',
        icon: Bot,
        items: [
          {
            title: 'Backlog',
            url: '/dashboard/Backlog',
          },
          {
            title: 'Board',
            url: '/dashboard/board',
          },
          {
            title: 'Task Calendar',
            url: '/dashboard/calendar',
          },
        ],
      },
      {
        title: 'Chat',
        url: '#',
        icon: BookOpen,
        items: [
          {
            title: 'Group Chat',
            url: '/dashboard/chat',
          },

          {
            title: 'Meeting',
            url: '/dashboard/meet',
          },
        ],
      },
      {
        title: 'Tools',
        url: '#',
        icon: Settings2,
        items: [
          {
            title: "AI Assistant",
            url: "/dashboard/aiassistant",
          },
          {
            title: "Canvas",
            url: "/dashboard/canvas",
          },
          {
            title: "Diagrams",
            url: "/dashboard/diagrams",
          },
          {
            title: 'Notes',
            url: '/dashboard/notes',
          },
          {
            title: 'Docs',
            url: '/dashboard/doc',
          },
          {
            title: 'Screen Record',
            url: '/dashboard/ScreenRecorder',
          },
        ],
      },
    ],
    projects: [
      {
        name: 'Help',
        url: '/help',
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
        title: 'Dashboard',
        url: '/dashboard',
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: 'Overview',
            url: '/dashboard',
          },
        ],
      },
      {
        title: 'Transaction',
        url: '#',
        icon: BadgeDollarSign,
        items: [
          {
            title: 'Transactions',
            url: '/dashboard/admin/transactions',
          },
        ],
      },
      {
        title: 'Connect',
        url: '#',
        icon: MessageSquareText,
        items: [
          {
            title: 'Inbox',
            url: '/dashboard/admin/inbox',
          },

          {
            title: 'Reviews',
            url: '/dashboard/admin/reviews',
          },
        ],
      },
      {
        title: 'Packages',
        url: '#',
        icon: Package,
        items: [
          {
            title: 'Packages',
            url: '/dashboard/admin/packages',
          },
        ],
      },
      {
        title: 'Tools',
        url: '#',
        icon: Settings2,
        items: [
          {
            title: 'AI Assistant',
            url: '/dashboard/aiassistant',
          },
          {
            title: 'Canvas',
            url: '/dashboard/canvas',
          },
          {
            title: 'Notes',
            url: '/dashboard/notes',
          },
          {
            title: 'Diagrams',
            url: '/dashboard/diagrams',
          },
          {
            title: 'Docs',
            url: '/dashboard/doc',
          },
          {
            title: 'Screen Record',
            url: '/dashboard/ScreenRecorder',
          },
        ],
      },
    ],
  };

  const filteredNavMain = data.navMain
    .map(item => {
      if (item.title === 'Chat') {
        return plan === 'Standard' || plan === 'Premium' ? item : null;
      }

      if (item.title === 'Tools') {
        const filteredItems = item.items.filter(
          tool =>
            (tool.title !== 'AI Assistant' && tool.title !== 'Canvas' && tool.title !== 'Diagrams') ||
            plan === 'Standard' ||
            plan === 'Premium'
        );

        return { ...item, items: filteredItems };
      }

      return item;
    })
    .filter(Boolean);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {role == 'admin' ? <NavMain items={AdminData.navMain} /> : <NavMain items={filteredNavMain} />}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
