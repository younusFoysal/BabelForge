'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { IoIosSearch } from 'react-icons/io';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import useProjects from '@/hooks/useProjects';

import { useEffect, useState } from 'react';
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
    return (
      <NoDataFound text={"No Project Created Yet."} btnText={"Create Project"} btnLink={"/dashboard/createproject"}></NoDataFound>
    );
  }

  const projectCategories = ['All', 'Software Engineering', 'Education', 'Non Profit Organization', 'Project Management'];

  const theads = ['Fav', 'Image', 'Name', 'Type', 'Manager', 'Project URL', 'Start Date', 'End Date', 'More Action'];

  const handleSearchByClick = () => {
    const inputData = document.getElementById('inputField').value;
    setSearch(inputData);
  };

  const handleSearchByEnter = e => {
    if (e.key === 'Enter') {
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
            <button className="bg-bgColor hover:bg-bgHoverColor text-white text-md hover:scale-105 duration-500 hover:shadow-lg hover:shadow-[#0362F3FF] font-medium px-4 py-2 rounded-md">
              Create Project
            </button>
          </Link>
        </div>
      </div>

      {/* Input box content */}
      <div className="my-8 w-full flex justify-start items-center gap-6">
        {/* search box */}
        <div className="lg:w-[30%] w-full">
          <div className="flex justify-center items-center">
            <Input
              onKeyDown={handleSearchByEnter}
              id="inputField"
              className="py-4 border-gray-500 border-[1px]"
              placeholder="Project Name"
            />
            <span className="translate-x-[-180%]">
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

      {
        projects.length ? <CommonTable theads={theads} tdata={projects} projectRefetch={projectRefetch}></CommonTable> :
          <NoDataFound text={"No Data Found"}></NoDataFound>
      }




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
