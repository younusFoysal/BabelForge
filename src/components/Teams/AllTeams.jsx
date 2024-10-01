'use client';
import UseUsers from '@/hooks/useUsers';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { FaTelegramPlane } from 'react-icons/fa';

const AllTeams = ({ teams, isLoading: loadingTeams }) => {
  const [myTeams, setMyTeams] = useState();
  const [users, isLoading] = UseUsers();

  useEffect(() => {
    setMyTeams(teams);
  }, [teams]);

  if (loadingTeams) return <div>Loading...</div>;

  return (
    <div className="mt-9">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {myTeams &&
          myTeams?.map(({ tname, tpic, tdes, _id, tleader, tmembers }) => (
            <div key={_id} className="border rounded-lg">
              <div className="w-full rounded-t-lg h-[130px] bg-red-500"></div>
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
                      <HoverCard key={index}>
                        <HoverCardTrigger className="w-9 -mr-3 border-[#fff] border-[4px] h-9 rounded-full">
                          <Image
                            className={`w-full h-full object-cover rounded-full`}
                            alt=""
                            width={40}
                            height={40}
                            src={`${users &&
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
                              src={`${users &&
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllTeams;
