import Menu from "@/components/menu";
import Image from "next/image";
import Link from "next/link";

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-beige-100 h-screen w-full flex ">
      {/* LEFT */}

      <div className="w-[20%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 bg-grey-900 rounded-xl">
        <div className="py-4">
          <Link href={'/'} className="flex items-center justify-center lg:justify-start gap-2 ">
            <Image src={'/images/logo-large.svg'} width={110} height={20} alt="logo" />
          </Link>
        </div>
        <Menu />
      </div>

      {/* RIGHT */}
      <div className="w-full h-full lg:w-[20%] flex justify-center items-center">
        HOLAAA
        {children}
      </div>
    </div>
  );

}
