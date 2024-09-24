"use client"

import React from 'react';
import data from './boardData';
import Column from './Column';

const Board = () => {
    // console.log(boardData);
    return (
        <div>
            <div className='ml-5 flex space-x-3 border-2 border-red-500'>
                {
                    data.columnOrder.map(columnId => {
                        const column = data.columns[columnId];
                        const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
                        // console.log(column);
                        // console.log(tasks);
                        return <Column key={column.id} column={column} tasks={tasks}></Column>
                    })
                }
            </div>
        </div>
    );
};

export default Board;