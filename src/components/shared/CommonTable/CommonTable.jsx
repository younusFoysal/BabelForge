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
import { toast } from '@/hooks/use-toast';
import Alert from '@/components/shared/Alert';
import Link from "next/link";

const CommonTable = ({ theads, tdata, projectRefetch, inboxRefetch }) => {
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;

  const userEmail = uemail;

  const router = useRouter();
  const path = usePathname();
  const axiosCommon = useAxiosCommon();
  // console.log("path: ", path);
  const [currentDate, setCurrentDate] = useState('');

  // useeffects
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

    // Set the formatted date and time
    setCurrentDate(formattedDate);
  }, []);

  const handleFavorite = (data) => {
    console.log(data);
    axiosCommon
      .patch(`project/projects/update/${data._id}`, {
        favorite: !data.favorite,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.modifiedCount) {
          // console.log(res);
          projectRefetch();

          !data.favorite ?
            toast({
              description: 'Project Added To Favorite',
              variant: 'success',
            }) :
            toast({
              description: 'Project Removed From Favorite',
              variant: 'success',
            })
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
    // console.log(id);

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);

    axiosCommon.patch(`project/projects/update/${id}`, { pedate: currentDate })
      .then(res => {
        // console.log(res);
        if (res.data.modifiedCount) {
          // console.log(res);
          projectRefetch();
          toast({
            description: 'Project Ended',
            variant: 'success',
          });
        }
      })
  }

  const handleDeleteProject = (id) => {
    axiosCommon.delete(`project/projects/${id}`)
      .then(res => {
        // console.log(res);
        if (res.data.deletedCount) {
          // console.log(res);
          projectRefetch();
          toast({
            description: 'Project Deleted',
            variant: 'success',
          });
        }
        else {
          toast({
            description: 'Something went wrong',
            variant: 'error',
          });
        }
      })
  }

  return (
    <div className="mt-8">
      <Table className="text-center">
        {/* table header */}
        <TableHeader className="text-black font-bold dark:text-white">
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

        <TableBody className="w-full">
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
                  <TableCell>{data.pmanager}</TableCell>
                  <TableCell><Link href={data.purl} target="_blank" className="hover:text-blue-600">{data.purl}</Link></TableCell>
                  <TableCell>{data.psdate}</TableCell>
                  <TableCell>{data.pedate}</TableCell>
                  <TableCell>
                    {userEmail === data.pmanager && (
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Ellipsis></Ellipsis>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <p
                              onClick={() =>
                                router.push(`/dashboard/projects/${data._id}`)
                              }
                            >
                              Update Project
                            </p>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            {/* <p onClick={() => handleEndProject(data._id)} > End Project </p> */}
                            <Alert title='Are you absolutely sure?'
                              description='This action cannot be undone  and the project will be deleted!' onContinue={() => handleDeleteProject(data._id)}>
                              {openDialog => (
                                <button
                                  className="w-full text-left"
                                  onClick={e => {
                                    e.stopPropagation();
                                    openDialog();
                                  }}
                                >
                                  Delete Project
                                </button>
                              )}
                            </Alert>
                          </DropdownMenuItem>

                          {
                            !data.pedate && <DropdownMenuItem>
                              {/* <p onClick={() => handleEndProject(data._id)} > End Project </p> */}
                              <Alert title='Are you absolutely sure?'
                                description='This action cannot be undone. This will end the project' onContinue={() => handleEndProject(data._id)}>
                                {openDialog => (
                                  <button
                                    className="w-full text-left"
                                    onClick={e => {
                                      e.stopPropagation();
                                      openDialog();
                                    }}
                                  >
                                    End Project
                                  </button>
                                )}
                              </Alert>
                            </DropdownMenuItem>
                          }

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
    </div >
  );
};

export default CommonTable;