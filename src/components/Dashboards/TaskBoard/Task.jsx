"use client"
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index }) => {
    // console.log(task);
    return (
        <Draggable draggableId={task.id} index={index}>
            {
                provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className='border-2 p-2 bg-white'>
                        {task.content}
                    </div>
                )
            }
        </Draggable>
    );
};

export default Task;