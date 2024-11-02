"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { Ellipsis } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import useAxiosCommon from "@/lib/axiosCommon";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import Alert from "@/components/shared/Alert";
import Link from "next/link";
import usePerson from "@/hooks/usePerson";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const CommonTable = ({ theads, tdata, projectRefetch, inboxRefetch }) => {
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  const userEmail = uemail;

  const router = useRouter();
  const path = usePathname();
  const axiosCommon = useAxiosCommon();
  const [currentDate, setCurrentDate] = useState("");
  const [showManager, setShowManager] = useState(false);
  const [managerEmail, setManagerEmail] = useState("");

  const [person] = usePerson(managerEmail);

  // useeffects
  useEffect(() => {
    const now = new Date();

    // Convert to GMT+6
    const gmt6Offset = 6 * 60 * 60 * 1000;
    const gmt6Date = new Date(now.getTime() + gmt6Offset);

    // Format date as YYYY-MM-DD
    const year = gmt6Date.getUTCFullYear();
    const month = String(gmt6Date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(gmt6Date.getUTCDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    // Set the formatted date and time
    setCurrentDate(formattedDate);
  }, []);

  const handleFavorite = (data) => {
    axiosCommon
      .patch(`project/projects/update/${data._id}`, {
        favorite: !data.favorite,
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          projectRefetch();

          !data.favorite
            ? toast({
                description: "Project Added To Favorite",
                variant: "success",
              })
            : toast({
                description: "Project Removed From Favorite",
                variant: "success",
              });
        }
      });
  };

  const handleDelete = (id) => {
    axiosCommon.delete(`/message/messages/${id}`).then((res) => {
      if (res.data.deletedCount) {
        inboxRefetch();
        toast.success("Message Deleted!");
      }
    });
  };

  const handleEndProject = (id) => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);

    axiosCommon
      .patch(`project/projects/update/${id}`, { pedate: currentDate })
      .then((res) => {
        if (res.data.modifiedCount) {
          projectRefetch();
          toast({
            description: "Project Ended",
            variant: "success",
          });
        }
      });
  };

  const handleDeleteProject = (id) => {
    axiosCommon.delete(`project/projects/${id}`).then((res) => {
      if (res.data.deletedCount) {
        projectRefetch();
        toast({
          description: "Project Deleted",
          variant: "success",
        });
      } else {
        toast({
          description: "Something went wrong",
          variant: "error",
        });
      }
    });
  };
  const handleManager = (email) => {
    setShowManager(true);
    setManagerEmail(email);
  };
  const handleClose = () => {
    setShowManager(false);
  };
  // if (isLoading) return <LoadingSpinner></LoadingSpinner>
  // const { firstName, lastName, email, image_url } = person?.data;
  return (
    <div className="mt-8">
      <Table className="text-center">
        {/* table header */}
        <TableHeader className="text-black font-bold dark:text-white dark:bg-[#200e3be2] rounded-xl">
          <TableRow>
            {theads?.map((thead, index) =>
              thead === "Fav" ? (
                <TableHead key={index}>
                  <FaStar className="text-black text-lg dark:text-white"></FaStar>
                </TableHead>
              ) : (
                <TableHead
                  key={index}
                  className="font-semibold text-black text-center dark:text-white"
                >
                  {thead}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>

        <TableBody className="w-full dark:bg-[#181024] rounded-xl">
          {/* table row */}
          {tdata?.map((data, idx) => (
            <TableRow
              key={data._id}
              className="border-y-2 border-gray-300 w-full"
            >
              {/*view all project table */}
              {path === "/dashboard/projects" && (
                <>
                  <TableCell
                    onClick={() => handleFavorite(data)}
                    className="text-lg"
                  >
                    {data?.favorite ? (
                      <FaStar className="fill-yellow-500" />
                    ) : (
                      <FaRegStar />
                    )}
                  </TableCell>

                  <TableCell>
                    <p className="rounded-full p-1">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={data.pimg} />
                        <AvatarFallback>TBA</AvatarFallback>
                      </Avatar>
                    </p>
                  </TableCell>
                  <TableCell
                    className="cursor-pointer hover:text-blue-600"
                    onClick={() =>
                      router.push(`/dashboard/project/${data._id}`)
                    }
                  >
                    {data.pname}
                  </TableCell>
                  <TableCell>{data.pcategory}</TableCell>
                  <TableCell
                    className="cursor-pointer hover:text-blue-600"
                    onClick={() => handleManager(data.pmanager)}
                  >
                    {data.pmname}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={data.purl}
                      target="_blank"
                      className="hover:text-blue-600"
                    >
                      {data.purl.length > 20
                        ? `${data.purl.substring(0, 20)}...`
                        : data.purl}
                    </Link>
                  </TableCell>
                  <TableCell>{data.psdate}</TableCell>
                  <TableCell>{data.pedate}</TableCell>
                  <TableCell>
                    {userEmail === data.pmanager && (
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Ellipsis></Ellipsis>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {!data.pedate && (
                            <DropdownMenuItem>
                              <p
                                onClick={() =>
                                  router.push(`/dashboard/projects/${data._id}`)
                                }
                              >
                                Update Project
                              </p>
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuItem>
                            {/* <p onClick={() => handleEndProject(data._id)} > End Project </p> */}
                            <Alert
                              title="Are you absolutely sure?"
                              description="This action cannot be undone  and the project will be deleted!"
                              onContinue={() => handleDeleteProject(data._id)}
                            >
                              {(openDialog) => (
                                <button
                                  className="w-full text-left"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openDialog();
                                  }}
                                >
                                  Delete Project
                                </button>
                              )}
                            </Alert>
                          </DropdownMenuItem>

                          {!data.pedate && (
                            <DropdownMenuItem>
                              {/* <p onClick={() => handleEndProject(data._id)} > End Project </p> */}
                              <Alert
                                title="Are you absolutely sure?"
                                description="This action cannot be undone. This will end the project"
                                onContinue={() => handleEndProject(data._id)}
                              >
                                {(openDialog) => (
                                  <button
                                    className="w-full text-left"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openDialog();
                                    }}
                                  >
                                    End Project
                                  </button>
                                )}
                              </Alert>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </>
              )}

              {/* view admin inbox */}

              {path === "/dashboard/admin/inbox" && (
                <>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{data.firstName + " " + data.lastName}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.phone}</TableCell>
                  <TableCell>{data.companyName}</TableCell>
                  <TableCell>{data.mdate}</TableCell>
                  <TableCell>{data.mtime}</TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Ellipsis></Ellipsis>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <p>View</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <p onClick={() => handleDelete(data._id)}>Delete</p>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal to display manager details */}
      {showManager && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 dark:bg-gray-800 dark:text-gray-300 dark:border-white/30 dark:hover:shadow-white/20">
            <div className="border-b px-4 py-2 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Project Manager Info</h3>
              <button
                className="text-black close focus:outline-none"
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            <div className="p-4 flex flex-col items-center justify-center space-y-3">
              <div className="rounded-full p-1">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={person?.data?.image_url} />
                  <AvatarFallback>TBA</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center">
                <p>
                  <strong>Name: </strong>{" "}
                  {person?.data?.firstName + " " + person?.data?.lastName}
                </p>
                <p>
                  <strong>Email: </strong> {person?.data?.email}
                </p>
              </div>
            </div>
            <div className="flex justify-end p-4">
              <button
                className="px-6 py-3 capitalize bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md transition-all duration-500 text-sm hover:scale-105"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonTable;
