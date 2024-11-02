import React from 'react';
import AdminPackages from "@/components/Admin/AdminPackages/AdminPackages";

export const metadata = {
    title: "Admin Packages | BabelForge",
    description: "Admin Packages for BabelForge",
}

const Page = () => {
    return (
        <div>

            <AdminPackages/>

        </div>
    );
};

export default Page;