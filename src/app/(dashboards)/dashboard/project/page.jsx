import React from "react";
import ProjectDetails from "./[id]/page";

export const metadata = {
  title: "Project | BabelForge",
  description: "Project details for BabelForge",
}

const page = () => {
  return (
    <div>
      <ProjectDetails />
    </div>
  );
};

export default page;
