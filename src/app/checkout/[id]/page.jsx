import PaymentHome from "@/components/Payments/Payment";
import React from "react";

const page = ({ params }) => {
  const id = params.id;
  return (
    <>
      <PaymentHome id={id} />
    </>
  );
};

export default page;
