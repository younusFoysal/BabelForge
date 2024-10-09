import React from 'react';
import {LuEye} from "react-icons/lu";

const AdminDashboard = () => {
    return (
        <div>


            <div className="mb-6 grid grid-cols-1 gap-4 text-white sm:grid-cols-2 xl:grid-cols-4">
                <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-md p-4">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Total Projects</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 170</div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <LuEye  className="mr-2 shrink-0"/>
                        Last Week 70
                    </div>
                </div>

                {/* Sessions */}
                <div className="panel bg-gradient-to-r from-violet-500 to-violet-400 rounded-md p-4">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Total Teams</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 220</div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <LuEye className="mr-2 shrink-0"/>
                        Last Week 90
                    </div>
                </div>

                {/*  Time On-Site */}
                <div className="panel bg-gradient-to-r from-blue-500 to-blue-400 rounded-md p-4">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Total Tasks</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 1556</div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <LuEye className="mr-2 shrink-0"/>
                        Last Week 180
                    </div>
                </div>

                {/* Bounce Rate */}
                <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400 rounded-md p-4">
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Total Users</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 90</div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <LuEye className="mr-2 shrink-0"/>
                        Last Week 25
                    </div>
                </div>
            </div>





        </div>
    );
};

export default AdminDashboard;