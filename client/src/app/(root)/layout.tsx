"use client"
import Menu from "@/components/menu";
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
    <div className=" bg-beige-100 h-full w-full flex flex-col-reverse md:flex-row justify-end">
      {/* LEFT */}

      <div className="fixed z-50 bottom-0 left-0 xl:top-0 xl:left-0 w-full md:h-full md:w-[8%] lg:w-[16%] xl:w-[18%] py-2 md:py-6 md:px-4 bg-grey-900 rounded-tr-xl  md:rounded-e-xl md:rounded-r-xl ">
        <div className="hidden lg:block py-4 px-6">
          <Link href={'/'} className="flex items-center justify-center lg:justify-start gap-2 ">
            <Image src={'/images/logo-large.svg'} width={110} height={20} alt="logo" />
          </Link>
        </div>
        <Menu />
      </div>

      {/* RIGHT */}
      <div className=" w-full h-full md:w-[92%] lg:w-[84%] xl:w-[82%] ">
        {children}
      </div>
    </div>
  );

}
