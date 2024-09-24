"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

const AuthProvider = ({ children }) => {
  return (
    <SessionProvider>
      <div>{children}</div>
    </SessionProvider>
  );
};

export default AuthProvider;
