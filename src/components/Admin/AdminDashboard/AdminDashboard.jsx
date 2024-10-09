import React from 'react';
import {LuEye} from "react-icons/lu";
import AdminStatCards from "@/components/Admin/AdminDashboard/AdminStatCards";
import PaymentGraph from "@/components/Admin/AdminDashboard/PaymentGraph";
import PaymentPieChart from "@/components/Admin/AdminDashboard/PaymentPieChart";
import Transactions from "@/components/Admin/AdminDashboard/Transactions";

const AdminDashboard = () => {
    return (
        <div>


            <AdminStatCards/>


            <div className="flex gap-3 justify-evenly w-full ">
                <div
                className="w-full">
                    <PaymentGraph/>
                </div>
                <div className=" w-1/3">
                    <PaymentPieChart/>
                </div>
            </div>


            <Transactions/>





        </div>
    );
};

export default AdminDashboard;