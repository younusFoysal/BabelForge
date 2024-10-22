'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ModeToggle } from '@/components/Theme/ModeToggle';
import { Video } from 'lucide-react';
import DashboardTopRight from '@/components/Dashboards/DashboardTopRight';

const layout = ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  // foysal@gmail.com
  const admin = ['babelforgeltd@gmail.com', 'babelforgeltdfgd@gmail.com'];
  const isAdmin = admin.includes(uemail);
  const conditionClass = isAdmin ? '' : 'h-screen';

  return (
    <SidebarProvider>
      <AppSidebar className="bg-[#f7f8f9] dark:bg-[#151e30] dark:text-[#d4d4d4] text-[#34383e]" />
      <div className="bg-white w-full dark:bg-gray-900 dark:text-white relative">
        <main className="relative">
          {/* Dashboard Top */}
          <div className="flex z-[99] sticky backdrop-blur-[100px] border-b border-b-[#00000014] top-0 w-full px-5 py-[14px] justify-between items-center">
            <SidebarTrigger />
            <div>
              <DashboardTopRight />
            </div>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default layout;
