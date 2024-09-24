import React from 'react';

const Task = ({ task }) => {
    return (
        <div className='border-2 p-2'>
            <h1>{task.content}</h1>
        </div>
    );
};

export default Task;