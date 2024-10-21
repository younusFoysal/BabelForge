'use client';

import * as React from 'react';
import { AudioWaveform, BookOpen, Bot, Command, Frame, GalleryVerticalEnd, Map, PieChart, Settings2, SquareTerminal } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { UserButton, useUser } from '@clerk/nextjs';

export function AppSidebar({ ...props }) {
  const { user } = useUser();
  console.log(user);

  const data = {
    user: {
      name: `${user?.fullName}`,
      email: `${user?.primaryEmailAddress?.emailAddress}`,
      avatar: `${user?.imageUrl}`,
    },
    teams: [
      {
        name: 'Acme Inc',
        logo: GalleryVerticalEnd,
        plan: 'Enterprise',
      },
      {
        name: 'Acme Corp.',
        logo: AudioWaveform,
        plan: 'Startup',
      },
      {
        name: 'Evil Corp.',
        logo: Command,
        plan: 'Free',
      },
    ],
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
        ],
      },
      {
        title: 'Chat',
        url: '#',
        icon: BookOpen,
        items: [
          {
            title: 'Group Chat',
            url: '/dashboard/groupmessage',
          },

          {
            title: 'Meeting',
            url: '/dashboard/meeting',
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
        ],
      },
    ],
    projects: [
      {
        name: 'Design Engineering',
        url: '#',
        icon: Frame,
      },
      {
        name: 'Sales & Marketing',
        url: '#',
        icon: PieChart,
      },
      {
        name: 'Travel',
        url: '#',
        icon: Map,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
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
