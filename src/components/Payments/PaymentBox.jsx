import { PaymentElement } from "@stripe/react-stripe-js";
import React from "react";

const PaymentBox = ({ clientSecret, isLoading, amount, message }) => {
  return (
    <div>
      {clientSecret && <PaymentElement className="bg-white rounded-lg shadow-sm p-4" />}
      {message && <div className="py-3 text-red-500">{message}</div>}

      {clientSecret && (
        <button
          disabled={isLoading}
          type="submit"
          className="capitalize bg-gradient-to-r from-blue-600 to-purple-600  text-white rounded-md transition-all duration-500 text-sm hover:scale-105 flex gap-1 items-center dark:bg-white py-2  hover:shadow-lg  hover:dark:shadow-purple-800 px-6  font-semibold mt-4  w-full  justify-center  bg-blue-600  tracking-wide  text-opacity-80 outline-none ring-offset-2 hover:text-opacity-100 focus:ring-2 focus:ring-blue-500 sm:text-lg"
        >
          {!isLoading ? `Pay ${amount}` : "Loading..."}
        </button>
      )}
    </div>
  );
};

export default PaymentBox;
