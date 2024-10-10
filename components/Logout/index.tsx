"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const sessiom = useSession();

  const handleLogout = async () => {
    const result = await signOut({ redirect: false, callbackUrl: "/products" });
    router.push(result.url);
  };

  return (
    <button className="btn" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
}
