import axios from "axios";

export const axiosCommon = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Custom hook for using axios
const useAxiosCommon = () => {
  return axiosCommon;
};

export default useAxiosCommon;
