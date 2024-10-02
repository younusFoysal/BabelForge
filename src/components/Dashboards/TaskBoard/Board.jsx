"use client"

import React from 'react';
import data from './boardData';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';

const Board = () => {
    // console.log(boardData);

    const onDragEnd = () => {
        // TODO
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {/* <h1>Is it okay</h1> */}
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
        </DragDropContext>
    );
};

export default Board;