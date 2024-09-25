import React from 'react';
import {
    Card,
   
} from "@/components/ui/card";
import { ImBriefcase } from "react-icons/im";
import { FaNetworkWired } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { FaUserGroup } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



const Profile = () => {
    return (
        <div >

            {/* container */}
            <div className='py-20 flex lg:flex-row flex-col justify-between items-start gap-10 lg:p-0 p-4'>

                {/* card left */}
                <div className='lg:w-[45%] w-full '>

                    {/* card header user info */}
                    <div className='flex  gap-4  '>
                        <p className='flex justify-start items-center gap-2 hover:bg-gray-200 w-full p-1 rounded-md'>
                            <span className=' rounded-full p-1'>
                                <Avatar className='w-40 h-40'>
                                    <AvatarImage src="https://i.ibb.co.com/zrCsVD7/github.jpg" />
                                    <AvatarFallback>TA</AvatarFallback>
                                </Avatar>
                            </span>
                        </p>
                    </div>
                    <p className='text-2xl mb-6'>Tofayel Ahmed</p>
                    <div className='text-center bg-gray-200 p-2 mb-2 rounded-md'>
                        <h3 className='font-medium'>Manage Your Account</h3>
                    </div>

                    {/* card content */}
                    <Card className='p-6'>
                        {/* about */}
                        <h3 className='text-start text-xl uppercase'>About</h3>

                        <div className='mt-7 space-y-4'>
                            {/* 1 */}
                            <div className='flex  items-center gap-4'>
                                <span><ImBriefcase className='text-lg'></ImBriefcase></span>
                                <p className='hover:bg-gray-200 w-full p-2 rounded-md'>Your department</p>
                            </div>
                            {/* 2*/}
                            <div className='flex  items-center gap-4'>
                                <span><FaNetworkWired className='text-lg'></FaNetworkWired></span>
                                <p className='hover:bg-gray-200 w-full p-2 rounded-md'>Your department</p>
                            </div>
                            {/* 3 */}
                            <div className='flex  items-center gap-4'>
                                <span><GoOrganization className='text-lg'></GoOrganization ></span>
                                <p className='hover:bg-gray-200 w-full p-2 rounded-md'>Your organization</p>
                            </div>
                            {/* 4*/}
                            <div className='flex  items-center gap-4'>
                                <span><IoLocationSharp className='text-xl'></IoLocationSharp ></span>

                                <p className='hover:bg-gray-200 w-full p-2 rounded-md'>Your location</p>
                            </div>

                        </div>

                        {/* contact */}
                        <h3 className='text-start text-xl uppercase my-6'>contact</h3>
                        <div className='flex  items-center gap-4'>
                            <span><MdOutlineEmail className='text-xl'></MdOutlineEmail  ></span>

                            <p className='hover:bg-gray-200 w-full p-2 rounded-md'>ahmetofayel132@gmail.com</p>
                        </div>



                        {/* teams */}
                        <h3 className='text-start text-xl uppercase my-6'>Teams</h3>
                        <div className='flex  items-center gap-4'>
                            <p className='flex  items-center gap-4 hover:bg-gray-200 w-full p-2 rounded-md'><span className='bg-gray-200 rounded-full p-1'><GoPlus className='text-xl '></GoPlus   ></span>Create A Team</p>

                        </div>

                        <div className='flex justify-start items-center gap-4 mb-6 ml-1 mt-2 p-1 rounded-md hover:bg-gray-200'>

                            <div className='flex  items-center gap-1 '>
                                <span className='bg-violet-500 rounded-full p-1'><FaUserGroup className='text-2xl text-white '></FaUserGroup></span>
                            </div>

                            <div>
                                <span className='gap-0'>Babel</span> <br />
                                <span className='text-sm gap-0'>7 members</span>
                            </div>
                        </div>


                        <Link className='mt-12  text-xs hover:underline' href={''}> View privacy policy</Link>




                    </Card>
                </div>

                {/* card right */}
                <div className='w-full  lg:mt-60 mt-10 '>

                    <h3 className='text-start text-lg font-semibold uppercase'>works with</h3>
                    <div className='mt-5 flex justify-start items-center gap-6'>
                        <div className='flex  items-center gap-1 '>
                            <p className='flex px-4 py-2 hover:bg-blue-400 items-center gap-3 bg-blue-300 w-full  rounded-full'><span className='bg-violet-500 rounded-full p-1'><FaUserGroup className='text-xl text-white '></FaUserGroup></span>Babel</p>

                        </div>
                        <div className='flex  items-center gap-1 '>
                            <p className='flex px-4 py-2 hover:bg-gray-300 items-center gap-3 bg-gray-200 w-full  rounded-full'><span className='bg-gray-500 rounded-full p-1'><HiUserGroup className='text-xl text-white '></HiUserGroup ></span>Collaboration</p>

                        </div>

                    </div>

                    <Card className='mt-4 space-y-2  p-6 '>

                        <div className='flex justify-center items-center gap-4'>
                            <div className='flex px-4 py-1   items-center gap-3 hover:bg-gray-300 w-full  rounded-full'>
                                <p className='bg-violet-500 rounded-full p-1'>
                                    <FaUserGroup className='text-xl text-white  '></FaUserGroup>

                                </p>

                                <p >Babel <span className='text-sm ml-1'>7 members</span> <br /> <span className='text-xs'>Team</span> </p>

                            </div>
                        </div>


                        {/* team member container  */}
                        <div className='grid grid-cols-2 gap-5 '>

                            {/* member 1 */}
                            <div className='flex  items-center gap-4  '>
                                <p className='flex  items-center gap-2 hover:bg-gray-200 w-full p-1 rounded-md'>
                                    <span className=' rounded-full p-1'>
                                        <Avatar className='w-8 h-8'>
                                            <AvatarImage src="https://i.ibb.co.com/zrCsVD7/github.jpg" />
                                            <AvatarFallback>TA</AvatarFallback>
                                        </Avatar>
                                    </span>
                                    Tofayel Ahmed</p>
                            </div>
                            {/* member 1 */}
                            <div className='flex  items-center gap-4  '>
                                <p className='flex  items-center gap-2 hover:bg-gray-200 w-full p-1 rounded-md'>
                                    <span className=' rounded-full p-1'>
                                        <Avatar className='w-8 h-8'>
                                            <AvatarImage src="https://i.ibb.co.com/2sv1JNc/member3.png" />
                                            <AvatarFallback>TA</AvatarFallback>
                                        </Avatar>
                                    </span>
                                    Tofayel Ahmed</p>
                            </div>
                            {/* member 1 */}
                            <div className='flex  items-center gap-4  '>
                                <p className='flex  items-center gap-2 hover:bg-gray-200 w-full p-1 rounded-md'>
                                    <span className=' rounded-full p-1'>
                                        <Avatar className='w-8 h-8'>
                                            <AvatarImage src="https://i.ibb.co.com/zrCsVD7/github.jpg" />
                                            <AvatarFallback>TA</AvatarFallback>
                                        </Avatar>
                                    </span>
                                    Tofayel Ahmed</p>
                            </div>
                            {/* member 1 */}
                            <div className='flex  items-center gap-4  '>
                                <p className='flex  items-center gap-2 hover:bg-gray-200 w-full p-1 rounded-md'>
                                    <span className=' rounded-full p-1'>
                                        <Avatar className='w-8 h-8'>
                                            <AvatarImage src="https://i.ibb.co.com/zrCsVD7/github.jpg" />
                                            <AvatarFallback>TA</AvatarFallback>
                                        </Avatar>
                                    </span>
                                    Tofayel Ahmed</p>
                            </div>





                        </div>



                    </Card>
                </div>

            </div>


        </div>
    );
};

export default Profile;