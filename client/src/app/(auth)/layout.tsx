import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-beige-100 h-screen w-full flex flex-col lg:flex-row text-black lg:p-4 overflow-y-hidden">
      {/* RIGHT */}
      <main className="w-full h-full px-4 flex justify-center items-center">
        {children}
      </main>
    </div>
  );
}
