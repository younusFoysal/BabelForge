import React from 'react';
import Transactions from "@/components/Admin/AdminDashboard/Transactions";

export const metadata = {
    title: "Transactions | BabelForge",
    description: "Transactions for BabelForge",
}

const Page = () => {
    return (
        <div>

            <Transactions/>

        </div>
    );
};

export default Page;