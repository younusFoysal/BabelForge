"use client";

import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import PaymentBox from "./PaymentBox";
import { useSession } from "next-auth/react";
import { UserContext } from "@/providers/ContextProvider";
import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const CheckoutForm = ({ id, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const axiosCommon = useAxiosCommon();

  const {
    data: pricingData = [],
    isLoading: singleLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["singleprice"],
    queryFn: async () => {
      const data = await axiosCommon.get(`/price/pricing-single/${id}`);
      return data;
    },
  });

  const price = pricingData?.data?.price;
  const category = pricingData?.data?.title;

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setClientSecret(data.clientSecret)) // Corrected this line
      .catch((error) => {
        console.error("Error fetching payment intent:", error);
      });
  }, [amount]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const address = e.target.address.value;
    const city = e.target.city.value;

    if (!stripe || !elements) {
      return;
    }

    const { error } = await elements.submit();

    if (error) {
      setMessage(`Payment failed: ${error.message}`);
      setIsLoading(false);
      return;
    }

    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/successPayment?first_name=${first_name}&last_name=${last_name}&address=${address}&city=${city}&amount=${price}&category=${category}`,
      },
    });

    if (paymentError) {
      setMessage(`Payment failed: ${paymentError.message}`);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  if (!clientSecret || !elements || !stripe) {
    return (
      <div>
        <h1>loading.......</h1>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full bg-white">
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
              Secure Checkout
              <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20 mb-3" />
            </h1>
            <form action="" onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      First Name
                    </label>
                    <input
                      name="first_name"
                      type="text"
                      id="first_name"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-white mb-1">
                      Last Name
                    </label>
                    <input
                      name="last_name"
                      type="text"
                      id="last_name"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="address"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="city"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    City
                  </label>
                  <input
                    name="city"
                    type="text"
                    id="city"
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  />
                </div>
                <div className="mt-5">
                  <PaymentBox
                    clientSecret={clientSecret}
                    amount={amount}
                    isLoading={isLoading}
                    message={message}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Order summary</h2>
          <div>
            <Image
              src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt=""
              height={600}
              width={600}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-blue-600 to-blue-400 opacity-95" />
          </div>

          <div className="relative mt-20 text-white ">
            <h3 className="mb-5 text-lg font-bold">Support</h3>
            <p className="text-sm font-semibold">
              +01 653 235 211{" "}
              <span className="font-light">(International)</span>
            </p>
            <p className="mt-1 text-sm font-semibold">
              support@nanohair.com <span className="font-light">(Email)</span>
            </p>
            <p className="mt-2 text-xs font-medium">
              Call us now for payment related issues
            </p>
          </div>
          <div className="relative mt-10 flex">
            <p className="flex flex-col">
              <span className="text-sm font-bold text-white">
                Money Back Guarantee
              </span>
              <span className="text-xs font-medium text-white">
                within 30 days of purchase
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
