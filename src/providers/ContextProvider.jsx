"use client";
import React, { createContext, useState } from "react";

export const UserContext = createContext();

const PaymentProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const userinfo = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={userinfo}>{children}</UserContext.Provider>
  );
};

export default PaymentProvider;
