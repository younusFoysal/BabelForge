import React from 'react';
import { ExportTeamInfo } from './ExportTeamInfo';
import DetailsCard from './DetailsCard';
import { PieCharts } from './PieCharts';
import TeamInfo from './TeamInfo';
import useAxiosCommon from '@/lib/axiosCommon';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const MainPageWrap = () => {
  const axiosCommon = useAxiosCommon();
  const session = useSession();
  const user = session?.data?.user;

  const { isLoading, data: stats } = useQuery({
    queryKey: ["dashuser", user],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/dashboard/stat/${user.email}`);
      return data;
    },
  });
  console.log(stats);

  if (isLoading) return <div>Loading...</div>;
    console.log("If", stats);

  return (
    <div className="w-full px-4 mt-9 md:mt-2">
      <div className="flex gap-9 md:gap-3 mb-10 flex-wrap justify-center md:justify-between items-center">
        <h1 className="font-bold text-3xl  text-[#333] dark:text-white">Dashboard</h1>
        <ExportTeamInfo stats={stats} isLoading={isLoading} />
      </div>
      {/* Details Card Section Start here */}
      <section>
        <DetailsCard stats={stats} isLoading={isLoading} />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieCharts stats={stats} isLoading={isLoading} />
        <TeamInfo stats={stats} isLoading={isLoading} />
      </section>
    </div>
  );
};

export default MainPageWrap;
