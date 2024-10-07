'use client';
import UseUsers from '@/hooks/useUsers';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { FaTelegramPlane } from 'react-icons/fa';
import { Card } from '../ui/card';
import { useRouter } from 'next/navigation';
import usericon from '@/image/icon/user.png';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AllTeams = ({ teams, isLoading: loadingTeams, searchQuery }) => {
  const [filteredTeams, setFilteredTeams] = useState(teams);
  const [searchText, setSearchText] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [users, isLoadingUsers] = UseUsers();
  const router = useRouter();

  useEffect(() => {
    setSearchText(searchQuery);
  }, [searchQuery]);

  // Store categroy
  const categories = useMemo(() => {
    if (teams && teams.length > 0) {
      return ['All', ...new Set(teams.map(item => item.tcategory))];
    }
    return [];
  }, [teams]);

  // Filter teams by search text and selected category
  useEffect(() => {
    let filtered = teams;

    if (searchText) {
      const lowerSearchText = searchText.toLowerCase();
      filtered = filtered.filter(
        item => item?.tname?.toLowerCase().includes(lowerSearchText) || item?.tcategory?.toLowerCase().includes(lowerSearchText)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item?.tcategory === selectedCategory);
    }
    setFilteredTeams(filtered);
  }, [searchText, selectedCategory, teams]);

  if (loadingTeams || isLoadingUsers) return <div>Loading...</div>;

  return (
    <div className="mt-12">
      {/* Team category */}
      <div className="flex justify-end mb-8">
        <div className="flex items-center gap-4">
          <p>Category :</p>
          <Select onValueChange={setSelectedCategory} defaultValue="All">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories?.map(item => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Display teams */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredTeams?.map(({ tname, tpic, _id, tcategory, tleader, tmembers }) => (
          <Card
            onClick={() => router.push(`/dashboard/teams/${_id}`)}
            key={_id}
            className="border hover:shadow-lg cursor-pointer duration-300 rounded-2xl"
          >
            <Image className="w-[95px] mx-auto h-[95px] mt-6 rounded-full object-cover" alt={tname} width={80} height={80} src={tpic} />
            <div className="p-5">
              <h3 className="text-center text-[18px]">{tname}</h3>
              <p className="text-[14px] my-1 text-[#666] font-light text-center capitalize">
                Leader: {users?.find(user => user.email === tleader)?.name || 'Unknown'}
              </p>
              <p className="text-[14px] font-semibold mb-3 text-center capitalize">{tcategory}</p>

              {/* Team members */}
              <div className="flex mr-3 bg-[#f0f0f072] py-2 rounded-3xl cursor-pointer items-center justify-center">
                {tmembers?.slice(0, 3).map((member, index) => {
                  const memberDetails = users?.find(user => user.email === member);
                  return (
                    <HoverCard key={index}>
                      <HoverCardTrigger className="w-9 -mr-3 border-[#fff] border-[4px] h-9 rounded-full">
                        <Image
                          className="w-full h-full object-cover rounded-full"
                          alt={memberDetails?.name || 'Member'}
                          width={40}
                          height={40}
                          src={memberDetails?.image || usericon}
                        />
                      </HoverCardTrigger>
                      <HoverCardContent className="gap-4 h-[130px] w-[300px]">
                        <div className="flex items-center gap-4">
                          <Image
                            className="w-16 h-16 border-[#2f69fd] border-4 object-cover rounded-full"
                            alt={memberDetails?.name || 'Member'}
                            width={50}
                            height={50}
                            src={memberDetails?.image || usericon}
                          />
                          <p>{memberDetails?.name || 'Unknown'}</p>
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
                    +{tmembers.length - 3}
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
