'use client';
import DetailsCard from '@/components/Dashboards/MainPage/DetailsCard';
import { ExportTeamInfo } from '@/components/Dashboards/MainPage/ExportTeamInfo';
import { PieCharts } from '@/components/Dashboards/MainPage/PieCharts';
import TeamInfo from '@/components/Dashboards/MainPage/TeamInfo';

const page = () => {
  return (
    <div className="w-full px-4 mt-9 md:mt-2">
      <div className="flex gap-9 md:gap-3 mb-10 flex-wrap justify-center md:justify-between items-center">
        <h1 className="font-bold text-3xl  text-[#333]">Dashboard</h1>
        <ExportTeamInfo />
      </div>
      {/* Details Card Section Start here */}
      <section>
        <DetailsCard />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieCharts />
        <TeamInfo />
      </section>
    </div>
  );
};

export default page;
