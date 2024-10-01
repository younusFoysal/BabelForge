"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const AuthProvider = ({ children }) => {

    const [queryClient] = React.useState(() => new QueryClient());

  return (
      <QueryClientProvider client={queryClient}>
    <SessionProvider>
      <div>{children}</div>
    </SessionProvider>
      </QueryClientProvider>
  );
};

export default AuthProvider;
