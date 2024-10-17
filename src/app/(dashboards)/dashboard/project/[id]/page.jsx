"use client";

import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";
import { space } from "postcss/lib/list";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";


const ProjectDetails = () => {
  const axiosCommon = useAxiosCommon();
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [currentDate, setCurrentDate] = useState('');

  // useeffects
  useEffect(() => {
    const now = new Date();

    // Convert to GMT+6
    const gmt6Offset = 6 * 60 * 60 * 1000;
    const gmt6Date = new Date(now.getTime() + gmt6Offset);

    // Format date as YYYY-MM-DD
    const year = gmt6Date.getUTCFullYear();
    const month = String(gmt6Date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(gmt6Date.getUTCDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Set the formatted date and time
    setCurrentDate(formattedDate);
  }, []);

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

  const {
    data: teamsOfProject = [],
    isLoading: teamsOfProjectLoading,
    refetch: teamsOfProjectRefetch,
  } = useQuery({
    queryKey: ["teamsOfProjectss"],
    queryFn: async () => {
      const data = await axiosCommon.get(`team/teams/of-project/${id}`);
      return data;
    },
  });



  if (isLoading || teamsOfProjectLoading) {
    return <LoadingSpinner />;
  }

  // console.log(project.data);

  const { favorite, pallmembers, pcategory, pdes, pedate, pimg, pmanager, pmname, pname, psdate, purl, _id } = project.data;



  const handleEndProject = (id) => {
    // console.log(id);
    // console.log(id, currentDate);

    axiosCommon.patch(`project/projects/update/${id}`, { pedate: currentDate })
      .then(res => {
        // console.log(res);
        if (res.data.modifiedCount) {
          // console.log(res);
          refetch();
          toast.success('Project Ended.');
        }
      })
  }

  return (
    <section className="flex flex-col md:flex-row my-5 md:ml-2">

      {/* left- overview */}
      <div className="w-[90%] mx-auto md:mx-0 md:w-1/4 border rounded-lg bg-gray-100 hover:shadow-lg duration-300 h-fit dark:bg-white/10 dark:border-white/30 dark:hover:shadow-white/20">
        <div className="h-48 mx-auto rounded-lg p-2">
          <Image
            src={pimg}
            width={100}
            height={100}
            alt="project_image"
            className="rounded-lg w-full h-full object-cover"
          />
        </div>

        <div className="mt-5 space-y-2 px-2">
          <div>
            <h2 className="font-bold text-2xl">{pname}</h2>
            <p className="text-gray-700 dark:text-white/80">{pcategory}</p>
          </div>
          <p > <span className="font-bold">Starts at:</span> {psdate}</p>
          <p > <span className="font-bold">Ends at: </span>{pedate ? <span> {pedate}</span> : <span> On Going</span>}</p>
          <div className="flex items-center gap-1">
            <IoIosLink className="font-bold text-lg" />
            <Link className="font-semibold hover:text-blue-600" href={`${purl}`}>{purl.slice(0, 30) + "..."}</Link>
          </div>
        </div>
        <div className="flex items-center mt-5 px-2 mb-3">
          {
            pedate ? <button className="bg-bgColor dark:hover:shadow-bgColor/30 opacity-50 cursor-not-allowed text-white text-md duration-300 hover:shadow-lg hover:shadow-blue-200 font-medium px-4 py-2 rounded-md" disabled>End Project</button> :

              <button onClick={() => handleEndProject(_id)} className="bg-bgColor hover:bg-bgHoverColor text-white text-md hover:scale-105 duration-500 hover:shadow-lg hover:shadow-[#0362F3FF] font-medium px-4 py-2 rounded-md">End Project</button>
          }

        </div>
      </div>


      {/* right- details */}
      <div className="w-full md:w-3/4 px-7 my-5 md:my-0">


        {/* test */}

        <div class="flex justify-center items-center">
          <div class="w-full ml-1 mr-1 flex flex-col justify-center items-center border-gray-700 text-center">
            <div class="w-full rounded-2xl p-8 text-white bg-gradient-to-br from-[#5f99f9] to-[#8868dc] pb-44 relative">
              <h1 class="text-2xl mb-4 font-bold">Manager Info</h1>
              <div className="text-center">
                <div className="w-full flex justify-center items-center gap-2">
                  <h3 className="font-bold ">Name: </h3>
                  <p className="text-gray-100 dark:text-white/80">{pmname}</p>
                </div>

                <div className="w-full flex items-center justify-center gap-2">
                  <h3 className="font-bold">Email: </h3>
                  <p className="text-gray-100 dark:text-white/80">{pmanager}</p>
                </div>
              </div>
            </div>
            <div class="text-center bg-white shadow-lg w-[80%] rounded-xl -mt-32 z-10 p-9 flex items-center flex-col dark:bg-gray-700 dark:hover:shadow-white/20 duration-300">
              <h2 class="text-2xl font-bold">Project Description</h2>
              <p class="text-gray-700 dark:text-white/80 p-5 rounded-lg text-sm leading-7">{pdes}</p>
            </div>
          </div>
        </div>

        
        <div className="mt-7">
          <h3 className="border-b pb-2 font-bold text-xl">Teams</h3>
          {
            teamsOfProject?.data.length === 0 && <p className="font-semibold mt-3">No Teams Created Yet.</p>
          }
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
            {
              teamsOfProject?.data.map(team =>
                <div onClick={() => router.push(`/dashboard/teams/${team._id}`)} key={team._id} className="flex gap-2 p-2 border hover:bg-gray-100 cursor-pointer bg-gray-100 hover:shadow-lg duration-300 rounded-lg dark:bg-white/10 dark:border-white/30 dark:hover:shadow-white/20">
                  <div className="w-10 h-10 rounded-full">
                    <Image
                      src={team?.tpic}
                      width={100}
                      height={100}
                      alt="project_image"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="-space-y-1">
                    <p className="font-bold">{team?.tname}</p>
                    <p className="text-sm text-gray-700 dark:text-white/80">{team?.tcategory}</p>
                  </div>
                </div>
              )
            }
          </div>

        </div>

      </div>

    </section>
  );
};

export default ProjectDetails;