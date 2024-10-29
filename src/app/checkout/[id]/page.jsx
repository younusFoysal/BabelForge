import PaymentHome from "@/components/Payments/Payment";
import React from "react";

export const metadata = {
  title: "Payment | BabelForge",
  description: "Make a payment for your order.",
};

const page = ({ params }) => {
  const id = params.id;
  return (
    <>
      <PaymentHome id={id} />
    </>
  );
};

export default page;
