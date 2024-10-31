"use client";
import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";
import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import Alert from "@/components/shared/Alert";
import usePerson from "@/hooks/usePerson";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";

const ProjectDetails = () => {
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  const axiosCommon = useAxiosCommon();
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [currentDate, setCurrentDate] = useState("");
  const [memberEmail, setMemberEmail] = useState(null);
  const [person, isUserLoading] = usePerson(memberEmail);

  // useeffects
  useEffect(() => {
    const now = new Date();

    // Convert to GMT+6
    const gmt6Offset = 6 * 60 * 60 * 1000;
    const gmt6Date = new Date(now.getTime() + gmt6Offset);

    // Format date as YYYY-MM-DD
    const year = gmt6Date.getUTCFullYear();
    const month = String(gmt6Date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(gmt6Date.getUTCDate()).padStart(2, "0");
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

  const {
    data: projectMembers,
    isLoading: isMembersLoading,
    refetch: memberRefetch,
  } = useQuery({
    queryKey: ["projectMembersAll", id],
    queryFn: async () => {
      const data = await axiosCommon.get(`/project/projects/members/${id}`);
      return data;
    },
  });
  // console.log("project members: ", projectMembers.data);

  // useEffect to set the first member email when pallmembers changes
  // useEffect(() => {
  //   if (project?.data?.pallmembers?.length > 0) {
  //     SetMemberEmail(project.data.pallmembers[0]); // Set the email of the first member
  //   }
  // }, [project]);

  // const [person] = usePerson(memberEmail);
  // console.log(person.data);

  const handleAddMember = (e) => {
    e.preventDefault();
    setMemberEmail(e.target.email.value);
    e.target.reset();
    // if (person.data) {
    //   toast({
    //     description: 'Member Added Successfully',
    //     variant: 'success',
    //   });
    // }
    // else {
    //   toast({
    //     description: 'Member not found',
    //     variant: 'error',
    //   });
    // }
  };

  useEffect(() => {
    if (memberEmail) {
      // Check if user is loading to avoid checking before data is available
      if (!isUserLoading) {
        if (person.data) {
          axiosCommon
            .patch(`project/projects/update/${id}`, { addMember: memberEmail })
            .then((res) => {
              if (res.data.modifiedCount) {
                memberRefetch();
                toast({
                  description: "Member Added",
                  variant: "success",
                });
              } else {
                toast({
                  description: "Member Already Exists.",
                  variant: "success",
                });
              }
            })
            .catch((error) => {
              if (error.status == 400) {
                toast({
                  description: "Member Already Exists.",
                  variant: "error",
                });
              }
            });
        } else {
          toast({
            description: "Member Not Found.",
            variant: "error",
          });
        }
      }
    }
  }, [person, isUserLoading, memberEmail, axiosCommon, id, memberRefetch]);

  if (isLoading || teamsOfProjectLoading || isMembersLoading) {
    return <LoadingSpinner />;
  }

  const {
    favorite,
    pallmembers,
    pcategory,
    pdes,
    pedate,
    pimg,
    pmanager,
    pmname,
    pname,
    psdate,
    purl,
    _id,
  } = project.data;
  // pallmembers.map(member => SetMemberEmail(member));

  const handleEndProject = (id) => {
    axiosCommon
      .patch(`project/projects/update/${id}`, { pedate: currentDate })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast({
            description: "Project Ended.",
            variant: "success",
          });
        }
      });
  };

  return (
    <section className="flex flex-col lg:flex-row gap-5">
      {/* left- overview */}
      <div className="lg:w-[50%] w-full  mx-auto md:mx-0  border rounded-lg bg-gray-100 hover:shadow-lg duration-300 h-fit dark:bg-[#181024] dark:border-[#3e1878c2]  dark:hover:border-[#3e1878] dark:hover:shadow-[#3e1878c2] dark:hover:bg-[#200e3be2]">
        <div className="h-48 mx-auto rounded-lg p-2">
          <Image
            src={pimg}
            width={100}
            height={100}
            alt="project_image"
            className="rounded-lg w-full h-full object-cover"
          />
        </div>

        <div className="mt-5 space-y-3 px-2 lg:px-5">
          <div>
            <h2 className="font-bold text-2xl">{pname}</h2>
            <p className="text-gray-700 dark:text-white/80">{pcategory}</p>
          </div>
          <p>
            {" "}
            <span className="font-bold">Starts at:</span> {psdate}
          </p>
          <p>
            {" "}
            <span className="font-bold">Ends at: </span>
            {pedate ? <span> {pedate}</span> : <span> On Going</span>}
          </p>
          <div className="flex items-center gap-1">
            <IoIosLink className="font-bold text-lg" />
            <Link
              target="_blank"
              className="font-semibold hover:text-blue-600"
              href={`${purl}`}
            >
              {purl.slice(0, 30) + "..."}
            </Link>
          </div>
        </div>
        <div className="flex items-center mt-5 px-2 lg:px-5 mb-3">
          {pedate ? (
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 opacity-50 cursor-not-allowed text-white text-md duration-300 hover:shadow-lg font-medium px-4 py-2 rounded-md"
              disabled
            >
              Project Ended
            </button>
          ) : (
            <Alert
              title="Are you absolutely sure?"
              description="This action cannot be undone and specifies that the project has ended."
              onContinue={() => handleEndProject(id)}
            >
              {(openDialog) => (
                <button
                  className="px-6 py-3 capitalize bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center group ${className} dark:bg-gray-50 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDialog();
                  }}
                >
                  End Project
                </button>
              )}
            </Alert>
            // <button
            //   onClick={() => handleEndProject(_id)}
            //   className="bg-bgColor hover:bg-bgHoverColor text-white text-md hover:scale-105 duration-500 hover:shadow-lg hover:shadow-[#0362F3FF] font-medium px-4 py-2 rounded-md"
            // >
            //   End Project
            // </button>
          )}
        </div>
      </div>

      {/* right- details */}
      <div className="w-full col-span-6 px-2 lg:px-7 my-5 md:my-0 ">
        {/* upper-right */}
        <div className="flex justify-center items-center  w-full">
          <div className="w-full ml-1 mr-1 flex flex-col justify-center items-center border-gray-700 text-center">
            {/* manager info */}
            <div className="w-full rounded-2xl p-2 md:p-8 text-white bg-gradient-to-br from-[#5f99f9] to-[#8868dc] pb-2 md:pb-44 relative">
              <h1 className="text-3xl mb-4 font-bold text-left">
                Manager Info
              </h1>
              <div className="text-center">
                <div className="w-full flex items-center  gap-2">
                  <h3 className="font-bold ">Name: </h3>
                  <p className="text-gray-100 dark:text-white/80">{pmname}</p>
                </div>

                <div className="w-full flex items-center  gap-2">
                  <h3 className="font-bold">Email: </h3>
                  <p className="text-gray-100 dark:text-white/80">{pmanager}</p>
                </div>
              </div>
            </div>

            {/* project description */}
            <div className="text-left bg-gray-100 shadow-lg w-full md:w-[80%] rounded-xl md:-mt-32 md:-ml-40 md:z-10 md:p-9 flex flex-col border dark:bg-[#181024] dark:border-[#3e1878c2] dark:hover:shadow-[#3e1878c2]  dark:hover:border-[#3e1878] dark:hover:bg-[#200e3b] duration-300 mt-5">
              <h2 className="text-2xl font-bold text-left w-full px-2 lg:px-5">
                Project Description
              </h2>
              <p className="text-gray-700 dark:text-white/80 p-2 lg:p-5 rounded-lg text-sm lg:leading-7">
                {pdes}
              </p>
            </div>
          </div>
        </div>

        {/* Teams */}
        <div className="mt-7">
          <h3 className="border-b pb-2 font-bold text-xl">Teams</h3>
          {teamsOfProject?.data.length === 0 && (
            <p className="font-semibold mt-3">No Teams Created Yet.</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
            {teamsOfProject?.data.map((team) => (
              <div
                onClick={() => router.push(`/dashboard/teams/${team._id}`)}
                key={team._id}
                className="flex gap-2 p-2 border hover:bg-gray-100 cursor-pointer bg-gray-100 hover:shadow-lg duration-300 rounded-lg dark:bg-[#181024] dark:border-[#3e1878c2]  dark:hover:border-[#3e1878] dark:hover:shadow-[#3e1878c2] dark:hover:bg-[#200e3be2]"
              >
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
                  <p className="text-sm text-gray-700 dark:text-white/80">
                    {team?.tcategory}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Members */}
        <div className="mt-7">
          <div className="flex items-end justify-between border-b pb-2">
            <h3 className="font-bold text-xl">Members</h3>

            <Dialog>
              <DialogTrigger asChild>
                {uemail === pmanager && (
                  <button className="px-3 py-2 mt-4 capitalize bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center group ${className} dark:bg-gray-50 text-white">
                    Add Member
                  </button>
                )}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Member</DialogTitle>
                  <DialogDescription>
                    Add a member in the project by Email.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <form
                    onSubmit={handleAddMember}
                    className="flex flex-col gap-2"
                  >
                    <input
                      id="name"
                      name="email"
                      placeholder="Email"
                      required
                      className="border p-2 rounded-lg"
                    />
                    <input
                      className="px-6 py-3 mt-4   capitalize bg-gradient-to-r  from-blue-600 to-purple-600 text-white rounded-md transition-all duration-500 text-sm hover:scale-100 cursor-pointer flex gap-1 items-center group ${className} dark:bg-gray-50 text-white"
                      type="submit"
                      value="Add Member"
                    />
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {pallmembers.length === 0 && (
            <p className="font-semibold mt-3">No Teams Added Yet.</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2  gap-5 mt-3">
            {projectMembers?.data
              ?.map((member, idx) => (
                <div
                  key={idx}
                  className="flex gap-2 p-2 border hover:bg-gray-100 cursor-pointer bg-gray-100 hover:shadow-lg duration-300 rounded-lg dark:bg-[#181024] dark:border-[#3e1878c2]  dark:hover:border-[#3e1878] dark:hover:shadow-[#3e1878c2] dark:hover:bg-[#200e3be2]"
                >
                  <div className="w-10 h-10 rounded-full">
                    <Image
                      src={member?.image_url}
                      width={100}
                      height={100}
                      alt="project_image"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="-space-y-1">
                    <p className="font-bold">
                      {member?.firstName + " " + member?.lastName}
                    </p>
                    {pmanager === member?.email ? (
                      <p className="text-sm text-gray-700 dark:text-white/80">
                        Manager
                      </p>
                    ) : (
                      <p className="text-sm text-gray-700 dark:text-white/80">
                        Member
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
