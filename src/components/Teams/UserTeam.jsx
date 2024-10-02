'use client';
import AllTeams from '@/components/Teams/AllTeams';
import UseTeams from '@/hooks/useTeams';
import React, { useRef, useState } from 'react';
import { IoSearch } from 'react-icons/io5';

const UserTeam = () => {
  const myRef = useRef('');
  // We have to update this email to currnet user email
  const [teams, isLoading] = UseTeams('foysaal@mail.com');
  const [searchQuery, setSearchQuery] = useState('');

  // handle Search

  const handleSeach = () => {
    setSearchQuery(myRef.current.value);
  };

  return (
    <section className="w-full mt-3 px-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-[#333]">Teams and projects</h2>
        <button className="hover:bg-[#2D64DC] bg-[#3575ff] text-[15px] text-white px-3 py-2 rounded-sm">Create team</button>
      </div>
      {/* Search Teams and Projects */}
      <div className="relative mt-8">
        <input
          onChange={() => handleSeach()}
          ref={myRef}
          className="placeholder:text-[25px]  text-[25px] text-[#777] placeholder:text-[#777] duration-500 py-1 px-5 pl-7 w-full border-b-2 focus:border-[#3575ff] hover:border-[#3575ff] focus:outline-0 focus:outline-none"
          placeholder="Search for teams and category"
          type="text"
          name="search"
          id=""
        />
        <IoSearch className="absolute text-[22px] text-[#777] top-1/2 left-0 -translate-y-1/2" />
      </div>
      <AllTeams searchQuery={searchQuery} teams={teams} isLoading={isLoading} />
    </section>
  );
};

export default UserTeam;
