"use client"
import React from 'react';
import Task from './Task';

const Column = ({ column, tasks }) => {
    console.log("okay");
    return (
        <div>
            <h1>{column.title}</h1>
            <div>
                {
                    tasks.map(task => <Task key={task.id} task={task}></Task>)
                }
            </div>
        </div>
    );
};

export default Column;