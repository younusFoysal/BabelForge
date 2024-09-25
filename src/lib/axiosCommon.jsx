"use client";  // Use this only if you're using it in a client component.

import axios from 'axios';

// Create the axios instance using Next.js environment variables
export const axiosCommon = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,  // Next.js uses process.env for environment variables
});

// Custom hook for using axios
const useAxiosCommon = () => {
    return axiosCommon;
}

export default useAxiosCommon;
