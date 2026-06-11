"use client";
import Menu from "@/components/shared/menu";
import Sidebar from "@/components/shared/sidebar";
import { useAuthStore } from "@/store/auth-store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, isAuthLoaded, checkAuth } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    checkAuth(); // Verifica autenticación con el backend (Express) al cargar la página
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthLoaded) {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }
  }, [isAuthenticated, isAuthLoaded, router]);

  if (!isAuthLoaded) return null; // No renderiza hasta que se valide la sesión

  return (
    <div className=" bg-beige-100 lg:h-svh flex ">
      {/* LEFT */}

      <Sidebar />

      {/* RIGHT */}
      <main className="  flex-1 lg:overflow-y-scroll ">
        <div className="pb-safe px-4 pt-6 sm:p-6 sm:px-10 lg:p-8 lg:pb-8!">
          {children}
        </div>
      </main>
    </div>
  );
}
