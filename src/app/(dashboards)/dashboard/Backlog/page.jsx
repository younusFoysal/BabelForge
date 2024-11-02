import Backlogs from '@/components/Backlogs/Backlogs';
import React from 'react';

export const metadata = {
  title: "Backlogs | BabelForge",
  description: "Backlogs for BabelForge",
}

const page = () => {
  return (
    <div>
      <Backlogs />
    </div>
  );
};

export default page;