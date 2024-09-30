"use client";
import React from "react";
import useTasks from "@/hooks/useTasks";

const TableView = () => {
  let num = 1;
  const tasks = useTasks()
  console.log(tasks[0])

  return (
      <div>

        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Num
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assigned to
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              team
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">

          {
            tasks[0]?.map((task) => <tr key={task._id}>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {num++}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">

                      <div className="">
                        <div className="text-sm font-medium text-gray-900">
                          {task?.tname}
                        </div>
                        <div className="text-sm text-gray-500">
                          {task?.tdes}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{task?.tassignTo}</div>
                    <div className="text-sm text-gray-500">{task?.author}</div>
                  </td>
              <td className="px-6 py-4 whitespace-nowrap">

                {
                  task?.tproces === "todo" ? <span
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-black">
                    TO DO
                </span>
                      :
                      task?.tproces === "inProgress" ? <span
                              className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-500">
                    IN PROGRESS
                </span>
                          :
                          <span
                              className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    DONE
                </span>
                }


              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {task?.tdate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {task?.teamId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                    <a href="#"
                       className="bg-blue-500 px-2 py-1 rounded text-white duration-500 hover:bg-blue-800 hover:shadow-xl">Edit</a>
                    <a href="#"
                       className="ml-2 bg-red-500 px-2 py-1 rounded text-white duration-500 hover:bg-red-800 hover:shadow-xl">Delete</a>
                  </td>
                </tr>
            )
          }


          </tbody>
        </table>

      </div>
  );
};

export default TableView;
