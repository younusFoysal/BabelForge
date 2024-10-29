"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardTopRight from "@/components/Dashboards/DashboardTopRight";
import { usePathname } from "next/navigation";

const layout = ({ children }) => {
  const pathName = usePathname();

  return (
    <SidebarProvider>
      {!pathName?.includes("/dashboard/meet") && (
        <AppSidebar className="bg-[#f7f8f9] dark:border-[#3e1878c2]  dark:bg-[#140e1e] dark:text-[#d4d4d4] text-[#34383e]" />
      )}
      <div className="bg-white w-full dark:bg-[#010313] dark:text-white relative">
        <main className="relative">
          {/* Dashboard ToP */}
          {!pathName?.includes("/dashboard/meet") && (
            <div
              className={` ${
                pathName?.includes("/dashboard/chat")
                  ? " absolute top-0 w-full right-0"
                  : "sticky"
              } flex z-[99]  backdrop-blur-[100px] border-b border-b-[#00000014] top-0 w-full px-5 py-[14px] justify-between items-center`}
            >
              {!pathName?.includes("/dashboard/meet") && <SidebarTrigger />}
              <div>
                {!pathName?.includes("/dashboard/meet") && (
                  <DashboardTopRight />
                )}
              </div>
            </div>
          )}
          <div
            className={
              !pathName?.includes("/dashboard/chat") && "px-4 md:px-9 py-7"
            }
          >
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default layout;

// px-9 py-7
