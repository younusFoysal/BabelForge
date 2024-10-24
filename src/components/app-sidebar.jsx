import * as React from 'react';
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
} from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from '@/components/ui/sidebar';
import { useUser } from '@clerk/nextjs';

export function AppSidebar({ ...props }) {
  const { user } = useUser();

  const uemail = user?.primaryEmailAddress?.emailAddress;
  // foysal@gmail.com
  const admin = ['babelforgeltd@gmail.com', 'babelforgeltdfgd@gmail.com', 'mrdevware@gmail.com'];
  const isAdmin = admin.includes(uemail);

  const data = {
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
          {
            title: 'Teams',
            url: '/dashboard/teams',
          },
          {
            title: 'Projects',
            url: '/dashboard/projects',
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
            url: '/meet',
          },
        ],
      },
      {
        title: 'Tools',
        url: '#',
        icon: Settings2,
        items: [
          {
            title: 'Babel AI',
            url: '/dashboard/babelai',
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
            title: 'inbox',
            url: '/dashboard/admin/inbox',
          },

          {
            title: 'reviews',
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
            url: '/dashboard/admin/Packages',
          },
        ],
      },
      {
        title: 'Tools',
        url: '#',
        icon: Settings2,
        items: [
          {
            title: 'Babel AI',
            url: '/dashboard/babelai',
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {isAdmin ? <NavMain items={AdminData.navMain} /> : <NavMain items={data.navMain} />}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
