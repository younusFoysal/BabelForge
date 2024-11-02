"use client";
import React from "react";
import AdminStatCards from "@/components/Admin/AdminDashboard/AdminStatCards";
import PaymentPieChart from "@/components/Admin/AdminDashboard/PaymentPieChart";
import Transactions from "@/components/Admin/AdminDashboard/Transactions";
import useTrans from "@/hooks/useTrans";
import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";
import PayGraph from "@/components/Admin/AdminDashboard/PayGraph";
import useRole from "@/hooks/useRole";
import { redirect } from "next/navigation";

const AdminDashboard = () => {
  const [trans, isLoading] = useTrans();
  const [role, roleLoading] = useRole();

  if (isLoading || roleLoading) return <LoadingSpinner></LoadingSpinner>;

  if (role !== "admin") redirect("/");

  return (
    <div className="px-4 h-full  py-4 rounded-md">
      <AdminStatCards />
      <div className=" grid grid-cols-1 md:grid-cols-8 gap-5">
        <PayGraph trans={trans} isLoading={isLoading} />
        <PaymentPieChart trans={trans} isLoading={isLoading} />
      </div>
      <Transactions transAmout={6} />
    </div>
  );
};

export default AdminDashboard;
