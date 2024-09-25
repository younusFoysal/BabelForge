import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

const BoardCard = ({ title }) => {
    return (
        <div>
            <Card className='bg-gray-50 min-h-screen container mx-auto'>

                <CardHeader className='flex justify-center items-center'>

                    <CardTitle className='text-lg'>{title}</CardTitle>

                </CardHeader>


                {/* card content 1 */}
                <div className='p-1 bg-white  '>
                    <CardContent className='w-full h-full shadow-md rounded-sm  border-[1px] border-gray-200'>
                        <p>Card Content</p>
                    </CardContent>
                </div>

                {/* card content 2 */}
                <div className='p-1 bg-white'>
                    <CardContent className='w-full h-full shadow-md rounded-sm border-[1px] border-gray-200'>
                        <p>Card Content </p>
                        
                    </CardContent>
                </div>



            </Card>

        </div>
    );
};

export default BoardCard;