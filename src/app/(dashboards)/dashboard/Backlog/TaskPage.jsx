'use client';
import React, { useState, useMemo } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    height: '90%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, Settings2 } from 'lucide-react';
import debounce from 'lodash.debounce';
import { CaretSortIcon } from '@radix-ui/react-icons';
import Alert from '@/components/shared/Alert';
import { MdAddTask } from 'react-icons/md';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from 'next-themes';
import { TagsInput } from 'react-tag-input-component';

export default function TaskPage({ task, handleDelete }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const { user } = useUser();
  const { resolvedTheme } = useTheme();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  const [emails, setEmails] = useState([uemail]);

  // const [modalIsOpen, setIsOpen] = useState(false);

  // function openModal() {
  //   console.log('open modal');
  //   setIsOpen(true);
  // }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  // }

  // function closeModal() {
  //   console.log('close');
  //   setIsOpen(false);
  // }

  // Tanstack
  const mutation = useMutation({
    mutationFn: async data => {
      const res = await axiosCommon.post('/team/teams', data);
      return res.data;
    },
    onSuccess: () => {
      setOpen(false);
      toast.success('Team created successfully!');
      reset();
      refetch();
    },
    onError: error => {
      toast.error(`Couldn't create team ! Try again`);
    },
  });

  // Fetch teams data
  const {
    data: uteams = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['uteams'],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/team/teams/my-teams/${uemail}`);
      return data;
    },
  });

  // Delet task by ID
  const handleContinue = _id => {
    handleDelete(_id);
  };

  const data = useMemo(() => task, [task]);
  const columns = [
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
      header: ({ column }) => {
        return (
          <Button
            className="pl-0 hover:bg-transparent"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Start Date
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue('tdate')}</div>,
    },
    {
      accessorKey: 'teamId',
      header: 'Team',
      cell: ({ row }) => <div className="capitalize">{row.getValue('teamId')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const task = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                {/* Dialoge box for edit task */}
                {/* <div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      openModal();
                    }}
                  >
                    Open Modal
                  </button>
                  <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles}>
                    <button onClick={closeModal}>close</button>
                    <div>I am a modal</div>
                  </Modal>
                </div> */}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Alert onContinue={() => handleContinue(task._id)}>
                  {openDialog => (
                    <button
                      className="w-full text-left"
                      onClick={e => {
                        e.stopPropagation();
                        openDialog();
                      }}
                    >
                      Delete
                    </button>
                  )}
                </Alert>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(
                    `Task : ${task.tname} , Assigned : ${task.tassignTo},Status : ${task.tproces} , Start Date : ${task.tdate} , Assigned Teams : ${task.teamId}`
                  )
                }
              >
                Copy Task Info
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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
  }, 300);

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
        <div className="flex-1 text-sm text-muted-foreground">Total {table.getFilteredRowModel().rows.length} tasks availble</div>
      </div>
    </div>
  );
}
