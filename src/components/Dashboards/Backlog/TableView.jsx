"use client"
import React from 'react';

const TableView = ({ tasks }) => {

    let num = 1;

    return (


        <div className="overflow-x-auto w-[150vh]">
            <table className="w-full table-auto ">
                <thead>
                <tr className="bg-gray-100">
                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">No</th>
                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Task</th>
                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Status</th>
                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Action</th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {tasks?.map(task => (
                    <tr key={task._id}>
                        <td className="py-4 px-6 border-b border-gray-200">{num++}</td>
                        <td className="py-4 px-6 border-b border-gray-200">{task.tname}</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">{task.tproces}</td>
                        <td className="py-4 px-6 border-b border-gray-200">

                            <button
                                // onClick={() => handleFire(task.email, task.isFired)}
                                disabled={task.isFired}
                                className="btn btn-sm bg-red-500 text-white py-1 px-2 rounded text-xs hover:shadow hover:scale-105 duration-500 disabled:text-black disabled:font-bold"
                            >
                                {task.isDeleted ? "Deleted" : "Delete"}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableView;
