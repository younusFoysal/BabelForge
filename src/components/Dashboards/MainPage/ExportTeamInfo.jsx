'use client';
import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import { CiExport } from 'react-icons/ci';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ExcelColumn, default as ExcelFile, ExcelSheet } from 'react-data-export';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { IoPrintOutline } from 'react-icons/io5';
import { useState } from 'react';
import { axiosCommon } from '@/lib/axiosCommon';

// const dataSet1 = [
//   {
//     name: 'Morsidul',
//     amount: 30000,
//     sex: 'M',
//     is_married: true,
//   },
//   {
//     name: 'Nahid',
//     amount: 355000,
//     sex: 'M',
//     is_married: false,
//   },
//   {
//     name: 'Faisal',
//     amount: 450000,
//     sex: 'M',
//     is_married: true,
//   },
//   {
//     name: 'Tofayel',
//     amount: 450500,
//     sex: 'M',
//     is_married: true,
//   },
//   {
//     name: 'Tarek',
//     amount: 550500,
//     sex: 'M',
//     is_married: true,
//   },
//   {
//     name: 'Saif',
//     amount: 450500,
//     sex: 'M',
//     is_married: false,
//   },
// ];

export function ExportTeamInfo({ className }) {
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

  const [date, setDate] = React.useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  console.log(users);

  return (
    <div className="flex items-center gap-3">
      <div className={cn('grid gap-2', className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={'outline'}
              className={cn('w-[300px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
          </PopoverContent>
        </Popover>
      </div>
      {/* Export Data as exel */}
      <ExcelFile
        element={
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button className="bg-black flex items-center gap-2 text-white text-[12px] font-light px-4 py-[9px] rounded-md">
                  <CiExport className="text-[14px]" /> Export
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export as Exel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        }
      >
        <ExcelSheet data={users} name="Employees">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Email" value="email" />
          <ExcelColumn label="Location" value="location" />
          <ExcelColumn label="Department" value="department" />
          <ExcelColumn label="Organization" value="organization" />
        </ExcelSheet>
      </ExcelFile>
      {/* Print Button */}
      <button
        onClick={window.print}
        className="bg-black hidden items-center sm:flex gap-2 text-white text-[12px] font-light px-4 py-[9px] rounded-md"
      >
        <IoPrintOutline className="text-[14px]" /> Print
      </button>
    </div>
  );
}
