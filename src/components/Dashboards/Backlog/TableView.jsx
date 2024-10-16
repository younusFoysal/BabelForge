"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.css";
import { IoCloseCircle } from "react-icons/io5";
import Swal from "sweetalert2";
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import useAxiosCommon from "@/lib/axiosCommon";

const TableView = ({ tasks, handleDelete, handleEditTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({}); // For storing task data to edit
  const session = useSession();
  const useremail = session?.data?.user?.email
  const axiosCommon = useAxiosCommon();


  let num = 1;

  // Open modal for viewing task details
  const handleView = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Close detail modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  // Open modal for editing task
  const handleEdit = (task) => {
    setFormData(task); // Pre-fill form data with the selected task
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setFormData({});
  };

  // Handle input changes in the edit modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit to update task
  const handleSubmitEdit = async () => {
    try {
      await handleEditTask(formData);
      closeEditModal();
    } catch (err) {
      console.error(err);
    }
  };

  // team/teams/my-teams/useremail
  // http://localhost:5000/team/teams/my-teams/foysaal@mail.com

  // Fetch tasks data
  const { data: uteams = [], isLoading, refetch } = useQuery({
    queryKey: ['uteams'],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/team/teams/my-teams/${useremail}`);
      return data;
    },
  });

  console.log("uteams:",uteams)




  return (
      <div>
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Num
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assigned to
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Start
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Team
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {tasks?.map((task) => (
              <tr key={task._id}>
                <td className="px-6 py-4 whitespace-nowrap">{num++}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{task?.tname}</div>
                  <div className="text-sm text-gray-500">{task?.tdes}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{task?.tassignTo}</div>
                  <div className="text-sm text-gray-500">{task?.author}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    task?.tproces === "todo" ? "bg-gray-100 text-black" :
                        task?.tproces === "inProgress" ? "bg-blue-100 text-blue-500" :
                            "bg-green-100 text-green-800"
                }`}>
                  {task?.tproces.toUpperCase()}
                </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                  {task?.tdate}
                  <br/>
                  <span className="text-sm text-gray-500">{task?.ttime} </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{task?.teamId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                      className="mr-2 bg-blue-500 px-2 py-1 rounded text-white hover:bg-blue-800"
                      onClick={() => handleView(task)}
                  >
                    Details
                  </button>
                  <button
                      className="mr-2 bg-yellow-500 px-2 py-1 rounded text-white hover:bg-yellow-700"
                      onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                      className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-800"
                      onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        {/* Task Edit Modal */}
        {isEditModalOpen && (
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                contentLabel="Edit Task Modal"
                className="modal-dialog"
                overlayClassName="modal-overlay"
            >
              <div className="modal-content">
                <div className="modal-header flex justify-between text-xl mb-4">
                  <h5 className="modal-title">Edit Task</h5>
                  <button type="button" className="close" onClick={closeEditModal}>
                    <IoCloseCircle className="text-2xl text-purple-600"/>
                  </button>
                </div>
                <div className="modal-body">
                  <input
                      type="text"
                      name="tname"
                      value={formData.tname}
                      onChange={handleInputChange}
                      placeholder="Task Name"
                      className="p-2 border rounded-lg w-full mb-4"
                  />
                  <input
                      type="text"
                      name="tdes"
                      value={formData.tdes}
                      onChange={handleInputChange}
                      placeholder="Task Description"
                      className="p-2 border rounded-lg w-full mb-4"
                  />
                  <input
                      type="text"
                      name="tassignTo"
                      value={formData.tassignTo}
                      onChange={handleInputChange}
                      placeholder="Assign To"
                      className="p-2 border rounded-lg w-full mb-4"
                  />

                  <select
                      name="teamId"
                      value={formData.teamId}
                      onChange={handleInputChange}
                      className="p-2 border rounded-lg w-full mb-4"
                  >
                    <option value="">Select Team</option>

                    {uteams?.map((team) => (
                        <option key={team._id} value={team.tname}>{team.tname}</option>
                    ))}

                  </select>

                  <select
                      name="tproces"
                      value={formData.tproces}
                      onChange={handleInputChange}
                      className="p-2 border rounded-lg w-full mb-4"
                  >
                    <option value="todo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      onClick={handleSubmitEdit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </Modal>
        )}

        {/* Task Details Modal */}
        {selectedTask && (
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Task Details Modal"
                className="modal-dialog"
                overlayClassName="modal-overlay"
            >
              <div className="modal-content">
                <div className="modal-header flex justify-between text-xl mb-4">
                  <h5 className="modal-title">{selectedTask.tname}</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    <IoCloseCircle className="text-2xl text-blue-700"/>
                  </button>
                </div>
                <div className="modal-body">
                  <p><span className="font-bold">Description:</span> {selectedTask.tdes}</p>
                  <p><span className="font-bold">Assigned To:</span>  {selectedTask.tassignTo}</p>
                  <p><span className="font-bold">Process:</span>

                    {selectedTask?.tproces === "todo" ? "📝 TODO" : selectedTask?.tproces === "done" ? "✅ DONE" : "⏰ IN PROGRESS"}

                  </p>
                  {/* Display other task details */}
                </div>
              </div>
            </Modal>
        )}
      </div>
  );
};

export default TableView;
