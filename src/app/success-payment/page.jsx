"use client";
import useAxiosCommon from "@/lib/axiosCommon";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import toast from "react-hot-toast";

const page = () => {
  const axiosComon = useAxiosCommon();
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");
  const city = searchParams.get("city");
  const address = searchParams.get("address");
  const last_name = searchParams.get("last_name");
  const first_name = searchParams.get("first_name");
  const amount = searchParams.get("amount");
  const category = searchParams.get("category");
  const session = useSession();
  const user = session?.data?.user;

  const userinfo = {
    first_name,
    last_name,
    address,
    city,
    amount,
    status: "pending",
    paymentMethod: "card",
    email: user?.email,
    date: new Date(),
    pakage: category,
  };

  const handlesubmit = async () => {
    try {
      const { data } = await axiosComon.post("pay/payment", userinfo);

      if (data.insertedId) {
        window.location.href = "/dashboard";
      }
    } catch (e) {
      toast.error("Failed to send payment details");
      console.error(e);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-green-500 text-white py-10 rounded-md w-[60%] flex items-center flex-col">
        <h1 className="text-center text-2xl font-semibold">
          Hurrah! Payment successful 😁😁😁
        </h1>
        <p className="text-center mt-4">
          Payment Intent: {paymentIntent} <br />
          Amount: {amount} <br />
          Status: {redirectStatus}
        </p>

        <button
          onClick={handlesubmit}
          className="bg-blue-600 text-white px-4 py-3 rounded-sm mt-3"
        >
          dashboard
        </button>
      </div>
    </div>
  );
};

export default page;
