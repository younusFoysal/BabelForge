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
  const [selectCategory, setSelectCategory] = useState();
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

  // Search Team and sort via category
  useEffect(() => {
    const filteredItems = myTeams?.filter(item => {
      return item?.tname?.toLowerCase().includes(searchText?.toLowerCase());
      // item?.projects?.toLowerCase().includes(searchText?.toLowerCase())
    });
    setMyTeams(filteredItems);
    if (!filteredItems || filteredItems?.length < 1) {
      console.log('length 0');
      setMyTeams(teams);
    }

    // selected category
    if (selectCategory) {
      const filteredItemsByCategory = myTeams2?.filter(item => {
        return item?.tcategory === selectCategory;
      });
      setMyTeams(filteredItemsByCategory);
    }
  }, [searchText, selectCategory]);

  if (loadingTeams) return <div>Loading...</div>;

  return (
    <div className="mt-12">
      {/* Team category */}
      <div className="flex justify-end mb-8">
        <div className="flex items-center gap-4">
          <p>Category : </p>
          <Select
            onValueChange={value => {
              setSelectCategory(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>All</SelectLabel>
                {category.map(item => {
                  return <SelectItem value={`${item}`}>{item}</SelectItem>;
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {myTeams &&
          myTeams?.map(({ tname, tpic, tdes, _id, tleader, tmembers }) => (
            <Card
              onClick={() => {
                router.push(`/dashboard/teams/${_id}`);
              }}
              key={_id}
              className="border hover:shadow-lg cursor-pointer duration-300 rounded-lg"
            >
              <Image className={`w-full rounded-t-lg h-[120px] object-cover`} alt="" width={80} height={80} src={`${tpic}`} />
              <div className="p-5">
                <h3 className="text-center text-[20px] mb-2">{tname}</h3>
                <p className="text-[14px] text-center capitalize">
                  Leader :
                  <span className="font-semibold">
                    {' '}
                    {(users &&
                      users?.find(user => {
                        return user.email == tleader;
                      }).name) ||
                      'Not found'}
                  </span>
                </p>
                {/* Team Member Photo */}
                <div className="flex mr-3 cursor-pointer  mt-5 items-center justify-center">
                  {tmembers?.slice(0, 3).map((temember, index) => {
                    return (
                      <HoverCard>
                        <HoverCardTrigger className="w-9 -mr-3 border-[#fff] border-[4px] h-9 rounded-full">
                          <Image
                            className={`w-full h-full object-cover rounded-full`}
                            alt=""
                            width={40}
                            height={40}
                            src={`${
                              users &&
                              users?.find(user => {
                                return user.email == temember;
                              }).image
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
                                users &&
                                users?.find(user => {
                                  return user.email == temember;
                                }).image
                              }`}
                            />
                            <p className="">
                              {' '}
                              {(users &&
                                users?.find(user => {
                                  return user.email == temember;
                                }).name) ||
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
