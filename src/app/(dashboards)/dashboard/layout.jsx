import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import React from 'react';

export const metadata = {
  title: "Dashboard | BabelForge",
  description: "Dashboard for BabelForge",
}

const layout = ({children}) => {
  return (
    <div>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
};

export default layout;