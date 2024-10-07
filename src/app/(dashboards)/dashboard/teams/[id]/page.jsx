import React from 'react';
import Team from '@/components/Teams/Team';

const Page = ({ params }) => {
  const id = params.id;
  console.log(id);

  return (
    <div>
      <Team id={id}></Team>
    </div>
  );
};

export default Page;
