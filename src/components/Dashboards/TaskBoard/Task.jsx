import React from 'react';

const Task = ({ task }) => {
    return (
        <div>
            <h1>{task.content}</h1>
        </div>
    );
};

export default Task;