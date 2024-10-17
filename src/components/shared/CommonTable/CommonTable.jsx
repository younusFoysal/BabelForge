"use client"
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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { Ellipsis, Link } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import useAxiosCommon from "@/lib/axiosCommon";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";



const CommonTable = ({ theads, tdata, projectRefetch, inboxRefetch }) => {

    const session = useSession();
    const userEmail = session?.data?.user?.email;
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

    // console.log(tdata);

    const router = useRouter();
    const path = usePathname();
    const axiosCommon = useAxiosCommon();
    // console.log("path: ", path);

    const handleFavorite = (data) => {
        // console.log(data);
        axiosCommon.patch(`project/projects/update/${data._id}`, { favorite: !data.favorite })
            .then(res => {
                // console.log(res);
                if (res.data.modifiedCount) {
                    // console.log(res);
                    projectRefetch();
                    data.favorite ? toast.success('Project removed from favorites.') : toast.success('Project added to favorites!')

                }
            })
    }

    const handleDelete = (id) => {
        axiosCommon.delete(`/message/messages/${id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    inboxRefetch();
                    toast.success('Message Deleted!')
                }
            })
    }

    const handleEndProject = (id) => {

        // console.log(id, currentDate);

        axiosCommon.patch(`project/projects/update/${id}`, { pedate: currentDate })
            .then(res => {
                // console.log(res);
                if (res.data.modifiedCount) {
                    // console.log(res);
                    projectRefetch();
                    toast.success('Project Ended.');
                }
            })

    }

    return (
        <div className="mt-8">
            <Table className="text-center">
                {/* table header */}
                <TableHeader className="text-black font-bold">
                    <TableRow>
                        {
                            theads?.map((thead, index) => (thead === "Fav" ? <TableHead key={index}><FaStar className="text-black text-lg"></FaStar></TableHead> : <TableHead key={index} className="font-semibold text-black text-center">{thead}</TableHead>))
                        }
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
                            {
                                path === '/dashboard/projects' && <>

                                    <TableCell onClick={() => handleFavorite(data)} className="text-lg">
                                        {
                                            data?.favorite ? <FaStar className="fill-yellow-500" /> : <FaRegStar />
                                        }
                                    </TableCell>

                                    <TableCell>
                                        <p className="rounded-full p-1">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={data.pimg} />
                                                <AvatarFallback>TBA</AvatarFallback>
                                            </Avatar>
                                        </p>
                                    </TableCell>
                                    <TableCell className="cursor-pointer hover:text-blue-600" onClick={() => router.push(`/dashboard/project/${data._id}`)}>
                                        {data?.pname}
                                    </TableCell>
                                    <TableCell>{data?.pcategory}</TableCell>
                                    <TableCell>{data?.pmanager}</TableCell>
                                    <TableCell>{data?.purl}</TableCell>
                                    <TableCell>{data?.psdate}</TableCell>
                                    <TableCell>{data?.pedate}</TableCell>
                                    <TableCell>
                                        {userEmail === data.pmanager && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Ellipsis></Ellipsis>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem >
                                                        <p onClick={() => router.push(`/dashboard/projects/${data._id}`)}>Update Project</p>
                                                    </DropdownMenuItem>
                                                    {
                                                        !data?.pedate && <DropdownMenuItem >
                                                            <p onClick={() => handleEndProject(data._id)}>End Project</p>
                                                        </DropdownMenuItem>
                                                    }

                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </TableCell>
                                </>
                            }


                            {/* view admin inbox */}

                            {
                                path === '/dashboard/admin/inbox' && <>

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
                                                <DropdownMenuItem >
                                                    <p>View</p>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem >
                                                    <p onClick={() => handleDelete(data._id)}>Delete</p>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </>
                            }

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CommonTable;