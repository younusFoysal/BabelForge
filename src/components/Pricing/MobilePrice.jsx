'use client';
import useAxiosCommon from '@/lib/axiosCommon';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UpdatePricing from '../Admin/AdminPackages/UpdatePricing/UpdatePricing';
import { useRouter } from 'next/navigation';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useAuth } from '@clerk/nextjs';

export default function MobilePrice({ priceingsec }) {
  const router = useRouter();
  const { userId } = useAuth();
  const auth = !!userId;
  const axiosCommon = useAxiosCommon();
  const { data: packages = [], refetch } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const res = await axiosCommon.get('/price/pricing');
      return res.data;
    },
  });

  const handlePay = link => {
    if (priceingsec) {
      if (link == 'Standard') {
        router.push(`${process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK}`);
      } else if (link == 'Premium') {
        router.push(`${process.env.NEXT_PUBLIC_STRIPE_YEARLY_PLAN_LINK}`);
      }
    }
  };

  return (
    <section className="relative z-10 overflow-hidden px-4 pb-12 lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[35px] max-w-[510px] text-center">
              <span className="mb-2 block text-lg font-semibold text-primary">Pricing Table</span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Our Pricing Plan
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="-mx-4 w-full grid grid-cols-1 gap-4">
            {packages?.map(pack => {
              return (
                <div
                  key={pack._id}
                  className="relative dark:border-[#3e1878c2] dark:bg-[#181024] dark:text-white flex flex-col z-10 overflow-hidden rounded-[20px] border border-stroke bg-white px-8 py-10 shadow-pricing dark:border-dark-3 dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]"
                >
                  <span className="mb-3 block text-lg font-semibold text-primary">{pack.title}</span>
                  <h2 className="mb-5 text-[42px] font-bold text-dark dark:text-white">
                    {pack.price}
                    <span className="text-base font-medium text-body-color dark:text-dark-6">
                      {pack.price === 'Free' ? '' : '/'} {pack.price === 'Free' ? '' : pack.priceDetails}
                    </span>
                  </h2>
                  <p className="mb-8 border-b border-stroke pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6"></p>
                  <div className="mb-9 flex flex-col gap-[14px]">
                    <ul className=" mx-w-[300px] mx-auto space-y-3">
                      <li className="flex items-center gap-2">
                        <IoMdCheckmarkCircleOutline className="text-[22px]" />
                        {pack.team} Teams
                      </li>
                      <li className="flex items-center gap-2">
                        {' '}
                        <IoMdCheckmarkCircleOutline className="text-[22px]" />
                        {pack.task} Task
                      </li>
                      <li className="flex items-center gap-2">
                        {' '}
                        <IoMdCheckmarkCircleOutline className="text-[22px]" />
                        {pack.projects} Projects
                      </li>
                      {pack.canvas && (
                        <li className="flex items-center gap-2">
                          {' '}
                          <IoMdCheckmarkCircleOutline className="text-[22px]" />
                          Canvas
                        </li>
                      )}
                      {pack.groupchat && (
                        <li className="flex items-center gap-2">
                          {' '}
                          <IoMdCheckmarkCircleOutline className="text-[22px]" />
                          Chat
                        </li>
                      )}
                      {pack.BabelAi && (
                        <li className="flex items-center gap-2">
                          {' '}
                          <IoMdCheckmarkCircleOutline className="text-[22px]" />
                          AI Assistant
                        </li>
                      )}
                      {pack.meeting && (
                        <li className="flex items-center gap-2">
                          {' '}
                          <IoMdCheckmarkCircleOutline className="text-[22px]" />
                          Meeting
                        </li>
                      )}
                    </ul>
                  </div>
                  {pack.price !== 'Free' ? (
                    <UpdatePricing pack={pack} title={pack.title} priceingsec={priceingsec} handlePay={handlePay} refetch={refetch} />
                  ) : (
                    <button
                      onClick={() => router.push('/dashboard')}
                      className="overflow-hidden mt-auto w-full p-2 h-12  text-white border-none rounded-md text-xl font-bold cursor-pointer  capitalize bg-gradient-to-r from-blue-600 to-purple-600  hover:shadow-purple-200 dark:hover:shadow-purple-800 dark:text-white"
                    >
                      {auth ? 'Dashboard' : 'Signup'}
                    </button>
                  )}
                  <div>
                    <span className="absolute right-0 top-7 z-[-1]">
                      <svg width={77} height={172} viewBox="0 0 77 172" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx={86} cy={86} r={86} fill="url(#paint0_linear)" />
                        <defs>
                          <linearGradient id="paint0_linear" x1={86} y1={0} x2={86} y2={172} gradientUnits="userSpaceOnUse">
                            <stop stopColor="#3056D3" stopOpacity="0.09" />
                            <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                    <span className="absolute right-4 top-4 z-[-1]">
                      <svg width={41} height={89} viewBox="0 0 41 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="38.9138" cy="87.4849" r="1.42021" transform="rotate(180 38.9138 87.4849)" fill="#3056D3" />
                        <circle cx="38.9138" cy="74.9871" r="1.42021" transform="rotate(180 38.9138 74.9871)" fill="#3056D3" />
                        <circle cx="38.9138" cy="62.4892" r="1.42021" transform="rotate(180 38.9138 62.4892)" fill="#3056D3" />
                        <circle cx="38.9138" cy="38.3457" r="1.42021" transform="rotate(180 38.9138 38.3457)" fill="#3056D3" />
                        <circle cx="38.9138" cy="13.634" r="1.42021" transform="rotate(180 38.9138 13.634)" fill="#3056D3" />
                        <circle cx="38.9138" cy="50.2754" r="1.42021" transform="rotate(180 38.9138 50.2754)" fill="#3056D3" />
                        <circle cx="38.9138" cy="26.1319" r="1.42021" transform="rotate(180 38.9138 26.1319)" fill="#3056D3" />
                        <circle cx="38.9138" cy="1.42021" r="1.42021" transform="rotate(180 38.9138 1.42021)" fill="#3056D3" />
                        <circle cx="26.4157" cy="87.4849" r="1.42021" transform="rotate(180 26.4157 87.4849)" fill="#3056D3" />
                        <circle cx="26.4157" cy="74.9871" r="1.42021" transform="rotate(180 26.4157 74.9871)" fill="#3056D3" />
                        <circle cx="26.4157" cy="62.4892" r="1.42021" transform="rotate(180 26.4157 62.4892)" fill="#3056D3" />
                        <circle cx="26.4157" cy="38.3457" r="1.42021" transform="rotate(180 26.4157 38.3457)" fill="#3056D3" />
                        <circle cx="26.4157" cy="13.634" r="1.42021" transform="rotate(180 26.4157 13.634)" fill="#3056D3" />
                        <circle cx="26.4157" cy="50.2754" r="1.42021" transform="rotate(180 26.4157 50.2754)" fill="#3056D3" />
                        <circle cx="26.4157" cy="26.1319" r="1.42021" transform="rotate(180 26.4157 26.1319)" fill="#3056D3" />
                        <circle cx="26.4157" cy="1.4202" r="1.42021" transform="rotate(180 26.4157 1.4202)" fill="#3056D3" />
                        <circle cx="13.9177" cy="87.4849" r="1.42021" transform="rotate(180 13.9177 87.4849)" fill="#3056D3" />
                        <circle cx="13.9177" cy="74.9871" r="1.42021" transform="rotate(180 13.9177 74.9871)" fill="#3056D3" />
                        <circle cx="13.9177" cy="62.4892" r="1.42021" transform="rotate(180 13.9177 62.4892)" fill="#3056D3" />
                        <circle cx="13.9177" cy="38.3457" r="1.42021" transform="rotate(180 13.9177 38.3457)" fill="#3056D3" />
                        <circle cx="13.9177" cy="13.634" r="1.42021" transform="rotate(180 13.9177 13.634)" fill="#3056D3" />
                        <circle cx="13.9177" cy="50.2754" r="1.42021" transform="rotate(180 13.9177 50.2754)" fill="#3056D3" />
                        <circle cx="13.9177" cy="26.1319" r="1.42021" transform="rotate(180 13.9177 26.1319)" fill="#3056D3" />
                        <circle cx="13.9177" cy="1.42019" r="1.42021" transform="rotate(180 13.9177 1.42019)" fill="#3056D3" />
                        <circle cx="1.41963" cy="87.4849" r="1.42021" transform="rotate(180 1.41963 87.4849)" fill="#3056D3" />
                        <circle cx="1.41963" cy="74.9871" r="1.42021" transform="rotate(180 1.41963 74.9871)" fill="#3056D3" />
                        <circle cx="1.41963" cy="62.4892" r="1.42021" transform="rotate(180 1.41963 62.4892)" fill="#3056D3" />
                        <circle cx="1.41963" cy="38.3457" r="1.42021" transform="rotate(180 1.41963 38.3457)" fill="#3056D3" />
                        <circle cx="1.41963" cy="13.634" r="1.42021" transform="rotate(180 1.41963 13.634)" fill="#3056D3" />
                        <circle cx="1.41963" cy="50.2754" r="1.42021" transform="rotate(180 1.41963 50.2754)" fill="#3056D3" />
                        <circle cx="1.41963" cy="26.1319" r="1.42021" transform="rotate(180 1.41963 26.1319)" fill="#3056D3" />
                        <circle cx="1.41963" cy="1.4202" r="1.42021" transform="rotate(180 1.41963 1.4202)" fill="#3056D3" />
                      </svg>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
