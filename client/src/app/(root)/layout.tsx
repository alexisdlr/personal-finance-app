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
  const { isAuthenticated, setAuthLoaded, isAuthLoaded } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    // Indica que la autenticación ha sido cargada
    setAuthLoaded();
  }, [setAuthLoaded]);

  useEffect(() => {
    // Solo redirige cuando isAuthLoaded sea true
    if (isAuthLoaded && !isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/overview")
    }
  }, [isAuthenticated, isAuthLoaded, router]);

  // Espera a que isAuthLoaded sea true antes de mostrar la UI
  if (!isAuthLoaded) return null
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
