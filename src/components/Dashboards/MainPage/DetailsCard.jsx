import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const DetailsCard = ({ title, details, icon, value }) => {
  return (
    <Card className="hover:shadow-lg duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl mb-2 font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{details}</p>
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
