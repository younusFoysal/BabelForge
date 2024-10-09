"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const amount = 99; // Replace with your desired amount
const options = {
  mode: "payment",
  amount: 99 * 100,
  currency: "usd",
};

const PaymentHome = () => {
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
};

export default PaymentHome;
