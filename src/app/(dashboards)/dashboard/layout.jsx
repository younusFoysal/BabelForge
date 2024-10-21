"use client";

import { useUser } from "@clerk/nextjs";
import SideBar from "@/components/Siderbar/Sidebar";

const layout = ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  // foysal@gmail.com

  const admin = ["babelforgeltd@gmail.com", "babelforgeltdfgd@gmail.com"];

  const isAdmin = admin.includes(uemail);

  const conditionClass = isAdmin ? "" : "h-screen";

  return (
    <div className="flex bg-white dark:bg-gray-900 dark:text-white relative">
      <div className="fixed z-[99] top-0 left-0">
        <SideBar />
      </div>
      <div className={`${conditionClass} w-[96%] pl-16 py-3`}>{children}</div>
    </div>
  );
};

export default layout;
