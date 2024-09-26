'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { task: 'completed', taskCount: 275, fill: 'var(--color-completed)' },
  { task: 'pending', taskCount: 200, fill: 'var(--color-pending)' },
  { task: 'InProgress', taskCount: 287, fill: 'var(--color-InProgress)' },
  { task: 'Delayed', taskCount: 287, fill: 'var(--color-Delayed)' },
  { task: 'canceled', taskCount: 287, fill: 'var(--color-canceled)' },
];

const chartConfig = {
  taskCount: {
    label: 'Task',
  },
  completed: {
    label: 'Completed',
    color: 'hsl(var(--chart-2))',
  },
  pending: {
    label: 'Pending',
    color: 'hsl(var(--chart-5))',
  },
  InProgress: {
    label: 'In Progress',
    color: 'hsl(var(--chart-3))',
  },
  Delayed: {
    label: 'Delayed',
    color: 'hsl(var(--chart-4))',
  },
  canceled: {
    label: 'Canceled',
    color: 'hsl(var(--chart-1))',
  },
};

export function PieCharts() {
  const totalTask = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.taskCount, 0);
  }, []);

  return (
    <Card className="flex rounded-xl py-5 flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Task Progress Charts</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="taskCount" nameKey="task" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalTask.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Total Task
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing total task status of last 2 months</div>
      </CardFooter>
    </Card>
  );
}
