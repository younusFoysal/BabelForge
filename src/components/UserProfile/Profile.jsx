"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { FaNetworkWired } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { GoOrganization, GoPlus } from "react-icons/go";
import { HiUserGroup } from "react-icons/hi";
import { ImBriefcase } from "react-icons/im";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { UpdateProfile } from "../Profile/UpdateProfile";
import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";
import { TabsTransaction } from "./Tabs";

const Profile = () => {
  const axiosCommon = useAxiosCommon();

  const { data: session } = useSession();
  const email = session?.user?.email;

  const {
    data: user = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-profile", email],
    queryFn: async () => {
      if (!email) return [];
      const { data } = await axiosCommon.get(`/api/user/${email}`);
      return data;
    }
  });

  const {
    data: teams = []
  } = useQuery({
    queryKey: ["userteams", email],
    queryFn: async () => {
      if (!email) return [];
      const { data } = await axiosCommon.get(`/team/teams/my-teams/${email}`);
      return data;
    },
    enabled: !!email, 
  });

  const {
    data: transactions = [],
    isLoading: isTransactionsLoading,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ["usertransactions", email],
    queryFn: async () => {
      if (!email) return [];
      const { data } = await axiosCommon.get(`/pay/payments/${email}`);
      return data;
    },
    enabled: !!email, 
  }); 

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      {/* container */}
      <div className="py-20 flex lg:flex-row flex-col justify-between items-start gap-10 lg:p-0 p-4">
        {/* card left */}
        <div className="lg:w-[45%] w-full ">
          {/* card header user info */}
          <div className="flex  gap-4  ">
            <p className="flex justify-start items-center gap-2 w-full p-1">
              <span className=" rounded-full p-1">
                <Avatar className="w-40 h-40">
                  <AvatarImage
                    src={
                      user?.image
                        ? user?.image
                        : "https://getillustrations.b-cdn.net//photos/pack/3d-avatar-male_lg.png"
                    }
                  />
                  <AvatarFallback>Bable</AvatarFallback>
                </Avatar>
              </span>
            </p>
          </div>
          <div className="p-2 mb-2 rounded-md">
            <UpdateProfile user={user} refetch={refetch} />
          </div>
          <div>
            <p className="text-2xl mb-2">Name: {user?.name}</p>
            <p className="text-lg mb-6 font-light">
              Username: {user?.username}
            </p>
          </div>

          {/* card content */}
          <Card className="p-6 dark:bg-gray-800 dark:border-gray-800">
            {/* about */}
            <h3 className="text-start text-xl uppercase">About</h3>

            <div className="mt-7 space-y-4">
              {/* 1 */}
              <div className="flex  items-center gap-4">
                <span>
                  <ImBriefcase className="text-lg"></ImBriefcase>
                </span>
                <p className="hover:bg-gray-200 w-full p-2 rounded-md   dark:hover:bg-gray-900 ">
                  {user?.department ? user?.department : <p>No Department</p>}
                </p>
              </div>
              {/* 2*/}
              <div className="flex  items-center gap-4">
                <span>
                  <FaNetworkWired className="text-lg"></FaNetworkWired>
                </span>
                <p className="hover:bg-gray-200 w-full p-2 rounded-md dark:hover:bg-gray-900 ">
                  Your Network
                </p>
              </div>
              {/* 3 */}
              <div className="flex  items-center gap-4">
                <span>
                  <GoOrganization className="text-lg"></GoOrganization>
                </span>
                <p className="hover:bg-gray-200 w-full p-2 rounded-md    dark:hover:bg-gray-900 ">
                  {user?.organization ? (
                    user?.organization
                  ) : (
                    <p>No Organization</p>
                  )}
                </p>
              </div>
              {/* 4*/}
              <div className="flex  items-center gap-4">
                <span>
                  <IoLocationSharp className="text-xl"></IoLocationSharp>
                </span>

                <p className="hover:bg-gray-200 w-full p-2 rounded-md    dark:hover:bg-gray-900 ">
                  {user?.location ? user?.location : <p>No location</p>}
                </p>
              </div>
            </div>

            {/* contact */}
            <h3 className="text-start text-xl uppercase my-6">contact</h3>
            <div className="flex  items-center gap-4">
              <span>
                <MdOutlineEmail className="text-xl"></MdOutlineEmail>
              </span>

              <p className="hover:bg-gray-200 w-full p-2 rounded-md dark:hover:bg-gray-900 ">
                {user?.email}
              </p>
            </div>

            {/* teams */}
            
            <Link className="mt-12  text-xs hover:underline" href={""}>
              {" "}
              View privacy policy
            </Link>
          </Card>
        </div>

        {/* card right */}
        <div className="w-full  lg:mt-60 mt-10 ">
          <TabsTransaction teams={teams} transactions={transactions} />
         
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Profile;
