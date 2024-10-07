import UpdateProjectPage from "@/components/Projects/UpdatePage";
import React from "react";

const Updateproject = (props) => {
  const id = props.params.id;

  return <UpdateProjectPage id={id} />;
};

export default Updateproject;
