"use client";
import MainPageWrap from "@/components/Dashboards/MainPage/MainPageWrap";
import {useSession} from "next-auth/react";
import AdminDashboard from "@/components/Admin/AdminDashboard";

const page = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const session = useSession();
  const uemail = session?.data?.user?.email;

  return <>


    {uemail === "admin@admin.com" ? (
        <AdminDashboard/>
    ) : (
        <MainPageWrap />
    )}


    </>;
};

export default page;
