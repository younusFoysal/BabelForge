'use client';

import * as React from 'react';
import { Label, Pie, PieChart, Sector } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const description = 'An interactive piee chart';

const PaymentPieChart = ({ trans, isLoading }) => {
  const id = 'pie-interactive';

  //console.log(trans);

  // Memoize the initial package array to avoid re-creating it on each render
  const Initalpakage = React.useMemo(() => ['Standard', 'Premium'], []);

  // Calculate the total for Standard and Premium packages using useMemo for optimization
  const standardTotal = React.useMemo(
    () => trans?.filter(item => item.plan === 'Standard').reduce((sum, item) => sum + Number(item.amount), 0),
    [trans]
  );

  const premiumTotal = React.useMemo(
    () => trans?.filter(item => item.plan === 'Premium').reduce((sum, item) => sum + Number(item.amount), 0),
    [trans]
  );

  // Data for the chart
  const transData = React.useMemo(
    () => [
      {
        pakage: 'Standard',
        amount: standardTotal,
        fill: 'var(--color-Standard)',
      },
      { pakage: 'Premium', amount: premiumTotal, fill: 'var(--color-Premium)' },
      // { pakage: 'Basic', amount: 100, fill: 'var(--color-Basic)' },
    ],
    [standardTotal, premiumTotal]
  );

  // Chart configuration object
  const chartConfig = React.useMemo(
    () => ({
      Standard: {
        label: 'Standard',
        color: '#06b6d4',
      },
      Premium: {
        label: 'Premium',
        color: '#8b5cf6',
      },
      // Basic: {
      //   label: 'Basic',
      //   color: '#3b82f6',
      // },
    }),
    []
  );

  // Manage the active package state
  const [activePakage, setactivePakage] = React.useState(Initalpakage[0]);

  // Calculate the active package index and filter transactions based on the active package
  const activeIndex = React.useMemo(() => Initalpakage.findIndex(item => item === activePakage), [activePakage, Initalpakage]);

  const activeTrans = React.useMemo(() => trans?.filter(item => item.plan === activePakage), [trans, activePakage]);

  return (
    <div className="md:col-span-3 col-span-1 ">
      <Card data-chart={id} className="flex  dark:border-[#3e1878c2] h-full flex-col dark:bg-[#181024]">
        <ChartStyle id={id} config={chartConfig} />
        <CardHeader className="flex-row items-start space-y-0 pb-0">
          <div className="grid gap-1">
            <CardTitle>Revenue Per Pakage</CardTitle>
            <CardDescription>January - Present</CardDescription>
          </div>
          <Select value={activePakage} onValueChange={setactivePakage}>
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5 dark:bg-[#181024]  dark:border-[#3e1878c2]"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl dark:bg-[#181024]  dark:border-[#3e1878c2]">
              {Initalpakage?.map(key => {
                const config = chartConfig[key];
                if (!config) {
                  return null;
                }

                return (
                  <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-sm"
                        style={{
                          backgroundColor: `var(--color-${key})`,
                        }}
                      />
                      {config?.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center pb-0">
          <ChartContainer id={id} config={chartConfig} className="mx-auto aspect-square w-full max-w-[300px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={transData}
                dataKey="amount"
                nameKey="pakage"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({ outerRadius = 0, ...props }) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                            {activeTrans?.reduce((sum, item) => sum + Number(item.amount), 0)}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                            USD
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
      </Card>
    </div>
  );
};

export default PaymentPieChart;
