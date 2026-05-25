"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/app/context/AuthContext";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#f4f4f4]
        "
      >
        <div
          className="
            text-3xl
            font-black
            text-blue-700
          "
        >
          ...جاري التحميل
        </div>
      </main>
    );
  }

  return children;
}