import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {
                provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                        className='border-2 p-2'>
                        {task.content}
                    </div>
                )
            }
        </Draggable>
    );
};

export default Task;