'use client';
import UseUsers from '@/hooks/useUsers';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { FaTelegramPlane } from 'react-icons/fa';
import { Card } from '../ui/card';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const AllTeams = ({ teams, isLoading: loadingTeams, searchQuery }) => {
  const [myTeams, setMyTeams] = useState();
  const [myTeams2, setMyTeams2] = useState();
  const [users, isLoading] = UseUsers();
  const [searchText, setSearchText] = useState(searchQuery);
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState('All');
  const router = useRouter();

  useEffect(() => {
    setMyTeams(teams);
    setMyTeams2(teams);
  }, [teams]);

  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  // Store Categories and remove duplicate
  useEffect(() => {
    if (myTeams2 && myTeams2.length > 0) {
      const categories = myTeams2.map(item => item.tcategory);
      const uniqueCategories = [...new Set(categories)];
      setCategory(uniqueCategories);
    }
  }, [myTeams2]);

  useEffect(() => {
    // Filter by search text
    let filteredItems = myTeams2?.filter(item => {
      return (
        item?.tname?.toLowerCase().includes(searchText?.toLowerCase()) || item?.tcategory?.toLowerCase().includes(searchText?.toLowerCase())
      );
    });

    // If search doesn't return any results or no searchText provided, use the original team list
    if (!filteredItems || searchText === '') {
      filteredItems = myTeams2;
    }

    // Apply category filter, if a specific category is selected
    if (selectCategory !== 'All') {
      filteredItems = filteredItems.filter(item => item?.tcategory === selectCategory);
    }

    // Update state with the filtered list
    setMyTeams(filteredItems);
  }, [searchText, selectCategory, myTeams2]);

  if (loadingTeams || isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-12">
      {/* Team category */}
      <div className="flex justify-end mb-8">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-4">
          <p>Category : </p>
          <Select
            onValueChange={value => {
              setSelectCategory(value);
            }}
            defaultValue="All"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All</SelectItem>
                {category?.map(item => {
                  return (
                    <SelectItem key={item} value={`${item}`}>
                      {item}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {myTeams &&
          myTeams?.map(({ tname, tpic, tdes, _id, tcategory, tleader, tmembers }) => (
            <Card
              onClick={() => {
                router.push(`/dashboard/teams/${_id}`);
              }}
              key={_id}
              className="border hover:shadow-lg cursor-pointer duration-300 rounded-2xl"
            >
              <Image className={`w-[95px] mx-auto h-[95px] mt-6 rounded-full object-cover`} alt="" width={80} height={80} src={`${tpic}`} />
              <div className="p-5">
                <h3 className="text-center text-[18px]">{tname}</h3>
                {/* Leader Name */}
                <p className="text-[14px] my-1 text-[#666] font-light text-center capitalize">
                  <span className="">
                    {' '}
                    {Array.isArray(users) && users.length > 0
                      ? users.find(user => user.email === tleader)?.name || 'Not found'
                      : 'No users available'}
                  </span>
                </p>
                {/* Team category */}
                <p className="text-[14px] font-semibold mb-3 text-center capitalize">{tcategory}</p>
                {/* Team Member Photo */}
                <div className="flex mr-3 bg-[#f0f0f072] py-2 rounded-3xl cursor-pointer items-center justify-center">
                  {tmembers?.slice(0, 3).map((temember, index) => {
                    return (
                      <HoverCard key={index}>
                        <HoverCardTrigger className="w-9 -mr-3 border-[#fff] border-[4px] h-9 rounded-full">
                          <Image
                            className={`w-full h-full object-cover rounded-full`}
                            alt=""
                            width={40}
                            height={40}
                            src={`${
                              (users.length > 0 &&
                                users?.find(user => {
                                  return user.email == temember;
                                })?.image) ||
                              'https://media.istockphoto.com/id/1346944001/photo/close-up-of-co-workers-stacking-their-hands-together.jpg?s=612x612&w=0&k=20&c=lidJcFUSR3rkMt4B0yoNwH55lz3sth9o2280keqBXGE='
                            }`}
                          />
                        </HoverCardTrigger>
                        <HoverCardContent className="gap-4 h-[130px]  w-[300px]">
                          <div className="flex items-center gap-4">
                            <Image
                              className={`w-16 h-16 border-[#2f69fd] border-4 object-cover rounded-full`}
                              alt=""
                              width={50}
                              height={50}
                              src={`${
                                users.length > 0 &&
                                users?.find(user => {
                                  return user.email == temember;
                                })?.image
                              }`}
                            />
                            <p className="">
                              {' '}
                              {(users.length > 0 &&
                                users?.find(user => {
                                  return user.email == temember;
                                })?.name) ||
                                'Unknown'}
                            </p>
                          </div>
                          <button className="bg-[#2f69fd] px-3 py-1 rounded-sm text-[13px] ml-auto flex items-center gap-3 justify-end text-white">
                            <span>Send Message</span>
                            <FaTelegramPlane />
                          </button>
                        </HoverCardContent>
                      </HoverCard>
                    );
                  })}
                  {tmembers?.length > 3 && (
                    <div className="flex text-[12px] bg-[#ddddde] border-[#fff] border-[4px] w-9 h-9 rounded-full items-center justify-center text-[#333]">
                      +{tmembers?.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default AllTeams;
