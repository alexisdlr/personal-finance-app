"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function Home() {
  const {user, isAuthenticated} = useAuthStore()
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirige si no hay usuario autenticado
    }
  }, [isAuthenticated, router]);

  if (!user) return null; // Evita el renderizado mientras redirige

  return (
   <div className="text-grey-500">
    Hello World {user.name}
   </div>
  );
}
