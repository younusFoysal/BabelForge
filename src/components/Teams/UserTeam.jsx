"use client";
import AllTeams from "@/components/Teams/AllTeams";
import UseTeams from "@/hooks/useTeams";

import React, { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "../ui/textarea";
import { TagsInput } from "react-tag-input-component";
import team from "@/image/Team/create_team.png";
import "./UserTeam.css";
import Image from "next/image";
import useAxiosCommon from "@/lib/axiosCommon";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useProjects from "@/hooks/useProjects";
import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { useUser } from "@clerk/nextjs";

const UserTeam = () => {
  const myRef = useRef("");
  const { user } = useUser();
  const uemail = user?.primaryEmailAddress?.emailAddress;
  const [teams, isLoading, refetch] = UseTeams(uemail);
  const [searchQuery, setSearchQuery] = useState("");
  const [emails, setEmails] = useState([uemail]);
  const axiosCommon = useAxiosCommon();
  const [open, setOpen] = useState(false);
  const { data: projects = [] } = useProjects(uemail, "", "");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handle Search
  const handleSeach = () => {
    setSearchQuery(myRef.current.value);
  };

  // Tanstack
  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosCommon.post("/team/teams", data);
      return res.data;
    },
    onSuccess: () => {
      setOpen(false);
      toast.success("Team created successfully!");
      reset();
      refetch();
    },
    onError: (error) => {
      toast.error(`Couldn't create team ! Try again`);
    },
  });

  // Submit Team from
  const onSubmit = (data) => {
    data.tmembers = emails;
    data.tleader = uemail;
    mutation.mutate(data);
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <section className="w-full mt-3 px-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl dark:text-white text-[#333]">
          Teams and projects
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="bg-bgColor dark:hover:shadow-bgColor/30 hover:bg-bgHoverColor text-white text-md hover:scale-110 duration-500  hover:shadow-lg hover:shadow-blue-200 font-medium px-4 py-2 rounded-md">
              Create Team
            </button>
          </DialogTrigger>
          <>
            <DialogOverlay className="DialogOverlay">
              <DialogContent
                aria-describedby={"Dialouge"}
                className="max-w-[450px] dark:border-[#fff5] dark:bg-[#ffffff25] dark:backdrop-blur-[20px] max-h-screen overflow-scroll z-[999] md:max-w-[900px]"
              >
                <DialogHeader>
                  <DialogTitle className="text-[20px]">
                    Create a team
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-5 grid-cols-9">
                  <div className="col-span-9 md:col-span-4 flex items-center">
                    <Image
                      className="w-[200px] mx-auto md:w-auto"
                      src={team}
                      alt="team"
                    />
                  </div>
                  <div className="col-span-9 md:col-span-5">
                    <p className="font-light text-[14px] mb-3">
                      Bring everyone together with one team you can @mention,
                      filter, and assign work to.
                    </p>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-[12px]"
                    >
                      <div className="">
                        <Label
                          htmlFor="tname"
                          className="text-left text-[11px] mb-[6px] block font-semibold"
                        >
                          Team Name <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          {...register("tname", {
                            required: true,
                            minLength: 4,
                          })}
                          placeholder="e.g. HR Team , Design Team"
                          id="tname"
                        />
                        {errors.tname?.type === "required" && (
                          <p className="text-red-600 text-[11px] mt-1">
                            Team name required
                          </p>
                        )}
                        {errors.tname?.type === "minLength" && (
                          <p className="text-red-600 text-[11px] mt-1">
                            Name is too short !
                          </p>
                        )}
                      </div>
                      <div className="">
                        <Label
                          htmlFor="tpic"
                          className="text-left text-[11px] mb-[6px] block font-semibold"
                        >
                          Team Cover Photo{" "}
                          <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          type="URL"
                          {...register("tpic", { required: true })}
                          placeholder="Please enter your team cover photo URL"
                          id="tpic"
                          className="col-span-3"
                        />
                        {errors.tpic?.type === "required" && (
                          <p className="text-red-600 text-[11px] mt-1">
                            Team photo required
                          </p>
                        )}
                      </div>
                      <div className="">
                        <Label
                          htmlFor="tcategory"
                          className="text-left text-[11px] mb-[6px] block font-semibold"
                        >
                          Team Category <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          {...register("tcategory", {
                            required: true,
                            minLength: 3,
                          })}
                          placeholder="eg. Design , Development , Research"
                          id="tcategory"
                          className="col-span-3"
                        />
                        {errors.tcategory?.type === "required" && (
                          <p className="text-red-600 text-[11px] mt-1">
                            Category required
                          </p>
                        )}
                        {errors.tcategory?.type === "minLength" && (
                          <p className="text-red-600 text-[11px] mt-1">
                            Category too short !
                          </p>
                        )}{" "}
                      </div>
                      {/* Select Project */}
                      <div>
                        <Label
                          htmlFor="tproject"
                          className="text-left text-[11px] mb-[6px] block font-semibold"
                        >
                          Select Project <span className="text-red-600">*</span>
                        </Label>
                        <select
                          {...register("tproject", { required: true })}
                          className="w-full py-[11px] dark:text-white dark:border-transparent dark:bg-black text-[14px] px-[12px]  text-[#777] bg-transparent border rounded-md"
                          name="tproject"
                          id="tproject"
                        >
                          <option disabled selected>
                            Select Project
                          </option>
                          {projects &&
                            projects?.map((project) => {
                              return (
                                <option
                                  className=" "
                                  key={project._id}
                                  value={project._id}
                                >
                                  <span className=" capitalize">
                                    {" "}
                                    {project.pname}
                                  </span>
                                </option>
                              );
                            })}
                          <option value=""></option>
                        </select>
                        {errors.tcategory?.type === "required" && (
                          <p className="text-red-600 text-[11px] mt-1">
                            Project required
                          </p>
                        )}
                      </div>
                      <div className="">
                        <Label
                          htmlFor="tdes"
                          className="text-left text-[11px] mb-[6px] block font-semibold"
                        >
                          Team Description{" "}
                          <span className="text-red-600">*</span>
                        </Label>
                        <Textarea
                          {...register("tdes", {
                            required: true,
                            minLength: 10,
                          })}
                          placeholder="Tell us about your team"
                          id="tdes"
                          className="col-span-3"
                        />
                        {errors.tdes?.type === "required" && (
                          <p className="text-red-600 text-[11px] mt-1">
                            Descrition required
                          </p>
                        )}
                        {errors.tdes?.type === "minLength" && (
                          <p className="text-red-600 text-[11px] mt-1">
                            Descrition too short !
                          </p>
                        )}
                      </div>
                      <div className="">
                        <Label
                          htmlFor="members"
                          className="text-left text-[11px] mb-[6px] block font-semibold"
                        >
                          Who should be in this team?
                        </Label>
                        <TagsInput
                          type="email"
                          id="members"
                          classNames="w-full"
                          value={emails}
                          onChange={setEmails}
                          name="members"
                          placeHolder="Enter emails"
                        />
                        <span className="text-[11px]">
                          Press enter to add more
                        </span>
                      </div>
                      <div className="flex items-center gap-3 justify-end">
                        <DialogClose asChild>
                          <button className="ml-auto bg-[#4444445c] dark:hover:shadow-bgColor/30 hover:bg-[#4444447f] text-white text-md  duration-500  hover:shadow-lg  font-medium px-4 py-2 rounded-md">
                            Cancel
                          </button>
                        </DialogClose>
                        <button
                          className="bg-bgColor dark:hover:shadow-bgColor/30 hover:bg-bgHoverColor text-white text-md  duration-500  hover:shadow-lg hover:shadow-blue-200 font-medium px-4 py-2 rounded-md"
                          type="submit"
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </DialogContent>
            </DialogOverlay>
          </>
        </Dialog>
      </div>
      {/* Search Teams and Projects */}
      <div className="relative mt-8">
        <input
          onChange={() => handleSeach()}
          ref={myRef}
          className="placeholder:text-[25px] dark:text-white dark:bg-transparent  text-[25px] text-[#777] placeholder:text-[#777] duration-500 py-1 px-5 pl-8 w-full border-b-2 focus:border-[#3575ff] hover:border-[#3575ff] focus:outline-0 focus:outline-none"
          placeholder="Search for teams and category"
          type="text"
          name="search"
          id=""
        />
        <IoSearch className="absolute text-[28px] text-[#777] top-1/2 left-0 -translate-y-1/2" />
      </div>
      <AllTeams searchQuery={searchQuery} teams={teams} isLoading={isLoading} />
    </section>
  );
};

export default UserTeam;
