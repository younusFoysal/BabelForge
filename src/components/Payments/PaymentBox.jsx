import { PaymentElement } from "@stripe/react-stripe-js";
import React from "react";

const PaymentBox = ({ clientSecret, isLoading, amount, message }) => {
  return (
    <div>
      {clientSecret && <PaymentElement />}
      {message && <div className="py-3 text-red-500">{message}</div>}

      {clientSecret && (
        <button
          disabled={isLoading}
          type="submit"
          className="mt-4 inline-flex w-full items-center justify-center rounded bg-blue-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-blue-500 sm:text-lg"
        >
          {!isLoading ? `Pay ${amount}` : "Loading..."}
        </button>
      )}
    </div>
  );
};

export default PaymentBox;
