"use client"

import useAxiosCommon from "@/lib/axiosCommon";
import CommonTable from "../../shared/CommonTable/CommonTable";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const AdminInbox = () => {
    const theads = ["No.", "Sender", "Email", "Phone", "Company", "Date", "Sent at", "Actions"];
    const axiosCommon = useAxiosCommon();

    const { data: messages = [], refetch: inboxRefetch } = useQuery({
        queryKey: ['admin-inbox'],
        queryFn: async () => {
            const res = await axiosCommon.get('/message/messages');
            return res.data;
        }
    })

    // console.log(messages);

    return (
        <div>
            <h2 className="text-2xl font-semibold">All Messages</h2>
            <CommonTable theads={theads} tdata={messages} inboxRefetch={inboxRefetch}></CommonTable>
        </div>
    );
};

export default AdminInbox;