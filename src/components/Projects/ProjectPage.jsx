"use client"
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IoIosSearch } from "react-icons/io";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FaStar } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useSession } from 'next-auth/react';
import axios from 'axios';
import useProjects from '@/hooks/useProjects';
import { Ellipsis } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const ProjectPage = () => {
    const session = useSession();
    const userEmail = session?.data?.user?.email;
    const projects = useProjects(userEmail);
    console.log(projects, userEmail);

    return (
        <section>

            {/* page heading */}
            <div className='flex justify-between items-center'>
                <h3 className='text-2xl  font-medium'>Projects</h3>
                <div ><Button className='bg-primary text-white' variant="outline">Create Project</Button></div>
            </div>

            {/* Input box content */}
            <div className='my-8 w-full flex justify-start items-center gap-6'>

                {/* search box */}
                <div className='lg:w-[30%] w-full' >
                    <div className='flex justify-center items-center'>
                        <Input className='py-4 border-gray-500 border-[1px]' placeholder='Search Projects' />
                        <span className='translate-x-[-180%]'><IoIosSearch ></IoIosSearch></span>
                    </div>
                </div>


                {/* dropdown */}
                <div className='w-[100%]'>
                    <Select >
                        <SelectTrigger className="lg:w-[30%] w-full py-4 border-gray-500 border-[1px] rounded-sm ">
                            <SelectValue placeholder="Filter By Product" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="apple">Business project</SelectItem>
                                <SelectItem value="banana">Software Project</SelectItem>
                                <SelectItem value="blueberry">Service Management</SelectItem>
                                <SelectItem value="grapes">product Discovery</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div>

            {/* Table content */}
            <div className='mt-8'>

                <Table>

                    <TableHeader >
                        <TableRow >
                            <TableHead className="w-[20%] font-semibold text-black flex  items-center gap-3">
                                <span><FaStar ></FaStar></span>
                                Name
                                <span><FaArrowDown  ></FaArrowDown > </span>
                            </TableHead>
                            <TableHead className="font-semibold text-black">Key

                            </TableHead>
                            <TableHead className="font-semibold text-black w-[20%]">Type</TableHead>
                            <TableHead className="font-semibold text-black w-[20%]">Lead</TableHead>
                            <TableHead className="font-semibold text-black">Project URL</TableHead>
                            <TableHead className="font-semibold text-black">More Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {/* 1st row */}
                        {
                            projects[0]?.map(project => <TableRow key={project._id} className='border-y-2 border-gray-300'>
                                <TableCell className="font-medium flex items-center gap-3">

                                    <span><FaRegStar className='text-xl'></FaRegStar></span>
                                    <div className="flex items-center gap-2 font-normal text-primary">
                                        <p className="rounded-full p-1">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={project.pimg} />
                                                <AvatarFallback>TA</AvatarFallback>
                                            </Avatar>
                                        </p>
                                        {project.pname}
                                    </div>

                                </TableCell>
                                <TableCell className="uppercase">{project.pname}</TableCell>
                                <TableCell>{project.pcategory}</TableCell>
                                <TableCell>{project.pmanager}</TableCell>
                                <TableCell>{project.purl}</TableCell>
                                <TableCell>{userEmail === project.pmanager &&

                                    <DropdownMenu>
                                        <DropdownMenuTrigger><Ellipsis></Ellipsis></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Update Project</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                }</TableCell>
                            </TableRow>)
                        }

                    </TableBody>
                </Table>

            </div>

            {/* pagination */}
            <div className='mt-6'>
                <Pagination className='flex justify-start '>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </div>
        </section>
    );
};

export default ProjectPage;