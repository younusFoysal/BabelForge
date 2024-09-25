"use client"
import React from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ column, tasks }) => {
    // console.log("okay");
    return (
        <div className='border-2 p-2'>
            <h1 className='text-xl font-bold my-3 text-center'>{column.title}</h1>
            <Droppable droppableId={column.id}>
                {
                    provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className='space-y-3'>
                            {
                                tasks.map((task, index) => (<Task key={task.id} task={task} index={index}></Task>))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }

            </Droppable>
        </div>
    );
};

export default Column;