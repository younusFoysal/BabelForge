import React from 'react';
import { IoSearch } from 'react-icons/io5';

const Page = async () => {
  return (
    <section className="w-full mt-3 px-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-[#333]">Teams and projects</h2>
        <button className="hover:bg-[#2D64DC] bg-[#3575ff] text-[15px] text-white px-3 py-2 rounded-sm">Create team</button>
      </div>
      {/* Search Teams and Projects */}
      <div className="relative mt-9">
        <input
          className="placeholder:text-[25px]  text-[25px] text-[#777] placeholder:text-[#777] duration-500 py-1 px-5 pl-7 w-full border-b-2 hover:border-[#3575ff] focus:outline-none"
          placeholder="Search for teams and projects"
          type="text"
          name="search"
          id=""
        />
        <IoSearch className="absolute text-[22px] text-[#777] top-1/2 left-0 -translate-y-1/2" />
      </div>
    </section>
  );
};

export default Page;
