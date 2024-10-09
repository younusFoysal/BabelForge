"use client";
import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

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
      clientSecret, // Corrected this line
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}`,
      },
    });

    if (paymentError) {
      setMessage(`Payment failed: ${paymentError.message}`);
      setIsLoading(false);
      return;
    } else {
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
    <div className="bg-white p-2 rounded-md">
      <form onSubmit={handleSubmit}>
        {clientSecret && <PaymentElement />}
        {message && <div className="py-3 text-red-500">{message}</div>}

        {clientSecret && (
          <button
            disabled={isLoading}
            type="submit"
            className="bg-gray-900 text-white py-2 px-4 w-full rounded-md mt-2"
          >
            {!isLoading ? `Pay ${amount}` : "Loading..."}
          </button>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
