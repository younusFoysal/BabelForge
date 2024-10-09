'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import React from 'react';

export const description = 'An area chart with a legend';

const PaymentGraph = ({ trans, isLoading }) => {
  const chartData = [
    { month: 'January', Standard: 0, Premium: 0 },
    { month: 'February', Standard: 0, Premium: 0 },
    { month: 'March', Standard: 0, Premium: 0 },
    { month: 'April', Standard: 0, Premium: 0 },
    { month: 'May', Standard: 0, Premium: 0 },
    { month: 'June', Standard: 120, Premium: 50 },
    { month: 'July', Standard: 0, Premium: 0 },
    { month: 'Augst', Standard: 0, Premium: 0 },
    { month: 'Sep', Standard: 0, Premium: 0 },
    { month: 'Oct', Standard: 0, Premium: 0 },
    { month: 'Nov', Standard: 0, Premium: 0 },
    { month: 'Dec', Standard: 0, Premium: 0 },
  ];

  for (let month = 0; month < 12; month++) {
    trans?.forEach(item => {
      if (Number(item?.date?.slice(5, 7)) == month) {
        const tempStandard = trans?.filter(transItem => transItem.pakage === 'Standard' && Number(transItem?.date?.slice(5, 7)) == month);
        chartData[month - 1].Standard = tempStandard.reduce((sum, transItem) => sum + Number(transItem.amount), 0);
        const tempPremium = trans.filter(transItem => transItem.pakage === 'Premium' && Number(transItem?.date?.slice(5, 7)) == month);
        chartData[month - 1].Premium = tempPremium.reduce((sum, transItem) => sum + Number(transItem.amount), 0);
      }
    });
  }

  const chartConfig = {
    Premium: {
      label: 'Premium',
      color: 'hsl(var(--chart-1))',
    },
    Standard: {
      label: 'Standard',
      color: 'hsl(var(--chart-2))',
    },
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Showing total payments for the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={value => value.slice(0, 3)} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Area
                dataKey="Premium"
                type="natural"
                fill="var(--color-Premium)"
                stackId="a"
                fillOpacity={0.4}
                stroke="var(--color-Premium)"
              />
              <Area
                dataKey="Standard"
                stackId="a"
                type="natural"
                fill="var(--color-Standard)"
                fillOpacity={0.4}
                stroke="var(--color-Standard)"
              />

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">January - June 2024</div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentGraph;

// const chartData = [
//   { month: 'January', Standard: 0, Premium: 0 },
//   { month: 'February', Standard: 0, Premium: 0 },
//   { month: 'March', Standard: 0, Premium: 0 },
//   { month: 'April', Standard: 0, Premium: 0 },
//   { month: 'May', Standard: 0, Premium: 0 },
//   { month: 'June', Standard: 120, Premium: 50 },
//   { month: 'July', Standard: 0, Premium: 0 },
//   { month: 'Augst', Standard: 0, Premium: 0 },
//   { month: 'Sep', Standard: 0, Premium: 0 },
//   { month: 'Oct', Standard: 0, Premium: 0 },
//   { month: 'Nov', Standard: 0, Premium: 0 },
//   { month: 'Dec', Standard: 0, Premium: 0 },
// ];

// for (let month = 0; month < 12; month++) {
//   trans?.forEach(item => {
//     if (Number(item?.date?.slice(5, 7)) == month) {
//       const tempStandard = trans?.filter(transItem => transItem.pakage === 'Standard' && Number(transItem?.date?.slice(5, 7)) == month);
//       chartData[month - 1].Standard = tempStandard.reduce((sum, transItem) => sum + Number(transItem.amount), 0);
//       const tempPremium = trans.filter(transItem => transItem.pakage === 'Premium' && Number(transItem?.date?.slice(5, 7)) == month);
//       chartData[month - 1].Premium = tempPremium.reduce((sum, transItem) => sum + Number(transItem.amount), 0);
//     }
//   });
// }
