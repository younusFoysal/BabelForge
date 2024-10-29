import React from 'react';
import AdminDashboard from "@/components/Admin/AdminDashboard/AdminDashboard";

export const metadata = {
    title: "Admin Dashboard | BabelForge",
    description: "Admin Dashboard for BabelForge",
}

const Page = () => {
    return (
        <div>
            <AdminDashboard></AdminDashboard>
        </div>
    );
};

export default Page;