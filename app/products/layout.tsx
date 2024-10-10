"use client"

import LogoutButton from "@/components/Logout";
import { useSession } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {data}= useSession();

  const userData = data ? JSON.parse(JSON.stringify(data)) : null;

  return (
    <div>
      {userData && <LogoutButton />}
      {children}
    </div>
  );
}
