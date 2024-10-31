"use client"
import React from 'react';
import CripsHandle from "@/app/(dashboards)/dashboard/CripsHandle";
import AdminDashboard from "@/components/Admin/AdminDashboard/AdminDashboard";
import MainPageWrap from "@/components/Dashboards/MainPage/MainPageWrap";
import useRole from "@/hooks/useRole";

const RoleLayout = () => {

    const [role] = useRole();

    return (
        <>
            <CripsHandle /> {role === "admin" ? <AdminDashboard /> : <MainPageWrap />}
        </>
    );
};

export default RoleLayout;