"use client";

import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import UpdatePricing from "./UpdatePricing/UpdatePricing";
import useRole from "@/hooks/useRole";
import { useAuth } from "@clerk/nextjs";
import { toast } from "@/hooks/use-toast";
import usePlan from "@/hooks/usePlan";
import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";

const AdminPackages = ({ priceingsec }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [role, roleLoading] = useRole();
  const { userId } = useAuth();
  const [plan] = usePlan();
  const auth = !!userId;

  const axiosCommon = useAxiosCommon();
  const {
    data: packages = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosCommon.get("/price/pricing");
      return res.data;
    },
  });

  const handlePay = (link) => {
    if (link == "Basic" && userId) {
      toast({
        description: "Basic plan is available for free",
        variant: "",
      });
      return;
    }
    if (!userId) {
      router.push("/sign-in");
    }
    if (priceingsec && userId) {
      if (link == "Standard") {
        router.push(`${process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK}`);
      } else if (link == "Premium") {
        router.push(`${process.env.NEXT_PUBLIC_STRIPE_YEARLY_PLAN_LINK}`);
      }
    }
  };

  if (roleLoading || isLoading) return <LoadingSpinner />;

  if (pathname?.includes("/dashboard/admin/packages")) {
    if (role !== "admin") {
      redirect("/dashboard");
    }
  }

  // SVGs
  const trueSVG = (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 24.5312C5.85937 24.5312 0.507812 19.1406 0.507812 12.5C0.507812 5.85937 5.85937 0.507812 12.5 0.507812C19.1406 0.507812 24.5312 5.85937 24.5312 12.5C24.5312 19.1406 19.1406 24.5312 12.5 24.5312ZM12.5 1.875C6.64062 1.875 1.875 6.64062 1.875 12.5C1.875 18.3594 6.64062 23.1641 12.5 23.1641C18.3594 23.1641 23.1641 18.3594 23.1641 12.5C23.1641 6.64062 18.3594 1.875 12.5 1.875Z"
        fill="#13C296"
      ></path>
      <path
        d="M11.1719 15.2344C10.8984 15.2344 10.6641 15.1562 10.4297 14.9609L7.85156 12.4609C7.57812 12.1875 7.57812 11.7578 7.85156 11.4844C8.125 11.2109 8.55469 11.2109 8.82813 11.4844L11.1719 13.7891L16.1719 8.94531C16.4453 8.67187 16.875 8.67187 17.1484 8.94531C17.4219 9.21875 17.4219 9.64844 17.1484 9.92188L11.9531 15C11.6797 15.1563 11.4063 15.2344 11.1719 15.2344Z"
        fill="#13C296"
      ></path>
    </svg>
  );
  const falseSVG = (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4797 0C5.56911 0 0 5.56911 0 12.4797C0 19.3902 5.56911 25 12.4797 25C19.3902 25 25 19.3902 25 12.4797C25 5.56911 19.3902 0 12.4797 0ZM12.4797 23.5772C6.38211 23.5772 1.42276 18.5772 1.42276 12.4797C1.42276 6.38211 6.38211 1.42276 12.4797 1.42276C18.5772 1.42276 23.5772 6.38211 23.5772 12.4797C23.5772 18.5772 18.5772 23.5772 12.4797 23.5772Z"
        fill="#FF9494"
      ></path>
      <path
        d="M16.2204 8.73978C15.9359 8.45523 15.4887 8.45523 15.2042 8.73978L12.4806 11.4634L9.75702 8.73978C9.47247 8.45523 9.02531 8.45523 8.74076 8.73978C8.45621 9.02433 8.45621 9.47149 8.74076 9.75604L11.4643 12.4796L8.74076 15.2032C8.45621 15.4878 8.45621 15.9349 8.74076 16.2195C8.86271 16.3414 9.06596 16.4227 9.22856 16.4227C9.39117 16.4227 9.59442 16.3414 9.71637 16.2195L12.4399 13.4959L15.1635 16.2195C15.2855 16.3414 15.4887 16.4227 15.6513 16.4227C15.8139 16.4227 16.0172 16.3414 16.1391 16.2195C16.4237 15.9349 16.4237 15.4878 16.1391 15.2032L13.4969 12.4796L16.2204 9.75604C16.4643 9.47149 16.4643 9.02433 16.2204 8.73978Z"
        fill="#FF9494"
      ></path>
    </svg>
  );

  return (
    <div>
      <div
        className={`relative z-10 pt-[140px] overflow-hidden rounded-sm text-black dark:text-white p-11 shadow-default bg-white/50 dark:bg-[#181024b5]`}
      >
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            {/* upper package overview */}

            {role == "admin" ? (
              <thead>
                <tr>
                  <th className="w-1/4 min-w-[200px] px-5"></th>
                  {packages.map((pack) => (
                    <th key={pack._id} className="w-1/4 min-w-[200px] px-5">
                      <div className="text-left py-4 h-[250px] flex flex-col justify-between">
                        <span className="mb-3.5 block text-xl font-bold text-black dark:text-white ">
                          {pack.title}
                        </span>
                        <h4 className="mb-2">
                          <span className="text-[28px] font-bold text-black dark:text-white lg:text-[32px]">
                            {pack.title == "Basic" ? "Free" : `${pack.price}`}
                          </span>
                          <span className="font-medium my-auto">
                            {" "}
                            {pack.price === "Free" ? "" : "/"}{" "}
                            {pack.price === "Free" ? "" : pack.priceDetails}
                          </span>
                        </h4>
                        <p className="text-[14px] opacity-85 font-medium">
                          {pack.description}
                        </p>

                        {pack.price !== "Free" ? (
                          <UpdatePricing
                            pack={pack}
                            title={pack.title}
                            priceingsec={priceingsec}
                            handlePay={handlePay}
                            refetch={refetch}
                          />
                        ) : (
                          <button
                            onClick={() =>
                              router.push(`${auth ? "/dashboard" : "/sign-up"}`)
                            }
                            className="overflow-hidden mt-auto w-full p-2 h-12  text-white border-none rounded-md text-xl font-bold cursor-pointer  capitalize bg-gradient-to-r from-blue-600 to-purple-600  hover:shadow-purple-200 dark:hover:shadow-purple-800 dark:text-white"
                          >
                            {auth ? "Dashboard" : "Signup"}
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
            ) : (
              <thead>
                <tr>
                  <th className="w-1/4 min-w-[200px] px-5"></th>
                  {packages.map((pack) => {
                    const isBasicPlan = plan === "Basic";
                    const isStandardPlan = plan === "Standard";
                    const isPremiumPlan = plan === "Premium";

                    // Determine the button states
                    const isCurrentPlan = pack.title === plan;
                    const canUpgradeToStandard =
                      isBasicPlan && pack.title === "Standard";
                    const canUpgradeToPremium =
                      (isBasicPlan || isStandardPlan) &&
                      pack.title === "Premium";
                    const isUpgradeDisabled = isPremiumPlan || isCurrentPlan;

                    return (
                      <th key={pack._id} className="w-1/4 min-w-[200px] px-5">
                        <div className="text-left py-4 h-[250px] flex flex-col justify-between">
                          <span className="mb-3.5 block text-xl font-bold text-black dark:text-white">
                            {pack.title}
                          </span>
                          <h4 className="mb-2">
                            <span className="text-[28px] font-bold text-black dark:text-white lg:text-[32px]">
                              {pack.title === "Basic"
                                ? "Free"
                                : `${pack.price}`}
                            </span>
                            <span className="font-medium my-auto">
                              {pack.price === "Free" ? "" : "/"}{" "}
                              {pack.price === "Free" ? "" : pack.priceDetails}
                            </span>
                          </h4>
                          <p className="text-[14px] opacity-85 font-medium">
                            {pack.description}
                          </p>

                          {pack.price !== "Free" ? (
                            isCurrentPlan ? (
                              // If the user is on this plan, show "Already purchased" button
                              <button className="overflow-hidden mt-auto w-full p-2 h-12 text-white border-none rounded-md text-md lg:text-xl font-bold cursor-pointer capitalize bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-purple-200 dark:hover:shadow-purple-800 dark:text-white">
                                Already purchased
                              </button>
                            ) : canUpgradeToStandard || canUpgradeToPremium ? (
                              // If the user can upgrade, show the UpdatePricing component
                              <UpdatePricing
                                pack={pack}
                                title={pack.title}
                                priceingsec={priceingsec}
                                handlePay={handlePay}
                                refetch={refetch}
                              />
                            ) : (
                              // Otherwise, show a disabled button
                              <button
                                disabled
                                className="bg-gradient-to-r from-blue-600 to-purple-600 opacity-50 cursor-not-allowed text-white text-md lg:text-xl duration-300 hover:shadow-lg font-medium   p-2 rounded-md h-12"
                              >
                                not available
                              </button>
                            )
                          ) : (
                            <button
                              onClick={() =>
                                router.push(
                                  `${auth ? "/dashboard" : "/sign-up"}`
                                )
                              }
                              className="overflow-hidden mt-auto w-full p-2 h-12 text-white border-none rounded-md text-md lg:text-xl font-bold cursor-pointer capitalize bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-purple-200 dark:hover:shadow-purple-800 dark:text-white"
                            >
                              {auth ? "Dashboard" : "Start For Free"}
                            </button>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
            )}

            <tbody>
              {/* table header */}
              <tr>
                <td className="px-7 py-5 ">
                  <h5 className="font-medium text-black dark:text-white">
                    Key Features
                  </h5>
                </td>
                <td className="px-7 py-5 ">
                  <h5 className="text-center font-medium text-black dark:text-white">
                    Features Limits
                  </h5>
                </td>
                <td className=" px-7 py-5 ">
                  <h5 className="text-center font-medium text-black dark:text-white">
                    Features Limits
                  </h5>
                </td>
                <td className=" px-7 py-5 d">
                  <h5 className="text-center font-medium text-black dark:text-white">
                    Features Limits
                  </h5>
                </td>
              </tr>

              {/* projects limit */}
              <tr>
                <td className="border-t  border-purple-700  dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="font-medium">Projects</p>
                </td>
                <td className="border-t  border-purple-700  dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="text-center font-medium">
                    {packages[0]?.projects}
                  </p>
                </td>
                <td className="border-t border-purple-700  dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="text-center font-medium">
                    {packages[1]?.projects}
                  </p>
                </td>
                <td className="border-t  border-purple-700  dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="text-center font-medium">
                    {packages[2]?.projects}
                  </p>
                </td>
              </tr>

              {/* Teams limit */}
              <tr>
                <td className="border-t  border-purple-700  dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="font-medium">Teams</p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="text-center font-medium">{packages[0]?.team}</p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="text-center font-medium">{packages[1]?.team}</p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="text-center font-medium">{packages[2]?.team}</p>
                </td>
              </tr>
              {/* tasks limit */}
              <tr>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="font-medium">Tasks</p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="text-center font-medium">{packages[0]?.task}</p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="text-center font-medium">{packages[1]?.task}</p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="text-center font-medium">{packages[2]?.task}</p>
                </td>
              </tr>

              {/* group chat feature */}
              <tr>
                <td className="border-t border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="font-medium">Group Chat</p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[0]?.groupchat ? trueSVG : falseSVG}
                  </p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[1]?.groupchat ? trueSVG : falseSVG}
                  </p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[2]?.groupchat ? trueSVG : falseSVG}
                  </p>
                </td>
              </tr>

              {/* canvas feature */}
              <tr>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="font-medium">Canvas</p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[0]?.canvas ? trueSVG : falseSVG}
                  </p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[1]?.canvas ? trueSVG : falseSVG}
                  </p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[2]?.canvas ? trueSVG : falseSVG}
                  </p>
                </td>
              </tr>

              {/* babel ai feature */}
              <tr>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="font-medium">Babel AI</p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[0]?.BabelAi ? trueSVG : falseSVG}
                  </p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[1]?.BabelAi ? trueSVG : falseSVG}
                  </p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[2]?.BabelAi ? trueSVG : falseSVG}
                  </p>
                </td>
              </tr>

              {/* meetings feature */}
              <tr>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="font-medium">Meetings</p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[0]?.meeting ? trueSVG : falseSVG}
                  </p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[1]?.meeting ? trueSVG : falseSVG}
                  </p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[2]?.meeting ? trueSVG : falseSVG}
                  </p>
                </td>
              </tr>

              <tr>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="font-medium">Diagrams</p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[0]?.Diagrams ? trueSVG : falseSVG}
                  </p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[1]?.Diagrams ? trueSVG : falseSVG}
                  </p>
                </td>
                <td className="border-t  border-purple-700 dark:border-[#3e1878c2] px-7 py-5  ">
                  <p className="flex justify-center text-center">
                    {packages[2]?.Diagrams ? trueSVG : falseSVG}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <span className="absolute left-0 top-0 -z-1">
            <svg
              width="213"
              height="188"
              viewBox="0 0 213 188"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="75"
                cy="50"
                r="138"
                fill="url(#paint0_linear)"
              ></circle>
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="75"
                  y1="-88"
                  x2="75"
                  y2="188"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#3056D3" stopOpacity="0.15"></stop>
                  <stop offset="1" stopColor="#C4C4C4" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="absolute left-16 top-16 -z-1">
            <svg
              width="50"
              height="109"
              viewBox="0 0 50 109"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="47.71"
                cy="107.259"
                r="1.74121"
                transform="rotate(180 47.71 107.259)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="47.71"
                cy="91.9355"
                r="1.74121"
                transform="rotate(180 47.71 91.9355)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="47.71"
                cy="76.6133"
                r="1.74121"
                transform="rotate(180 47.71 76.6133)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="47.71"
                cy="47.0132"
                r="1.74121"
                transform="rotate(180 47.71 47.0132)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="47.71"
                cy="16.7158"
                r="1.74121"
                transform="rotate(180 47.71 16.7158)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="47.71"
                cy="61.6392"
                r="1.74121"
                transform="rotate(180 47.71 61.6392)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="47.71"
                cy="32.0386"
                r="1.74121"
                transform="rotate(180 47.71 32.0386)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="47.71"
                cy="1.74121"
                r="1.74121"
                transform="rotate(180 47.71 1.74121)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="32.3877"
                cy="107.259"
                r="1.74121"
                transform="rotate(180 32.3877 107.259)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="32.3877"
                cy="91.9355"
                r="1.74121"
                transform="rotate(180 32.3877 91.9355)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="32.3877"
                cy="76.6133"
                r="1.74121"
                transform="rotate(180 32.3877 76.6133)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="32.3877"
                cy="47.0132"
                r="1.74121"
                transform="rotate(180 32.3877 47.0132)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="32.3877"
                cy="16.7158"
                r="1.74121"
                transform="rotate(180 32.3877 16.7158)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="32.3877"
                cy="61.6392"
                r="1.74121"
                transform="rotate(180 32.3877 61.6392)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="32.3877"
                cy="32.0386"
                r="1.74121"
                transform="rotate(180 32.3877 32.0386)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="32.3877"
                cy="1.74121"
                r="1.74121"
                transform="rotate(180 32.3877 1.74121)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="17.0654"
                cy="107.259"
                r="1.74121"
                transform="rotate(180 17.0654 107.259)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="17.0654"
                cy="91.9355"
                r="1.74121"
                transform="rotate(180 17.0654 91.9355)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="17.0654"
                cy="76.6133"
                r="1.74121"
                transform="rotate(180 17.0654 76.6133)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="17.0654"
                cy="47.0132"
                r="1.74121"
                transform="rotate(180 17.0654 47.0132)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="17.0654"
                cy="16.7158"
                r="1.74121"
                transform="rotate(180 17.0654 16.7158)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="17.0654"
                cy="61.6392"
                r="1.74121"
                transform="rotate(180 17.0654 61.6392)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="17.0654"
                cy="32.0386"
                r="1.74121"
                transform="rotate(180 17.0654 32.0386)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="17.0654"
                cy="1.74121"
                r="1.74121"
                transform="rotate(180 17.0654 1.74121)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="1.74121"
                cy="107.259"
                r="1.74121"
                transform="rotate(180 1.74121 107.259)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="1.74121"
                cy="91.9355"
                r="1.74121"
                transform="rotate(180 1.74121 91.9355)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="1.74121"
                cy="76.6133"
                r="1.74121"
                transform="rotate(180 1.74121 76.6133)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="1.74121"
                cy="47.0132"
                r="1.74121"
                transform="rotate(180 1.74121 47.0132)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="1.74121"
                cy="16.7158"
                r="1.74121"
                transform="rotate(180 1.74121 16.7158)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="1.74121"
                cy="61.6392"
                r="1.74121"
                transform="rotate(180 1.74121 61.6392)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="1.74121"
                cy="32.0386"
                r="1.74121"
                transform="rotate(180 1.74121 32.0386)"
                fill="#3056D3"
              ></circle>
              <circle
                cx="1.74121"
                cy="1.74121"
                r="1.74121"
                transform="rotate(180 1.74121 1.74121)"
                fill="#3056D3"
              ></circle>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminPackages;
