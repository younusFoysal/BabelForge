"use client";

import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import PaymentBox from "./PaymentBox";

import useAxiosCommon from "@/lib/axiosCommon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import paymentimg from "@/image/Home/payment.png"
import "./PaymentCard.css"

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
    <div className="relative mx-auto w-full mt-10 bg-white/50 dark:bg-[#181024]/80">
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12  lg:col-span-6 lg:py-24">
          <div className="mx-auto w-full max-w-lg package shadow-lg bg-white dark:bg-[#181024] rounded-xl p-6">
            <div className="bg-[#1d1724] p-8 -m-5 rounded-2xl ">
              <h1 className="relative text-2xl font-medium text-white sm:text-3xl">
                Secure Checkout
                <span className="mt-2 block h-1 w-10 bg-purple-700 sm:w-20 mb-3"/>
              </h1>
              <form action="" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                          htmlFor="first_name"
                          className="block text-white mb-1"
                      >
                        First Name
                      </label>
                      <input
                          name="first_name"
                          type="text"
                          id="first_name"
                          className="w-full rounded-lg border py-2 px-3 text-black dark:bg-white dark:border-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-1">
                        Last Name
                      </label>
                      <input
                          name="last_name"
                          type="text"
                          id="last_name"
                          className="w-full rounded-lg border py-2 px-3 text-black dark:bg-white dark:border-none"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                        htmlFor="address"
                        className="block text-white mb-1"
                    >
                      Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        className="w-full rounded-lg border py-2 px-3 text-black dark:bg-white dark:border-none"
                    />
                  </div>
                  <div className="mt-4">
                    <label
                        htmlFor="city"
                        className="block text-white mb-1"
                    >
                      City
                    </label>
                    <input
                        name="city"
                        type="text"
                        id="city"
                        className="w-full rounded-lg border py-2 px-3 text-black dark:bg-white dark:border-none"
                    />
                  </div>
                  <div className="mt-5">
                    <PaymentBox
                        clientSecret={clientSecret}
                        amount={price}
                        isLoading={isLoading}
                        message={message}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
            className=" col-span-full flex flex-col justify-center items-center py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Order summary</h2>
          <div>
            <Image
                src={paymentimg}
                alt=""
                height={1000}
                width={1000}
                className="items-center my-auto w-full hover:scale-105 duration-500 "
            />
          </div>


        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
