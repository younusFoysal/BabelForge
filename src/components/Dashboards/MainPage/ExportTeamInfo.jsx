'use client';
import * as React from 'react';
import { addDays } from 'date-fns';
import { CiExport } from 'react-icons/ci';
import { cn } from '@/lib/utils';
import { ExcelColumn, default as ExcelFile, ExcelSheet } from 'react-data-export';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { IoPrintOutline } from 'react-icons/io5';

export function ExportTeamInfo({ className, stats, isLoading }) {
  const [exportInfo, setExportInfo] = React.useState([stats]);

  const [date, setDate] = React.useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex items-center gap-3">
      {/* Export Data as exel */}
      <ExcelFile
        element={
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md flex items-center gap-2  text-md hover:scale-[1.06] duration-500   dark:hover:shadow-purple-800 font-medium px-4 py-2">
                  <CiExport className="font-bold text-lg" /> Export
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export as Exel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        }
      >
        <ExcelSheet data={!isLoading && exportInfo} name="Overview">
          <ExcelColumn label="Total Team Members" value="totalTeamMembers" />
          <ExcelColumn label="Total Teams" value="totalTeams" />
          <ExcelColumn label="Pending Task " value="pendingTasks" />
          <ExcelColumn label="Todo Task" value="TodoTasks" />
          <ExcelColumn label="Progress Task" value="InprogressTask" />
          <ExcelColumn label="Completed Task" value="DoneTask" />
          <ExcelColumn label="Total Task" value="totalTasks" />
        </ExcelSheet>
      </ExcelFile>
      {/* Print Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <button
              onClick={window.print}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-purple-200  flex items-center gap-2  text-md hover:scale-[1.06] duration-500  font-medium px-4 py-2 rounded-md"
            >
              <IoPrintOutline className="font-bold text-lg" /> Print
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Print Page</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
