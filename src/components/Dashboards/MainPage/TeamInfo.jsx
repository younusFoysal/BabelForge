'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { axiosCommon } from '@/lib/axiosCommon';
import { useState } from 'react';

const TeamInfo = () => {
  const [users, setUsers] = useState();

  // Get all user
  axiosCommon
    .get('api/users')
    .then(res => {
      setUsers(res.data);
    })
    .catch(error => {
      console.log(error);
    });

  return (
    <Card className="py-3 rounded-xl mb-5 px-4 md:mb-0">
      <CardHeader className="flex mb-2 flex-row justify-between items-center">
        <CardTitle>Team Members</CardTitle>
        <p className="font-semibold">Total Task</p>
      </CardHeader>
      <CardContent className="grid gap-8">
        {users?.slice(14, 20).map(user => {
          return (
            <div key={user.email} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <div className="ml-auto font-medium">{Math.ceil(Math.random() * 12)}</div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TeamInfo;
