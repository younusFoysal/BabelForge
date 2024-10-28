'use client';
import { useUser } from '@clerk/nextjs';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import DashboardTopRight from '@/components/Dashboards/DashboardTopRight';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const layout = ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  // foysal@gmail.com
  const admin = ['babelforgeltd@gmail.com', 'babelforgeltdfgd@gmail.com'];
  const isAdmin = admin.includes(uemail);
  const conditionClass = isAdmin ? '' : 'h-screen';
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathName = usePathname();

  return (
    <SidebarProvider>
      {!pathName?.includes('/dashboard/meet/meeting') && (
        <AppSidebar className="bg-[#f7f8f9] dark:bg-[#151e30] dark:text-[#d4d4d4] text-[#34383e]" />
      )}
      <div className="bg-white w-full dark:bg-gray-900 dark:text-white relative">
        <main className="relative">
          {/* Dashboard ToP */}
          {!pathName?.includes('/dashboard/meet/meeting') && (
            <div
              className={` ${
                pathName?.includes('/dashboard/chat') ? ' absolute top-0 w-full right-0' : 'sticky'
              } flex z-[99]  backdrop-blur-[100px] border-b border-b-[#00000014] top-0 w-full px-5 py-[14px] justify-between items-center`}
            >
              {!pathName?.includes('/dashboard/meet/meeting') && <SidebarTrigger />}
              <div>{!pathName?.includes('/dashboard/meet/meeting') && <DashboardTopRight />}</div>
            </div>
          )}
          <div className={!pathName?.includes('/dashboard/chat') && 'px-4 md:px-9 py-7'}>{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default layout;

// px-9 py-7
