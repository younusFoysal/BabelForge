"use client";

import React from "react";

const CheckoutPage = ({ params }) => {
  const { id } = params;

  console.log(id);
  return (
    <div>
      <h1>Checkout Page</h1>
      <form>{/* Form inputs for payment details */}</form>
      <button type="submit">Submit Payment</button>
    </div>
  );
};

export default CheckoutPage;
