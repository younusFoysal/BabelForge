'use client';
import { Input } from '@/components/ui/input';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { IoIosSearch } from 'react-icons/io';

import useProjects from '@/hooks/useProjects';

import { useState } from 'react';
import Link from 'next/link';

import CommonTable from '../shared/CommonTable/CommonTable';
import { useUser } from '@clerk/nextjs';
import NoDataFound from '../shared/NoDataFound/NoDataFound';
import LoadingSpinner from '../shared/LoadingSpinner/LoadingSpinner';

const ProjectPage = () => {
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { data: projects = [], isLoading, refetch: projectRefetch } = useProjects(uemail, search, category);

  if (!projects?.length && !search?.length && !category?.length) {
    return <NoDataFound text={'No Project Created Yet.'} btnText={'Create Project'} btnLink={'/dashboard/createproject'}></NoDataFound>;
  }

  const projectCategories = ['All', 'Software Engineering', 'Education', 'Non Profit Organization', 'Project Management'];

  const theads = ['Fav', 'Image', 'Name', 'Type', 'Manager', 'Project URL', 'Start Date', 'End Date', 'More Action'];

  const handleSearchByClick = e => {
    e.preventDefault();
    const inputData = document.getElementById('inputField').value;
    setSearch(inputData);
  };

  const handleSearchByEnter = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputData = document.getElementById('inputField').value;
      setSearch(inputData);
    }
  };

  const handleFilter = value => {
    setCategory(value);
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <section>
      {/* page heading */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl  font-medium">Projects</h3>
        <div>
          <Link href="/dashboard/createproject">
            <button className="px-6 py-3 capitalize bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center group ${className} dark:bg-gray-50 text-white">
              Create Project
            </button>
          </Link>
        </div>
      </div>

      {/* Input box content */}
      <div className="my-8 w-full flex flex-col md:flex-row justify-start items-center gap-3 md:gap-6">
        {/* search box */}
        <div className=" w-full lg:w-[30%]">
          <div className="flex justify-center items-center relative">
            <Input
              onKeyDown={handleSearchByEnter}
              id="inputField"
              className="w-full py-4 border-gray-500 border-[1px]"
              placeholder="Project Name"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2">
              <IoIosSearch onClick={handleSearchByClick} className="cursor-pointer"></IoIosSearch>
            </span>
          </div>
        </div>

        {/* dropdown */}
        <div className="w-[100%]">
          <Select
            onValueChange={value => {
              handleFilter(value);
            }}
          >
            <SelectTrigger className="lg:w-[30%] w-full py-4 border-gray-500 border-[1px] rounded-sm ">
              <SelectValue placeholder="Filter By Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {projectCategories.map((category, index) => (
                  <SelectItem key={index} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {projects.length ? (
        <CommonTable theads={theads} tdata={projects} projectRefetch={projectRefetch}></CommonTable>
      ) : (
        <NoDataFound text={'No Data Found'}></NoDataFound>
      )}

      {/*TODO- pagination */}
      {/* <div className="mt-6">
        <Pagination className="flex justify-start ">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div> */}
    </section>
  );
};

export default ProjectPage;
