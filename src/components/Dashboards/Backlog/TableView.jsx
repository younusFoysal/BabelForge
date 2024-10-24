'use client';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './modal.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '@/lib/axiosCommon';
import { useUser } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';
import noData from '@/image/Team/no-data.svg';
import { TfiWrite } from 'react-icons/tfi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Alert from '@/components/shared/Alert';
import { MdAddTask, MdAssignmentInd, MdAssignmentTurnedIn, MdOutlineAssignmentInd } from 'react-icons/md';
import Image from 'next/image';
import { Panel, PanelResizeHandle, PanelGroup } from 'react-resizable-panels';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from 'next-themes';
import { TagsInput } from 'react-tag-input-component';
import { FaBookOpen } from 'react-icons/fa6';
import { RiTeamFill } from 'react-icons/ri';

const TableView = ({ tasks, handleDelete, handleEditTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const { user } = useUser();
  const axiosCommon = useAxiosCommon();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  const useremail = uemail;
  const { toast } = useToast();
  const { resolvedTheme } = useTheme();
  const [emails, setEmails] = useState([]);

  // set email
  useEffect(() => {
    setEmails([formData?.tassignTo]);
  }, [formData]);

  let num = 1;
  // Close detail modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  // Open modal for editing task
  const handleEdit = task => {
    setFormData(task);
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setFormData({});
  };

  // Handle input changes in the edit modal
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value, tassignTo: emails }));
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

  // Fetch tasks data
  const {
    data: uteams = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['uteams'],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/team/teams/my-teams/${useremail}`);
      return data;
    },
  });

  return (
    <div>
      <div className="w-full overflow-scroll">
        {tasks?.length == 0 && (
          <div className="flex flex-col mt-[60px] w-full items-center justify-center">
            <Image className="w-[300px] h-auto" src={noData} alt="No data" height={100} width={100} />
            <p className="text-[26px] font-semibold mt-6">No task found !</p>
          </div>
        )}
        {!tasks?.length == 0 && (
          <table className="w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50 dark:text-white dark:bg-[#ffffff4f] backdrop-blur-[100px]">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Num</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Assigned to</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Start</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200">
              {tasks?.map(task => (
                <tr key={task._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{num++}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{task?.tname}</div>
                    <div className="text-sm text-gray-400">{task?.tdes}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-200">{Array.isArray(task?.tassignTo) ? task.tassignTo[0] : task?.tassignTo}</div>
                    <div className="text-sm text-gray-400">{task?.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        task?.tproces === 'todo'
                          ? 'bg-gray-100 text-black'
                          : task?.tproces === 'inProgress'
                          ? 'bg-blue-100 text-blue-500'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {task?.tproces.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-gray-200">
                    {task?.tdate}
                    <br />
                    <span className="text-sm text-gray-500">{task?.ttime} </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-gray-200">{task?.teamId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <button
                            onClick={() => {
                              setFormData(task);
                              setIsEditModalOpen(true);
                            }}
                            className="w-full text-left"
                          >
                            Edit
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Alert onContinue={() => handleDelete(task._id)}>
                            {openDialog => (
                              <button
                                className="w-full text-left"
                                onClick={e => {
                                  e.stopPropagation();
                                  openDialog();
                                }}
                              >
                                Delete
                              </button>
                            )}
                          </Alert>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            navigator.clipboard.writeText(
                              `Task : ${task.tname} , Assigned : ${task.tassignTo},Status : ${task.tproces} , Start Date : ${task.tdate} , Assigned Teams : ${task.teamId}`
                            )
                          }
                        >
                          Copy Task Info
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Task Edit Modal */}
        {isEditModalOpen && (
          <Modal
            isOpen={isEditModalOpen}
            onRequestClose={closeEditModal}
            contentLabel="Edit Task Modal"
            className="modal-dialog"
            overlayClassName="modal-overlay"
          >
            <div className="w-7xl relative z-[999] py-0 max-h-[80%]   px-4">
              <div className="py-6 w-full left-0 sticky px-4 top-0 dark:bg-black dark:text-white bg-white">
                <div>
                  <span className="text-[16px] flex items-center gap-2">
                    <MdAddTask className="text-[18px]" />
                    {formData.tname} <span> / </span>
                    <span
                      className={`${formData.tproces == 'todo' && 'bg-orange-600'} ${
                        formData.tproces == 'inProgress' && 'bg-yellow-500'
                      } uppercase bg-green-700 py-[4px] rounded-[3px] px-[5px] text-white text-[11px]`}
                    >
                      {formData.tproces == 'inProgress' ? 'In Progress' : formData.tproces}
                    </span>
                  </span>
                </div>
              </div>
              <PanelGroup autoSaveId="example" direction="horizontal">
                <Panel className="" minSize={40} defaultSize={50}>
                  <div className="px-4 h-full overflow-scroll">
                    <h2>Edit Task</h2>
                    <div className="grid gap-5 grid-cols-9">
                      <div className="col-span-9">
                        <p className="font-light text-[14px] mb-3">
                          Bring everyone together with one team you can @mention, filter, and assign work to.
                        </p>
                        <div className="space-y-[12px]">
                          <div className="">
                            <Label htmlFor="tname" className="text-left text-[11px] mb-[6px] block font-semibold">
                              Task Name <span className="text-red-600">*</span>
                            </Label>
                            <Input
                              required
                              className="py-2"
                              placeholder="e.g. Bug Fix , Update UI"
                              id="tname"
                              name="tname"
                              defaultValue={formData.tname}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="">
                            <Label htmlFor="members" className="text-left text-[11px] mb-[6px] block font-semibold">
                              Assign Task
                            </Label>
                            <div className={resolvedTheme === 'dark' && 'parent_Tags'}>
                              <TagsInput
                                required
                                type="email"
                                id="members"
                                classNames="w-full"
                                value={Array.isArray(emails[0]) ? emails[0] : emails}
                                onChange={setEmails}
                                name="members"
                                placeHolder="Enter emails here"
                              />
                            </div>
                            <span className="text-[11px]">Press enter to add more</span>
                          </div>
                          {/* Task State */}
                          <div>
                            <Label htmlFor="tproces" className="text-left text-[11px] mb-[6px] block font-semibold">
                              Task State
                            </Label>
                            <select
                              required
                              name="tproces"
                              defaultValue={formData.tproces}
                              onChange={handleInputChange}
                              className="w-full py-[11px] dark:text-white dark:border-transparent dark:bg-black text-[14px] px-[12px]  text-[#777] bg-transparent border rounded-md"
                            >
                              <option value="todo">To Do</option>
                              <option value="inProgress">In Progress</option>
                              <option value="done">Done</option>
                            </select>
                          </div>
                          {/* Select Team */}
                          <div>
                            <Label htmlFor="teamId" className="text-left text-[11px] mb-[6px] block font-semibold">
                              Select Team
                            </Label>
                            <select
                              className="w-full py-[11px] dark:text-white dark:border-transparent dark:bg-black text-[14px] px-[12px]  text-[#777] bg-transparent border rounded-md"
                              name="teamId"
                              id="teamId"
                              onChange={handleInputChange}
                            >
                              <option selected disabled>
                                Select Team
                              </option>
                              {uteams?.map(team => (
                                <option key={team._id} value={team.tname}>
                                  {team.tname}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="">
                            <Label htmlFor="tdes" className="text-left text-[11px] mb-[6px] block font-semibold">
                              Task Description <span className="text-red-600">*</span>
                            </Label>
                            <Textarea
                              onChange={handleInputChange}
                              required
                              defaultValue={formData.tdes}
                              placeholder="Tell us about your team"
                              id="tdes"
                              name="tdes"
                              className="col-span-3"
                            />
                          </div>
                          <div className="flex items-center gap-3 justify-end">
                            <button
                              onClick={handleSubmitEdit}
                              className="bg-bgColor dark:hover:shadow-bgColor/30 hover:bg-bgHoverColor text-white text-md  duration-500  hover:shadow-lg hover:shadow-blue-200 font-medium px-4 py-2 rounded-md"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Panel>
                <PanelResizeHandle className="w-[2px] mx-2 bg-blue-400" />
                <Panel minSize={30} defaultSize={50}>
                  <div className="">
                    <div className="px-4 border py-4 h-full rounded border-[#b7b7b7]">
                      <p className="flex gap-5">
                        <span className="text-[15px] flex  text-[#111]">
                          <MdAssignmentTurnedIn className="mr-2 text-green-600 text-[20px]" /> Assigned to :
                        </span>
                        <span className="flex text-[14px] flex-col gap-2">
                          {formData?.tassignTo.map((item, idx) => {
                            return (
                              <span key={idx}>
                                {idx + 1} . {item}
                              </span>
                            );
                          })}
                        </span>
                      </p>
                      <p className="flex gap-5 mt-3">
                        <span className="text-[14px] items-center flex  text-[#111]">
                          <FaBookOpen className="mr-2 text-blue-400 text-[18px]" /> Author :
                        </span>
                        <span className="text-[13px]">{formData.author}</span>
                      </p>
                      <p className="flex gap-5 mt-3">
                        <span className="text-[14px] items-center flex  text-[#111]">
                          <RiTeamFill className="mr-2 text-yellow-600 text-[18px]" /> Team :
                        </span>
                        <span className="text-[13px]">{formData.teamId}</span>
                      </p>
                    </div>
                  </div>
                </Panel>
              </PanelGroup>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TableView;
