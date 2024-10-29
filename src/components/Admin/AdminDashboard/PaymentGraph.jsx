'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import React from 'react';
import dayjs from 'dayjs'; // Install dayjs for date manipulation

export const description = 'An area chart showing payments over time';

// Helper function to process data
const processTransactionData = trans => {
  const groupedByDate = trans.reduce((acc, item) => {
    const date = dayjs(item.date).format('YYYY-MM-DD'); // Group by exact date
    const amount = Number(item.amount);

    if (!acc[date]) {
      acc[date] = { date, Standard: 0, Premium: 0 };
    }
    if (item.pakage === 'Standard') {
      acc[date].Standard += amount;
    } else if (item.pakage === 'Premium') {
      acc[date].Premium += amount;
    }
    return acc;
  }, {});

  return Object.values(groupedByDate);
};

const PaymentGraph = ({ trans, isLoading }) => {
  // Process transactions to aggregate amounts by date
  const chartData = React.useMemo(() => processTransactionData(trans), [trans]);

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
    <div className="">
      <Card className='dark:bg-[#181024] dark:border-[#3e1878c2]'>
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
          <CardDescription>Payments for the selected period</CardDescription>
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
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={value => dayjs(value).format('MMM DD')} // Format date to 'Month Day'
              />
              <YAxis />
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
