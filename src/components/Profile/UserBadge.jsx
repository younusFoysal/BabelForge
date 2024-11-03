"use client";
import usePlan from "@/hooks/usePlan";
import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function UserBadge() {
  const [plan, roleLoading] = usePlan();

  if (roleLoading) return <Skeleton className="h-4 w-8" />;

  return (
    <div className="px-2 h-4 rounded-full text-[10px] flex items-center justify-center  bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      {plan === "Premium" && "Pro"}
      {plan === "Basic" && "Basic"}
      {plan === "Standard" && "Standard"}
    </div>
  );
}
