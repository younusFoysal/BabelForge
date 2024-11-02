import * as React from 'react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Image from 'next/image';
import logo from '@/image/Home/babellogo.png';
import Link from 'next/link';
import UserBadge from './Profile/UserBadge';

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <Link className="flex w-full  gap-2 items-center" href="/">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Image src={logo} height={25} width={25} alt="Babel Logo" />
            </div>
            <div className="flex-1 flex gap-2 items-center text-left text-[16px] leading-tight">
              <span className="truncate font-semibold">BabelForge</span>
              <UserBadge />
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
