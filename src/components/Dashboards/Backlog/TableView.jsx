'use client';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './modal.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosCommon from '@/lib/axiosCommon';
import { useUser } from '@clerk/nextjs';
import noData from '@/image/Team/no-data.svg';
import userPhoto from '@/image/icon/user.png';
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
import { MdAccessTimeFilled, MdAddTask, MdAssignmentTurnedIn, MdOutlineAssignmentInd } from 'react-icons/md';
import Image from 'next/image';
import { Panel, PanelResizeHandle, PanelGroup } from 'react-resizable-panels';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from 'next-themes';
import { TagsInput } from 'react-tag-input-component';
import { FaBookOpen } from 'react-icons/fa6';
import { RiTeamFill } from 'react-icons/ri';
import { BsCalendarDateFill } from 'react-icons/bs';
import { IoCloseSharp } from 'react-icons/io5';
import { toast } from '@/hooks/use-toast';
import ImageWithFallback from '@/components/ImageWithFallback';

const TableView = ({ tasks, refetch: taskRefetch, handleDelete, handleEditTask }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const { user } = useUser();
  const axiosCommon = useAxiosCommon();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  const useremail = uemail;
  const { resolvedTheme } = useTheme();
  const [emails, setEmails] = useState([]);
  const [openComment, setOpenComment] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [comment, setComment] = useState('');

  // set email
  useEffect(() => {
    setEmails([formData?.tassignTo]);
  }, [formData]);

  let num = 1;

  // Genarete ID
  const createUniqueId = () => {
    return crypto.randomUUID();
  };

  // Get date and time
  useEffect(() => {
    const now = new Date();
    // Convert to GMT+6
    const gmt6Offset = 6 * 60 * 60 * 1000;
    const gmt6Date = new Date(now.getTime() + gmt6Offset);

    // Format date as YYYY-MM-DD
    const year = gmt6Date.getUTCFullYear();
    const month = String(gmt6Date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(gmt6Date.getUTCDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    // Format time as HH:MM AM/PM
    let hours = gmt6Date.getUTCHours();
    const minutes = String(gmt6Date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
    // Set the formatted date and time
    setCurrentDate(formattedDate);
    setCurrentTime(formattedTime);
  }, [formData]);

  // Close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setFormData({});
  };

  // Fetch tasks data
  const { data: uteams = [] } = useQuery({
    queryKey: ['uteams'],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/team/teams/my-teams/${useremail}`);
      return data;
    },
  });

  // Add Comment
  const { mutateAsync: addComment } = useMutation({
    mutationFn: async task => {
      const taskWithoutID = { ...task };
      delete taskWithoutID.tasID;
      const { data } = await axiosCommon.patch(`task/tasks/add/comment/${task.tasID}`, taskWithoutID);
      return data;
    },
    onSuccess: () => {
      toast({
        description: 'Comment added!',
        variant: 'success',
      });
      setComment('');
      taskRefetch();
    },
    onError: err => {
      toast({
        description: err.message,
        variant: 'error',
      });
    },
  });

  const handleAddComment = async (_id, e) => {
    e.preventDefault();
    const commentID = createUniqueId();
    const updatedComments = [
      ...formData?.tcomments,
      {
        comment: e.target.comment.value,
        commentName: user.firstName,
        commentBy: useremail,
        commentDate: currentDate,
        commentTime: currentTime,
        commentByPic: user.imageUrl,
        _id: commentID,
      },
    ];
    // Update the formData state with the new comments array
    setFormData(prevData => ({
      ...prevData,
      tcomments: updatedComments,
    }));

    const newComment = {
      tasID: _id,
      comment: e.target.comment.value,
      commentName: user.firstName,
      commentBy: useremail,
      commentDate: currentDate,
      commentTime: currentTime,
      commentByPic: user.imageUrl,
      _id: commentID,
    };
    await addComment(newComment);
    setComment('');
    setOpenComment(false);
  };

  // Delete Comment function
  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: async ({ commentID, taskID }) => {
      const { data } = await axiosCommon.delete(`task/tasks/comments?taskID=${taskID}&commentID=${commentID}`);
      return data;
    },
    onSuccess: () => {
      taskRefetch();
      toast({
        description: 'Comment deleted',
        variant: 'success',
      });
    },
    onError: () => {
      toast({
        description: 'Failed to delete the task!',
        variant: 'error',
      });
    },
  });

  // Delete Comment
  const handleCommentDelete = (commentID, taskID) => {
    deleteMutation({ commentID, taskID });
    const updatedComments = formData.tcomments.filter(comment => comment._id != commentID);
    setFormData(prevData => ({
      ...prevData,
      tcomments: [...updatedComments],
    }));
    taskRefetch();
  };

  const handelFormSubmit = async e => {
    e.preventDefault();
    const teamInfo = e.target.teamInfo.value;
    const [teamId, teamName] = teamInfo.split('|');

    const tname = e.target.tname.value;
    const tproces = e.target.tproces.value;
    const tdes = e.target.tdes.value;
    const tdate = formData.tdate;
    const ttime = formData.ttime;
    const author = formData.author;
    const tassignTo = emails;
    const tcomments = formData.tcomments;
    const _id = formData._id;
    const data = {
      _id,
      tname,
      teamName,
      teamId,
      tproces,
      tdes,
      tdate,
      ttime,
      author,
      tassignTo,
      tcomments,
    };
    console.log(data);
    setFormData({ ...data });
    try {
      await handleEditTask(data);
      closeEditModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="w-full overflow-auto">
        {tasks?.length === 0 && (
          <div className="flex flex-col mt-[60px] w-full items-center justify-center">
            <Image className="w-[300px] h-auto" src={noData} alt="No data" height={100} width={100} />
            <p className="text-[26px] font-semibold mt-6">No task found !</p>
          </div>
        )}
        {!tasks?.length == 0 && (
          <table className="w-full divide-y dark:divide-gray-700 divide-gray-200">
            <thead className="bg-gray-50 dark:text-white dark:bg-[#200e3be2] backdrop-blur-[100px]">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Num</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                  Assigned to
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Start</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-[#181024] divide-y dark:divide-gray-700 divide-gray-200">
              {tasks?.map(task => (
                <tr key={task._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{num++}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      {task?.tname?.length > 20 ? task?.tname.substr(0, 15) + '...' : task?.tname}
                    </div>
                    <div className="text-sm text-gray-400">{task?.tdes?.length > 20 ? task?.tdes.substr(0, 20) + '...' : task?.tdes}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-200">
                      {Array.isArray(task?.tassignTo) ? task.tassignTo[0] : task?.tassignTo}
                    </div>
                    <div className="text-sm text-gray-400">{task?.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        task?.tproces === 'todo'
                          ? 'bg-gray-100 text-black'
                          : task?.tproces === 'inProgress'
                          ? 'bg-blue-100 text-blue-500 dark:bg-blue-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-200'
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-gray-200">{task?.teamName}</td>
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
      </div>
      {/* Task Edit Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          contentLabel="Edit Task Modal"
          className="modal-dialog bg-white dark:bg-[#181024]"
          overlayClassName="modal-overlay"
        >
          <div className="w-7xl rounded-2xl dark:bg-[#181024] dark:text-white relative z-[999] py-0 max-h-[80%]  px-4">
            <div className="py-6 w-full left-0 z-10 sticky px-4 top-0 dark:bg-[#181024] dark:text-white bg-white">
              <div className="flex justify-between items-center">
                <span className="text-[16px] flex items-center gap-2">
                  <MdAddTask className="text-[18px]" />
                  {formData?.tname} <span> / </span>
                  <span
                    className={`${formData?.tproces == 'todo' && 'bg-orange-600'} ${
                      formData?.tproces == 'inProgress' && 'bg-yellow-500'
                    } uppercase bg-green-700 py-[4px] rounded-[3px] px-[5px] text-white text-[11px]`}
                  >
                    {formData?.tproces == 'inProgress' ? 'In Progress' : formData?.tproces}
                  </span>
                </span>
                <button onClick={() => closeEditModal()} className="text-[24px] top-4 z-20  hover:scale-110 duration-300 hover:rotate-180">
                  <IoCloseSharp />
                </button>
              </div>
            </div>
            <PanelGroup autoSaveId="example" direction="horizontal">
              <Panel minSize={40} defaultSize={50}>
                <div className="px-4 h-full custom-scroll overflow-y-auto">
                  <h2>Edit Task</h2>
                  <div className="grid gap-5 grid-cols-9">
                    <div className="col-span-9">
                      <p className="font-light text-[14px] mb-3">
                        Bring everyone together with one team you can @mention, filter, and assign work to.
                      </p>
                      <form onSubmit={handelFormSubmit}>
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
                              defaultValue={formData?.tname}
                              // onChange={handleInputChange}
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
                              defaultValue={formData?.tproces}
                              // onChange={handleInputChange}
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
                              name="teamInfo"
                              id="teamId"
                            >
                              <option selected disabled>
                                Select Team
                              </option>
                              {uteams?.map(team => (
                                <option key={team._id} value={`${team._id}|${team.tname}`}>
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
                              required
                              defaultValue={formData?.tdes}
                              placeholder="Tell us about your team"
                              id="tdes"
                              name="tdes"
                              className="col-span-3"
                            />
                          </div>
                          <div className="flex items-center gap-3 justify-end">
                            <button
                              type="submit"
                              // onClick={handleSubmitEdit}
                              className="px-7 py-2 capitalize bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center group ${className} dark:bg-gray-50 text-white"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Panel>
              <PanelResizeHandle className="w-[2px] hidden md:block mx-4 bg-[#95959583] dark:bg-[#3e1878] hover:bg-blue-400" />
              <Panel className="hidden md:block" minSize={30} defaultSize={50}>
                <div className="">
                  <div className="px-4 dark:text-white space-y-3 border py-4 h-full rounded border-[#b7b7b7]">
                    <p className="flex gap-5">
                      <span className="text-[15px] flex dark:text-white  text-[#111]">
                        <MdAssignmentTurnedIn className="mr-2 text-green-600 text-[20px]" /> Assigned to :
                      </span>
                      <span className="flex text-[14px] flex-col gap-2">
                        {formData?.tassignTo?.map((item, idx) => {
                          return (
                            <span key={idx}>
                              {idx + 1} . {item}
                            </span>
                          );
                        })}
                      </span>
                    </p>
                    <p className="flex gap-5">
                      <span className="text-[14px] items-center flex dark:text-white text-[#111]">
                        <FaBookOpen className="mr-2 text-blue-400 text-[18px]" /> Author :
                      </span>
                      <span className="text-[13px]">{formData?.author}</span>
                    </p>
                    <p className="flex gap-5 ">
                      <span className="text-[14px] items-center flex dark:text-white text-[#111]">
                        <RiTeamFill className="mr-2 text-yellow-600 text-[18px]" /> Team :
                      </span>
                      <span className="text-[13px]">{formData?.teamName}</span>
                    </p>
                    <p className="flex gap-5 ">
                      <span className="text-[14px] items-center flex dark:text-white text-[#111]">
                        <BsCalendarDateFill className="mr-2 text-yellow-600 text-[18px]" /> Created at :
                      </span>
                      <span className="text-[13px]">{formData?.tdate}</span>
                    </p>
                    <p className="flex gap-5 ">
                      <span className="text-[14px] items-center flex dark:text-white text-[#111]">
                        <MdAccessTimeFilled className="mr-2 text-yellow-600 text-[18px]" /> Created on :
                      </span>
                      <span className="text-[13px]">{formData?.ttime}</span>
                    </p>
                  </div>
                  {/* Comment section */}
                  <div className="rounded mt-5">
                    {/* Post comment box */}
                    <div className="flex mb-5 gap-3 items-start">
                      <ImageWithFallback
                        fallbackSrc={userPhoto}
                        src={user?.imageUrl}
                        width={30}
                        height={30}
                        className=" rounded-full"
                        alt="User Photo"
                      />
                      <div className="w-full">
                        <form onSubmit={e => handleAddComment(formData?._id, e)}>
                          <Textarea
                            onFocus={() => setOpenComment(true)}
                            required={true}
                            onChange={e => setComment(e.target.value)}
                            type="text"
                            value={comment}
                            name="comment"
                            placeholder="Write a comment..."
                            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-600 text-[14px] transition-all duration-300"
                          />
                          {openComment && (
                            <div className="flex items-center gap-1 mt-3">
                              <button
                                type="submit"
                                className="px-3 text-[13px] font-semibold py-1 ml-1 text-white rounded-md transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-blue-400"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setOpenComment(false)}
                                className="px-3 py-1 text-[13px] font-semibold ml-1 text-dark bg-gray-100 rounded-md transition-all duration-300 "
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </form>
                      </div>
                    </div>
                    {/* Single comment section */}
                    <div>
                      {formData?.tcomments?.map(comment => (
                        <div key={comment.comment} className="flex mb-3 gap-3 items-start">
                          <ImageWithFallback
                            fallbackSrc={userPhoto}
                            src={comment?.commentByPic}
                            width={30}
                            height={30}
                            className=" rounded-full"
                            alt="User Photo"
                          />
                          <div className="w-full ">
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2 items-center text-[14px] font-semibold">
                                <p className="text-[#42526E] font-semibold">{comment?.commentName}</p>
                                <p className="text-[13px] font-normal opacity-60">{comment?.commentDate}</p>
                                <span className=" opacity-70">|</span>
                                <p className="text-[13px] font-semibold opacity-60">{comment?.commentTime}</p>
                              </div>
                              {comment?.commentBy == useremail && (
                                <div>
                                  <button
                                    onClick={() => handleCommentDelete(comment._id, formData._id)}
                                    className="flex text-[12px] hover:text-red-600 items-center justify-center"
                                  >
                                    <span>Delete</span>
                                  </button>
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="my-1 text-[14px]">{comment?.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TableView;
