import React from 'react';
import { LuEye } from 'react-icons/lu';
import AdminStatCards from '@/components/Admin/AdminDashboard/AdminStatCards';
import PaymentGraph from '@/components/Admin/AdminDashboard/PaymentGraph';
import PaymentPieChart from '@/components/Admin/AdminDashboard/PaymentPieChart';
import Transactions from '@/components/Admin/AdminDashboard/Transactions';

const AdminDashboard = () => {
  return (
    <div className="px-4">
      <AdminStatCards />
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
        <PaymentGraph />
        <PaymentPieChart />
      </div>
      <Transactions />
    </div>
  );
};

export default AdminDashboard;
