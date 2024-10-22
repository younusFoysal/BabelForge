'use client';

import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  flexRender,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpDownIcon, Settings2 } from 'lucide-react';
import debounce from 'lodash.debounce';
import { CaretSortIcon } from '@radix-ui/react-icons';

export default function TaskPage({ task }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  const data = useMemo(
    () => [
      {
        _id: '6716c3c0eb0733c5b99ed5c0',
        tname: 'Shutter Island',
        tdes: 'Movies move us like',
        tcomments: [
          { user_ID: 'comment1', datetime: '10/12/24' },
          { user_ID: 'comment2', datetime: '11/12/24' },
        ],
        tassignTo: 'Nazmul Hassan',
        tproces: 'inprogress',
        author: 'nazmul.nahid0055@gmail.com',
        teamId: 'team_ID',
        tdate: '2024-10-21',
        ttime: '03:09 AM',
      },
      {
        _id: '6713711e55e5dc5401a04780',
        tname: 'Untitled Task',
        tdes: 'This is a description',
        tcomments: [
          { user_ID: 'comment1', datetime: '10/12/24' },
          { user_ID: 'comment2', datetime: '11/12/24' },
        ],
        tassignTo: 'MD. SAIF',
        tproces: 'todo',
        author: 'cdbd4418.chaldal@gmail.com',
        teamId: 'team_ID',
        tdate: '2024-10-19',
        ttime: '02:36 PM',
      },
    ],
    []
  ); // Memoize data to prevent unnecessary re-renders
  let i = 0;
  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => '',
        cell: ({ row }) => '',
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'tname',
        header: 'Task',
        cell: ({ row }) => <div className="capitalize">{row.getValue('tname')}</div>,
        filterFn: 'includesString',
      },
      {
        accessorKey: 'tassignTo',
        header: 'Assigned to',
        cell: ({ row }) => <div className="capitalize">{row.getValue('tassignTo')}</div>,
      },
      {
        accessorKey: 'tproces',
        header: ({ column }) => {
          return (
            <Button
              className="pl-0 hover:bg-transparent"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Status
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue('tproces')}</div>,
      },
      {
        accessorKey: 'tdate',
        header: 'Start Date',
        cell: ({ row }) => <div className="lowercase">{row.getValue('tdate')}</div>,
      },
      {
        accessorKey: 'teamId',
        header: 'Team',
        cell: ({ row }) => <div className="lowercase">{row.getValue('teamId')}</div>,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleFilterChange = debounce(value => {
    setGlobalFilter(value || '');
  }, 300); // Debounce to prevent frequent re-renders

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter tasks..."
          defaultValue={globalFilter}
          onChange={event => handleFilterChange(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Settings2 size={16} className="mr-2" /> View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .slice(0, 4)
              .map(column => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={value => column.toggleVisibility(!!value)}
                >
                  {(column.id == 'tname' && 'Team Name') ||
                    (column.id == 'tassignTo' && 'Assign') ||
                    (column.id == 'tproces' && 'Process') ||
                    (column.id == 'tdate' && 'Date')}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
    </div>
  );
}
