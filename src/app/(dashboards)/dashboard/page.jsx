"use client";
import MainPageWrap from "@/components/Dashboards/MainPage/MainPageWrap";
import AdminDashboard from "@/components/Admin/AdminDashboard/AdminDashboard";
import { useUser } from "@clerk/nextjs";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  // foysal@gmail.com

  const admin = [
    "babelforgeltd@gmail.com",
    "babelforgeltdfgd@gmail.com",
    "morshidulrahman4167@gmail.com",
  ];

  return <>{admin.includes(uemail) ? <AdminDashboard /> : <MainPageWrap />}</>;
};

export default page;
