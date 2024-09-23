import Link from 'next/link';
import React from 'react';

const layout = ({children}) => {
    return (
        <div className="flex h-screen bg-gray-100">

            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <ul>
                    <li><Link href={"/dashboard"} className="block py-2">Home</Link></li>
                    <li><Link href={"/dashboard/board"} className="block py-2">Boards</Link></li>
                </ul>
            </div>


            <div>
                {
                    children
                }

            </div>


        </div>
    );
};

export default layout;