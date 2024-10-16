import Image from 'next/image';
import React from 'react';
import masterCard from '@/image/icon/mastercard.jpg';
import visa from '@/image/icon/visa.png';

const UserTransaction = ({ transactions }) => {
    const sortedTrans = transactions?.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="mt-6 overflow-x-auto rounded-xl bg-white dark:bg-gray-800 px-6 shadow lg:px-4">
            <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                <thead className="border-b">
                    <tr>
                        <td className="whitespace-normal py-4 text-sm font-semibold text-gray-500  dark:text-gray-400 sm:px-3">
                            Order Date
                        </td>
                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 dark:text-gray-400  sm:px-3">
                            Transaction ID
                        </td>
                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 dark:text-gray-400  sm:px-3">
                            Method
                        </td>
                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 dark:text-gray-400  sm:px-3">
                            Price
                        </td>
                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 dark:text-gray-400  sm:px-3">
                            Status
                        </td>
                    </tr>
                </thead>

                <tbody className="bg-white border-gray-300 divide-y p-5 dark:bg-gray-800 dark:text-white divide-gray-200 sm:divide-none sm:space-y-4">
                    {transactions?.map((item, id) => (
                        <tr key={item._id} className="sm:space-y-2 sm:py-4">
                            <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 dark:text-white sm:px-3 sm:py-2">
                                {new Date(item?.date).toLocaleString()}
                            </td>
                            <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-600 dark:text-white sm:px-3 sm:py-2">
                                {item?.transactionId ? item?.transactionId : 'N/A'}
                            </td>
                            <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 dark:text-white sm:px-3 sm:py-2">
                                {item.paymentMethod === 'card' && id % 2 === 0 ? (
                                    <Image className="w-[28px] rounded" alt="Visa" src={visa} height={60} width={60} />
                                ) : (
                                    <Image className="w-[28px] rounded" alt="MasterCard" src={masterCard} height={60} width={60} />
                                )}
                            </td>
                            <td className="whitespace-no-wrap py-4 text-right text-sm sm:px-3 sm:py-2 font-medium">
                                ${item.amount}
                            </td>
                            <td
                                className={`whitespace-no-wrap py-4 text-right text-sm sm:px-3 sm:py-2 ${
                                    item.status === 'failed'
                                        ? 'text-yellow-600 font-semibold'
                                        : item.status === 'pending'
                                        ? 'text-yellow-600 font-semibold'
                                        : item.status === 'succeeded'
                                        ? 'text-green-600 font-semibold'
                                        : 'text-gray-600'
                                }`}
                            >
                                <span
                                    className={`${
                                        item.status === 'succeeded'
                                            ? 'border-green-400 text-green-600 hover:bg-green-50'
                                            : 'border-yellow-400 text-yellow-600 hover:bg-yellow-50'
                                    } border py-1 px-2 rounded-lg capitalize`}
                                >
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTransaction;
