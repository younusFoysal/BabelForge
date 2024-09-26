'use client';
import DetailsCard from '@/components/Dashboards/MainPage/DetailsCard';
import { PieCharts } from '@/components/Dashboards/MainPage/PieCharts';
import TeamInfo from '@/components/Dashboards/MainPage/TeamInfo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MdOutlinePending, MdOutlinePendingActions, MdTask } from 'react-icons/md';
import { RiTeamLine } from 'react-icons/ri';
import { TbUsersGroup } from 'react-icons/tb';

const page = () => {
  return (
    <div className="w-full px-4">
      <h1 className="font-bold text-3xl mb-8 text-[#333]">Dashboard</h1>
      {/* Details Card Section Start here */}
      <section className="grid grid-cols-1 md:grid-cols-2 mb-8 lg:grid-cols-4 gap-5">
        {/* Total Member Card */}
        <DetailsCard
          title="Total Members"
          details="Shows the total number of registered members in your team"
          icon={<TbUsersGroup />}
          value="1,254"
        ></DetailsCard>
        {/* Total Team Card */}
        <DetailsCard title="Total Teams" details="Shows the total number of active teams" icon={<RiTeamLine />} value="9"></DetailsCard>
        {/* Total Task Card */}
        <DetailsCard title="Total Tasks" details="Displays the total number of tasks created ." icon={<MdTask />} value="200"></DetailsCard>
        {/* Pending Task Card */}
        <DetailsCard
          title="Pending Tasks"
          details="Displays the total number of tasks created ."
          icon={<MdOutlinePendingActions />}
          value="240"
        ></DetailsCard>
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
