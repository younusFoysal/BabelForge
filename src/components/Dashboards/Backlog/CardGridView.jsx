import React from 'react';

const CardGridView = ({ tasks }) => {

    console.log("Grid task",tasks)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tasks?.map(task => (
                <div key={task._id} className="p-4 bg-white border-2 border-blue-600 rounded-xl shadow-2xl text-center cursor-pointer w-full">
                    <h1 className="text-2xl font-bold uppercase text-blue-600">
                        {task.tname}
                    </h1>
                    <h2 className="text-lg text-gray-700">
                        Status: {task.tproces}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">

                        <button
                            onClick={() => handleAdjustSalary(task.email, task.salary)}
                            disabled={task.isFired}
                            className="tracking-wide font-bold rounded border-2 border-blue-500 hover:text-white hover:border-sky-600 hover:bg-sky-600 shadow-md py-2 px-2 inline-flex items-center transition duration-500 w-full sm:w-auto"
                        >
                            <span className="mx-auto">
                                Update Status
                            </span>
                        </button>
                        <button
                            onClick={() => handleFire(task.email, task.isFired)}
                            disabled={task.isFired}
                            className="tracking-wide font-bold rounded border-2 border-red-500 hover:text-white hover:border-red-600 hover:bg-red-600 shadow-md py-2 px-2 inline-flex items-center transition duration-500 w-full sm:w-auto"
                        >
                            <span className="mx-auto">
                                {task.isFired ? "Deleted" : "Delete"}
                             </span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default CardGridView;
