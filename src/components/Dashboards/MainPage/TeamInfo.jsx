'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { axiosCommon } from '@/lib/axiosCommon';
import React, { useState } from 'react';
import {useQuery} from "@tanstack/react-query";
import useUsers from "@/hooks/useUsers";

const TeamInfo = () => {

    const [users, isLoading] = useUsers();

    if (isLoading) return <div>Loading...</div>;

  return (
    <Card className="py-3 rounded-xl mb-5 px-4 md:mb-0 dark:bg-gray-800 dark:border-gray-800">
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
