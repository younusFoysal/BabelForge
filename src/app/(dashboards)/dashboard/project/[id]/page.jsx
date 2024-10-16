"use client";

import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import {useParams} from "next/navigation";

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

  const { pcategory, pdes, pname, pimg, purl, pmname, pmanager, pallmembers } =
    project.data;

  return (
    <div
      className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200"
      id="panel"
    >
      <div className="w-full px-6 py-6 mx-auto min-height-50vh text-slate-500">
        <div className="relative flex flex-col flex-auto min-w-0 p-4 overflow-hidden break-words border-0 drop-shadow-xl rounded-2xl bg-white/80 bg-clip-border mb-4">
          <div className="flex flex-wrap -mx-3">
            <div className="flex-none w-auto max-w-full px-3">
              <div className="text-base ease-soft-in-out h-18.5 w-18.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                <Image
                  src="https://demos.creative-tim.com/soft-ui-dashboard-tailwind/assets/img/bruce-mars.jpg"
                  width={100}
                  height={100}
                  alt="profile_image"
                  className="w-full shadow-soft-sm rounded-xl"
                />
              </div>
            </div>
            <div className="flex-none w-auto max-w-full px-3 my-auto">
              <div className="h-full">
                <h5 className="mb-1">{pname}</h5>
                <p className="mb-0 font-semibold leading-normal text-sm">
                  {pcategory}
                </p>
              </div>
            </div>
            <div className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12"></div>
          </div>
        </div>
        <div className="w-full pb-6 mx-auto removable">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 drop-shadow-xl lg-max:mt-6 xl:w-4/12 mb-4">
              <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                  <div className="flex flex-wrap -mx-3">
                    <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                      <h6 className="mb-0">Project Description</h6>
                    </div>
                    <div className="w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none">
                      <a
                        href="javascript:;"
                        data-target="tooltip_trigger"
                        data-placement="top"
                      >
                        <i
                          className="leading-normal fas fa-user-edit text-sm text-slate-400"
                          aria-hidden="true"
                        ></i>
                      </a>
                      <div
                        data-target="tooltip"
                        className="px-2 py-1 text-center text-white bg-black rounded-lg text-sm hidden"
                        role="tooltip"
                        data-popper-placement="top"
                      >
                        {" "}
                        Edit Profile{" "}
                        <div
                          className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                          data-popper-arrow=""
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-auto p-4">
                  <p className="leading-normal text-sm">{pdes}</p>
                  <hr className="h-px my-6 bg-transparent  bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                  <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                    <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
                      <strong className="text-slate-700">Full Name:</strong>{" "}
                      &nbsp; {pmname}
                    </li>
                    <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                      <strong className="text-slate-700">Mobile:</strong> &nbsp;
                      (44) 123 1234 123
                    </li>
                    <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                      <strong className="text-slate-700">Email:</strong> &nbsp;
                      {pmanager}
                    </li>
                    <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                      <strong className="text-slate-700">Location:</strong>{" "}
                      &nbsp; USA
                    </li>
                    <li className="relative block px-4 py-2 pb-0 pl-0 bg-white border-0 border-t-0 rounded-b-lg text-inherit">
                      <strong className="leading-normal text-sm text-slate-700">
                        Social: {purl}
                      </strong>{" "}
                      &nbsp;
                      <a
                        className="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center text-blue-800 align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-none"
                        href="javascript:;"
                      >
                        <i
                          className="fab fa-facebook fa-lg"
                          aria-hidden="true"
                        ></i>
                      </a>
                      <a
                        className="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-none text-sky-600"
                        href="javascript:;"
                      >
                        <i
                          className="fab fa-twitter fa-lg"
                          aria-hidden="true"
                        ></i>
                      </a>
                      <a
                        className="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-none text-sky-900"
                        href="javascript:;"
                      >
                        <i
                          className="fab fa-instagram fa-lg"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full max-w-full px-3 drop-shadow-xl lg-max:mt-6 xl:w-3/12 mb-4">
              <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                  <h6 className="mb-0">Team Leaders</h6>
                </div>
                <div className="flex-auto p-4">
                  <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                    {pallmembers.map((leader, index) => (
                      <li
                        key={index}
                        className="relative flex items-center px-0 py-2 mb-2 bg-white border-0 rounded-t-lg text-inherit"
                      >
                        <div className="text-sm font-medium leading-none flex items-center gap-2  ">
                          <Avatar className="mt-2">
                            <AvatarImage
                              src="https://github.com/shadcn.png"
                              alt="@shadcn"
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <AvatarFallback>{leader}</AvatarFallback>
                          </Avatar>
                          <p className="text-muted-foreground">{leader}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
