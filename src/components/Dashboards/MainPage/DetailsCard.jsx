import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import { RiTeamLine } from 'react-icons/ri';
import { MdOutlinePendingActions, MdTask } from 'react-icons/md';
import { TbUsersGroup } from 'react-icons/tb';
import { axiosCommon } from '@/lib/axiosCommon';

const DetailsCard = () => {
  const [users, setUsers] = useState([]);
  const [team, setTeam] = useState([]);
  const [task, setTask] = useState([]);
  const [pendingTask, setPendingTask] = useState([]);

  // Get all user
  axiosCommon
    .get('api/users')
    .then(res => {
      setUsers(res.data);
    })
    .catch(error => {
      console.log(error);
    });
  // Get all Team
  axiosCommon
    .get('team/teams')
    .then(res => {
      setTeam(res.data);
    })
    .catch(error => {
      console.log(error);
    });

  // Get all task
  axiosCommon
    .get('task/tasks')
    .then(res => {
      setTask(res.data);
      // Set Pending Task
      setPendingTask(res.data.filter(task => task.tproces === 'todo'));
    })
    .catch(error => {
      console.log(error);
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mb-8 lg:grid-cols-4 gap-5">
      {/* Total Member Card */}
      <Card className="hover:shadow-lg duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          <TbUsersGroup />
        </CardHeader>
        <CardContent>
          <div className="text-2xl mb-2 font-bold">{users?.length}</div>
          <p className="text-xs text-muted-foreground">Shows the total number of registered members in your team</p>
        </CardContent>
      </Card>
      {/* Total Team Card */}
      <Card className="hover:shadow-lg duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
          <RiTeamLine />
        </CardHeader>
        <CardContent>
          <div className="text-2xl mb-2 font-bold">{team?.length}</div>
          <p className="text-xs text-muted-foreground">Displays the total number of tasks created .</p>
        </CardContent>
      </Card>
      {/* Total Task Card */}
      <Card className="hover:shadow-lg duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          <MdTask />
        </CardHeader>
        <CardContent>
          <div className="text-2xl mb-2 font-bold">{task?.length}</div>
          <p className="text-xs text-muted-foreground">Displays the total number of tasks created .</p>
        </CardContent>
      </Card>
      {/* Pending Task Card */}
      <Card className="hover:shadow-lg duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
          <MdOutlinePendingActions />
        </CardHeader>
        <CardContent>
          <div className="text-2xl mb-2 font-bold">{pendingTask?.length}</div>
          <p className="text-xs text-muted-foreground">Displays the total number of pending tasks.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsCard;
