'use client';
import React from 'react';
import AdminStatCards from '@/components/Admin/AdminDashboard/AdminStatCards';
import PaymentGraph from '@/components/Admin/AdminDashboard/PaymentGraph';
import PaymentPieChart from '@/components/Admin/AdminDashboard/PaymentPieChart';
import Transactions from '@/components/Admin/AdminDashboard/Transactions';
import useTrans from '@/hooks/useTrans';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import PayGraph from "@/components/Admin/AdminDashboard/PayGraph";

const AdminDashboard = () => {
  const [trans, isLoading] = useTrans();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="px-4">
      <AdminStatCards />

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
        {/*<PaymentGraph trans={trans} isLoading={isLoading} />*/}
          <PayGraph/>
        <PaymentPieChart trans={trans} isLoading={isLoading} />
      </div>
      <Transactions />
    </div>
  );
};

export default AdminDashboard;
