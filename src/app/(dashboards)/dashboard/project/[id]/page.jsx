"use client";

import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";
import { space } from "postcss/lib/list";

const ProjectDetails = () => {
  const axiosCommon = useAxiosCommon();
  const params = useParams();
  const { id } = params;


  const {
    data: project = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["updateproject"],
    queryFn: async () => {
      const data = await axiosCommon.get(`/project/projects/single/${id}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  console.log(project.data);

  const { favorite, pallmembers, pcategory, pdes, pedate, pimg, pmanager, pmname, pname, psdate, purl, _id } = project.data;

  return (
    <section className="flex flex-col md:flex-row mt-5">

      {/* left- overview */}
      <div className="w-full md:w-1/4 border-r">
        <div className="w-48 h-48 mx-auto rounded-full">
          <Image
            src={pimg}
            width={100}
            height={100}
            alt="project_image"
            className="rounded-full w-full h-full object-cover"
          />
        </div>

        <div className="mt-5 space-y-2 px-3">
          <div>
            <h2 className="font-bold text-2xl">{pname}</h2>
            <p className="text-gray-700">{pcategory}</p>
          </div>
          <p > <span className="font-bold">Starts at:</span> {psdate}</p>
          <p > <span className="font-bold">Ends at: </span>{pedate ? <span> {pedate}</span> : <span> On Going</span>}</p>
          <div className="flex items-center gap-1">
            <IoIosLink className="font-bold text-lg" />
            <Link className="font-semibold hover:text-blue-600" href={`${purl}`}>{purl}</Link>
          </div>
        </div>
        <div className="flex items-center justify-center mt-5 ">
          <button className="border p-2 rounded-lg">End Project</button>
        </div>
      </div>


      {/* right- details */}
      <div className="w-full md:w-3/4 px-7">

        {/* manager info */}
        <div className="space-y-3">
          <h2 className="border-b pb-2 font-bold text-xl">Manager Info</h2>
          <div className="flex justify-center text-center">

            <div className="w-full border-r">
              <h3 className="font-bold">Name</h3>
              <p className="text-gray-700">{pmname}</p>
            </div>

            <div className="w-full">
              <h3 className="font-bold">Email</h3>
              <p className="text-gray-700">{pmanager}</p>
            </div>

          </div>
        </div>

        {/* description */}
        <div className="mt-7 space-y-2">
          <h3 className="border-b pb-2 font-bold text-xl">Project Description</h3>
          <p className="text-gray-700">{pdes}</p>
        </div>

        {/* teams */}
        <div className="mt-7 space-y-2">
          <h3 className="border-b pb-2 font-bold text-xl">Teams</h3>
          <p>team1</p>
          <p>team2</p>
          <p>team3</p>
        </div>

      </div>

    </section>
  );
};

export default ProjectDetails;
