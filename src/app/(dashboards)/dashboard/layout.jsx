
import Link from 'next/link';
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader, 
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button';






const layout = ({ children }) => {




    return (



        <div className="flex min-h-screen bg-white">

            {/* sidebar drawer small device */}
            <div className="lg:hidden p-0">
                <Drawer>
                    <DrawerTrigger asChild>

                        <div className='fixed bg-primary bg-opacity-20  text-white rounded-full ml-1 '>
                            <Button variant="ghost"><span className='flex justify-start  items-center gap-2 text-white'  >open sidebar<IoIosArrowDropupCircle className='text-3xl text-white'></IoIosArrowDropupCircle></span></Button>
                        </div>

                    </DrawerTrigger>

                    <DrawerContent >
                    <DrawerClose>
                            <Button className='bg-primary rounded-full' variant="ghost"><span className='flex justify-start  items-center gap-2 text-white '  >Close<IoIosArrowDropdownCircle className='text-3xl text-white'></IoIosArrowDropdownCircle ></span></Button>
                        </DrawerClose>
                        <div className='flex justify-start items-center'>
                            <DrawerHeader>
                                <h2 className="text-2xl text-primary font-bold">Dashboard</h2>

                            </DrawerHeader>
                        </div>
                      

                        {/* Sidebar content  */}
                        <div className="p-4">
                            <ul>
                                <li><Link href={"/"} className="block py-2">Home</Link></li>
                                <li><Link href={"/dashboard/Backlog"} className="block py-2">Backlog</Link></li>
                                <li><Link href={"/dashboard/board"} className="block py-2">Boards</Link></li>
                            </ul>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>

            {/* Sidebar drawer large device*/}
            <div className="hidden lg:block lg:w-48 bg-base-300 text-black p-4 border-r-2">
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <ul>
                    <li><Link href={"/"} className="block py-2">Home</Link></li>
                    <li><Link href={"/dashboard/Backlog"} className="block py-2">Backlog</Link></li>
                    <li><Link href={"/dashboard/board"} className="block py-2">Boards</Link></li>
                </ul>
            </div>

            {/*layout content  */}
            <div className='lg:p-6 pt-10 flex justify-center w-full'>
                {children}
            </div>

        </div>
    );
};






export default layout;