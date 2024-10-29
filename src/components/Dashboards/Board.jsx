import React from 'react';
import TaskList from '@/components/Dashboards/Task/TaskList';

const Board = () => {
  return (
    <section>
      <div className="w-full mx-auto max-w-[1100px]">
        <TaskList />
      </div>
    </section>
  );
};

export default Board;
