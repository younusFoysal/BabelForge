"use client"
import React from 'react';
import useAxiosCommon from "@/lib/axiosCommon";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/shared/LoadingSpinner/LoadingSpinner";

const Transactions = () => {

    const axiosCommon = useAxiosCommon();

    const { isLoading, data: trans } = useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`pay/payments`);
            return data;
        },
    });
    console.log(trans);

    if (isLoading) return <LoadingSpinner></LoadingSpinner>;


    return (
        <div>

            <div class="mx-auto max-w-screen-xl bg-white">
                <h1 class="mt-5 mb-5 ml-5 text-2xl font-bold text-gray-900">Transactions</h1>
            </div>


            <div class="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
                <table class="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                    <thead class="hidden border-b lg:table-header-group">
                        <tr class="">

                            <td class="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Order Date</td>
                            <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Transaction ID</td>
                            <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Email</td>
                            <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Customer</td>
                            <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Payment Method</td>
                            <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Price</td>
                            <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">currency</td>
                            <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Status</td>

                        </tr>
                    </thead>

                    <tbody class="bg-white lg:border-gray-300">
                        {
                            trans.map((item, index) => (


                                <tr class="" key={item._id}>

                                    {/* small */}
                                    <td class="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                                        {item.date.slice(0, 10)}


                                        <div class="mt-1 flex flex-col text-xs font-medium lg:hidden">
                                            <div class="flex items-center">
                                                {item.transactionId}
                                            </div>
                                            <div class="">{item.email}</div>
                                            <div class="flex items-center">
                                                {item.tname}
                                            </div>
                                            <div class="flex items-center">
                                            {item.paymentMethod}
                                            </div>
                                         {/*    <div class="flex items-center">
                                            {item.amount}
                                            </div>
                                            <div class="flex items-center ">
                                            {item.currency}
                                            </div> */}
                                            
                                        </div>


                                    </td>




                                    <td class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{item.transactionId}</td>

                                    <td class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{item.email}
                                    </td>

                                    <td class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{item.tname}

                                    </td>
                                    <td class="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">{item.paymentMethod}
                                    </td>
                                    <td class="whitespace-no-wrap  py-4 text-right text-sm sm:px-3 lg:text-left lg:font-normal font-medium">{item.amount}
                                    </td>
                                    <td class="whitespace-no-wrap  py-4 text-right text-sm sm:px-3 lg:text-left lg:font-normal font-medium">{item.currency}
                                    </td>
                                    <td
                                        className={`whitespace-no-wrap  py-4 text-right text-sm sm:px-3 lg:text-left ${item.status === "failed"
                                                ? "text-yellow-600 font-semibold"
                                                : item.status === "pending"
                                                    ? "text-blue-600 font-semibold"
                                                    : item.status === "Completed"
                                                        ? "text-green-600 font-semibold"
                                                        : "text-gray-600"
                                            }`}
                                    >
                                        {item.status}
                                    </td>


                                </tr>

                            ))
                        }





                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Transactions;