import React from 'react';
import {
    Card,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import { HiExclamationCircle } from "react-icons/hi";
import { FaCheckSquare } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Link from 'next/link';
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/button";


const Team = () => {
    return (
        <div>

            <div className='py-20 flex lg:flex-row flex-col justify-between items-start gap-10 lg:p-0 p-4'>

                {/* card left */}
                <div className='lg:w-[45%] w-full '>

                    {/* card header user info */}
                    <div className='space-y-5 py-10'>

                        <h3 className='text-2xl font-semibold'>Babel</h3>
                        <p className='hover:bg-gray-300 p-1'>Good teams have good people, great teams have a description. Add yours here.</p>

                        <div className='flex justify-between item-center gap-2 text-center '>
                            <h3 className='flex-1 font-medium hover:bg-gray-300 bg-gray-100  p-2 mb-2 rounded-sm '>Manage Your Account</h3>
                            <span className='hover:bg-gray-300 bg-gray-100  p-2 mb-2 rounded-sm w-10 cursor-pointer'><BsThreeDots className='flex flex-col justify-center item-center text-2xl' ></BsThreeDots></span>
                        </div>

                    </div>

                    {/* card content */}
                    <Card className='p-6'>
                        <div className='space-y-2 border-b border-gray-200 pb-3'>
                            <p className='flex justify-between items-center'>
                                <span className='text-xl font-semibold'>Members</span>
                                <span><HiExclamationCircle className='text-xl opacity-50'></HiExclamationCircle></span>
                            </p>

                            <p>7 members</p>

                        </div>




                        <div className='py-3'>


                            {/* member 1 */}
                            <div className='flex  items-center gap-4  '>
                                <div className="flex items-center hover:bg-gray-200 w-full p-1 rounded-md group ">
                                    <div className="flex items-center gap-2 ">
                                        <p className="rounded-full p-1">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src="https://i.ibb.co.com/zrCsVD7/github.jpg" />
                                                <AvatarFallback>TA</AvatarFallback>
                                            </Avatar>
                                        </p>
                                        Tofayel Ahmed

                                        <p className='ml-10 group-hover:inline lg:hidden cursor-pointer'>
                                            <BsThreeDots className="text-xl" />
                                        </p>
                                    </div>
                                </div>


                            </div>
                            {/* member 2 */}
                            <div className='flex  items-center gap-4  '>
                                <div className="flex items-center hover:bg-gray-200 w-full p-1 rounded-md group ">
                                    <div className="flex items-center gap-2 ">
                                        <p className="rounded-full p-1">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src="https://i.ibb.co.com/zrCsVD7/github.jpg" />
                                                <AvatarFallback>TA</AvatarFallback>
                                            </Avatar>
                                        </p>
                                        Tofayel Ahmed

                                        <p className='ml-10 group-hover:inline lg:hidden cursor-pointer'>
                                            <BsThreeDots className="text-xl" />
                                        </p>
                                    </div>
                                </div>


                            </div>


                        </div>

                    </Card>
                </div>



                {/* card right */}
                <div className='w-full  pt-10 '>

                    <h3 className='text-start text-base font-semibold uppercase'>Team activity</h3>

                    <Card className='mt-4 space-y-2  p-6 '>

                        {/* card 1 */}
                        <div className=' hover:bg-gray-200 p-2 mb-2 rounded-md space-y-2'>

                            <div className='flex justify-start items-center gap-3'>
                                <span><FaCheckSquare className='lg:text-4xl text-primary'></FaCheckSquare></span>
                                <div>
                                    <h3>Task Name</h3>
                                    <p className='text-xs space-x-3'>
                                        <span>Babel Forge </span>
                                        <span>Tofayel Ahmed created this on september 25,2023</span>

                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* card 1 */}
                        <div className=' hover:bg-gray-200 p-2 mb-2 rounded-md space-y-2'>

                            <div className='flex justify-start items-center gap-3'>
                                <span><FaCheckSquare className='lg:text-4xl text-primary'></FaCheckSquare></span>
                                <div>
                                    <h3>Task Name</h3>
                                    <p className='text-xs space-x-3'>
                                        <span>Babel Forge </span>
                                        <span>Tofayel Ahmed created this on september 25,2023</span>

                                    </p>
                                </div>
                            </div>

                        </div>

                    </Card>




                    {/* Link content */}
                    <div className='pt-14 '>
                        <h3 className='flex justify-between items-center font-semibold'>Links
                            <span className='bg-gray-200 p-1 hover:bg-gray-300 cursor-pointer'>
                                <FaPlus ></FaPlus>

                            </span>

                        </h3>


                        <div className='bg-gray-200  p-4 my-6'>

                            <div className='bg-white p-2 space-y-2 hover:shadow-xl group'>
                                <p>something</p>
                                <p>something</p>


                                <div className='flex justify-between items-center '>


                                    <div className='flex justify-start items-center gap-1'>
                                        <span><FaGithub ></FaGithub></span>
                                        <Link href={''} className='hover:underline'>Github</Link>
                                    </div>


                                    <div className='flex  items-center  group-hover:inline hidden group-hover:space-x-2'>
                                        <Button variant="outline">Edit</Button>
                                        <Button variant="outline">Button</Button>
                                    </div>




                                </div>



                            </div>

                        </div>

                    </div>








                </div>

            </div>


        </div>



    );
};

export default Team;