import React from 'react';
import AdminInbox from "@/components/Admin/AdminInbox/AdminInbox";

export const metadata = {
    title: "Admin Inbox | BabelForge",
    description: "Admin Inbox for BabelForge",
}

const Page = () => {
    return (
        <div>
            <AdminInbox/>  
        </div>
    );
};

export default Page;