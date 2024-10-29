"use client";
import MainPageWrap from "@/components/Dashboards/MainPage/MainPageWrap";
import AdminDashboard from "@/components/Admin/AdminDashboard/AdminDashboard";
import CripsHandle from "./CripsHandle";
import useRole from "@/hooks/useRole";

const page = () => {
  const [role] = useRole();

  return (
    <>
      <CripsHandle /> {role == "admin" ? <AdminDashboard /> : <MainPageWrap />}
    </>
  );
};

export default page;
