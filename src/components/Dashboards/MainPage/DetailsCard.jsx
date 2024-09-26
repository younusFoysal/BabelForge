import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const DetailsCard = ({ title, details, icon, value }) => {
  return (
    <Card className=" rounded-xl hover:shadow-lg duration-300  py-2 px-3">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="flex justify-between  items-center">
          <span className="text-[22px] leading-8 ">{title}</span>
          <span className="text-[19px]">{icon}</span>
        </CardTitle>
        <CardDescription className="py-1">{details}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
        <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
          {value}
          {/* <span className="text-sm font-normal text-muted-foreground">kcal/day</span> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
