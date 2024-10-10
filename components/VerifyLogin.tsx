"use client";

import useLoginStore from "@/hooks/login.store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useStore } from "zustand";

const VerifyLogin = () => {
  const { isLoggedIn } = useLoginStore();

  const router = useRouter();

  useEffect(() => {
    console.log(isLoggedIn)
    if (!isLoggedIn) {
      router.push("/login");
    }
  });

  return <></>;
};

export default VerifyLogin;
