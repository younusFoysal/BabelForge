"use client"
import React from 'react';
import Task from './Task';

const Column = ({ column, tasks }) => {
    console.log("okay");
    return (
        <div className='border-2 p-2'>
            <h1 className='text-xl font-bold my-3 text-center'>{column.title}</h1>
            <div className='space-y-3'>
                {
                    tasks.map(task => <Task key={task.id} task={task}></Task>)
                }
            </div>
        </div>
    );
};

export default Column;