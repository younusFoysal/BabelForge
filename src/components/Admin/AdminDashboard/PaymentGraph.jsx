'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import React from 'react';

export const description = 'An area chart with a legend';

const PaymentGraph = ({ trans, isLoading }) => {
  const chartData = [
    { month: 'January', Standard: 186, Premium: 80 },
    { month: 'February', Standard: 305, Premium: 200 },
    { month: 'March', Standard: 237, Premium: 120 },
    { month: 'April', Standard: 73, Premium: 190 },
    { month: 'May', Standard: 209, Premium: 130 },
    { month: 'June', Standard: 214, Premium: 140 },
  ];

  const chartConfig = {
    Standard: {
      label: 'Standard',
      color: 'hsl(var(--chart-1))',
    },
    Premium: {
      label: 'Premium',
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
                fillOpacity={0.4}
                stroke="var(--color-Premium)"
                stackId="a"
              />
              <Area
                dataKey="Standard"
                type="natural"
                fill="var(--color-Standard)"
                fillOpacity={0.4}
                stroke="var(--color-Standard)"
                stackId="a"
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
