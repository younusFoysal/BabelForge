
import Board from '@/components/Dashboards/Board';
import React from 'react';

export const metadata = {
    title: "Board | BabelForge",
    description: "Board for BabelForge",
}

const page = () => {
    return (
        <div >
            <Board></Board>
        </div>
    );
};

export default page;