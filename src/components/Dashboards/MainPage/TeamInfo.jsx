'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import userPhoto from '@/image/icon/user.png';
import Image from 'next/image';

const TeamInfo = ({ stats, isLoading }) => {
  const [stat, setStat] = useState(stats);
  if (isLoading) return <div>Loading...</div>;

  return (
    <Card className="py-3 rounded-xl mb-5 px-4 md:mb-0">
      <CardHeader className="flex mb-2 flex-row justify-between items-center">
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {stat &&
          stat?.newmamber?.slice(0, 5).map(user => {
            return (
              <div key={user} className="flex items-center gap-4">
                <Avatar className="h-9 w-9 sm:flex">
                  <Image src={userPhoto} alt="User Photo" />
                  {/* <AvatarFallback>OMm</AvatarFallback> */}
                </Avatar>
                <div className="grid gap-1">
                  {/* <p className="text-sm font-medium leading-none">{user?.name}</p> */}
                  <p className="text-sm text-muted-foreground">{user}</p>
                </div>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
};

export default TeamInfo;
